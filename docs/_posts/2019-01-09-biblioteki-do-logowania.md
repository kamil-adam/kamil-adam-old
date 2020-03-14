---
title:    "Biblioteki do logowania dla języka Scala"
author:   TheKamilAdam
category: scala-native
tags:     library cli factory logging
labels:   scala-logging scribe
langs:    scala java
tools:    scala-js scala-native   
lisb:     utest slogging
redirect_from:
  - biblioteki-do-logowania
  - scala-native/biblioteki-do-logowania
  - resentiment/biblioteki-do-logowania
  - resentiment/2019/01/09/biblioteki-do-logowania.html
---

Chcąc dowiedzieć się co dzieje się wewnątrz naszej aplikacji mamy dwie drogi.
Pierwszym sposobem jest debugowanie.
Jednak im więcej wątków w aplikacji i im bardziej komunikują się one w sposób asynchroniczny tym trudniej jest debugować.
Drugim sposobem jest logowanie informacji.
Najprostszym sposobem logowania informacji w Javie jest `System.out.println`, a w Scali upraszcza się to do `println`.
Ale jest to złe z dwóch powodów:
* Po pierwsze, jeśli piszemy aplikację "konsolową" (ang. *command line interface*, **[CLI]**)
to użytkownik będzie niepotrzebnie widział nieinteresujące go informacje z wewnętrznego procesu przetwarzania.
* Tak wypisanych informacji nie można zapisać w bazie danych ani wysłać do innego systemu.

Dlatego powstały biblioteki do logowania.
Biblioteki takie pozwalają przekierować logi do pliku, zapisać je w bazie danych oraz wysłać je do dowolnego innego systemu.

## Przegląd bibliotek

* [scala-logging](<https://github.com/lightbend/scala-logging>) -
wygodna i wydajna biblioteka logowania opakowywująca bibliotekę `SLF4J` dla języka Scala.
Niestety działa tylko dla Scala/JVM
* [util-logging](<https://github.com/lightbend/scala-logging>) -
jest małym opakowaniem wbudowanego logowania Javy, aby uczynić go bardziej przyjaznym dla Scali.
Niestety także, działa tylko dla Scala/JVM
* [scalajs-java-logging](<https://github.com/scala-js/scala-js-java-logging>) -
implementacja `java.logging` dla **[Scala.js]**.
Wspiera **[Scala.js]** w wersji 0.6.x i 1.0.x
* [airframe-log](<https://wvlet.org/airframe/docs/airframe-log.html>) -
biblioteka do ulepszania logowania aplikacji Scala z kolorami i lokalizacjami kodów źródłowych.
Wspiera Scala.js w wersji 0.6.x i 1.0.x
* [slogging](<https://github.com/jokade/slogging>) -
biblioteka logowania zgodna z `scala-logging` (i `SLF4J`) oparta na makrach
dla Scala/JVM, **[Scala.js]** (wersja 0.6.x) i **[Scala Native]**
* [scribe](<https://github.com/outr/scribe>) -
praktyczny szkielet logowania, który nie wymaga żadnej innej struktury logowania
i może być w pełni skonfigurowany programowo.
Wspiera **[Scala.js]** w wersji 0.6.x oraz **[Scala Native]**.

## I konkretne próby zastosowania

### scala-logging
Jest to najprawdopodobniej najpopularniejsza biblioteka do logowania w języku Scala.
Niestety jej wadą jest to, że działa tylko dla JVM.

W pliku `build.sbt` dodajemy bibliotekę do wspólnych zależności:
```scala
  libraryDependencies ++= Seq(
    "com.typesafe.scala-logging" %% "scala-logging" % "3.9.0",
  ),
```

`Scala-logging` można używać na dwa sposoby.
Za pomocą traitów `StrictLogging` i `LazyLogging`.
Oba traity tworzą zmienną `logger`, która jest loggerem.

Trait `StrictLogging` inicjalizuje `logger` w momencie utworzenia klasy:
```scala
package com.typesafe.scalalogging

import org.slf4j.LoggerFactory

trait StrictLogging {
  protected val logger: Logger = Logger(LoggerFactory.getLogger(getClass.getName))
}
```

```scala
package pl.writeonly.re.shared

import com.typesafe.scalalogging.StrictLogging

object StrictLoggingCore extends Core with StrictLogging {
  def apply(arg: String): Unit = {
    logger.info(s"Hello Scala $arg!")
  }
}
```

Trait `LazyLogging` inicjalizuje `logger` w momencie pierwszego użycia loggera:
```scala
package com.typesafe.scalalogging

import org.slf4j.LoggerFactory

trait LazyLogging {
  @transient
  protected lazy val logger: Logger = Logger(LoggerFactory.getLogger(getClass.getName))
}
```

```scala
package pl.writeonly.re.shared

import slogging.LazyLogging

object LazyLoggingCore extends Core with LazyLogging {
  def apply(arg: String): Unit = {
    logger.info(s"Hello Scala $arg!")
  }
}
```

Łączymy wszystko w obiekcie `Core`:
```scala
package pl.writeonly.re.shared

trait Core {
  def apply(arg: String): Unit
}

object Core extends Core {
  override def apply(arg: String): Unit = {
    StrictLoggingCore(arg)
    LazyLoggingCore(arg)
  }
}
```

Tworzymy test jednostkowy we frameworku **[uTest]**:
```scala
package pl.writeonly.re.shared

import utest._

object CoreTest extends TestSuite {
  override val tests: Tests = Tests {
    'core - {
      Core("Awesome")
    }
  }
}
```

Wywołujemy:
```bash
sbt clean re/test
```

I wszystko się wysypuje, bo `scala-logging` wspiera tylko JVM.

### slogging
Jest to przepisana biblioteka `scala-logging`,
która działa dla Scala Native, Scala.js oraz oczywiście Scala/JVM.

W pliku `build.sbt` dodajemy bibliotekę do wspólnych zależności:
```scala
  libraryDependencies ++= Seq(
    "biz.enef" %%% "slogging" % SloggingVersion,
  ),
```

`Slogging` używa się identycznie jak `scala-logging`.

Trait `StrictLogging` inicjalizuje `logger` w momencie utworzenia klasy:
```scala
package slogging

trait StrictLogging extends LoggerHolder {
  protected val logger : Logger = LoggerFactory.getLogger(loggerName)
}
```

```scala
package pl.writeonly.re.shared

import slogging.StrictLogging

object StrictLoggingCore extends Core with StrictLogging {
  def apply(arg: String): Unit = {
    logger.info(s"Hello Scala $arg!")
  }
}
```

Trait `LazyLogging` inicjalizuje `logger` w momencie pierwszego użycia loggera:
```scala
package slogging

trait LazyLogging extends LoggerHolder {
  protected lazy val logger = LoggerFactory.getLogger(loggerName)
}
```

```scala
package pl.writeonly.re.shared

import slogging.LazyLogging

object LazyLoggingCore extends Core with LazyLogging {
  def apply(arg: String): Unit = {
    logger.info(s"Hello Scala $arg!")
  }
}
```

Łączymy wszystko w obiekcie `Core`:
```scala
package pl.writeonly.re.shared

trait Core {
  def apply(arg: String): Unit
}

object Core extends Core {
  override def apply(arg: String): Unit = {
    StrictLoggingCore(arg)
    LazyLoggingCore(arg)
  }
}
```

Tworzymy test jednostkowy we frameworku **[uTest]**:
```scala
package pl.writeonly.re.shared

import utest._

object CoreTest extends TestSuite {
  override val tests: Tests = Tests {
    'core - {
      Core("Awesome")
    }
  }
}
```

Wywołujemy:
```bash
sbt clean re/test
```

I wszystko działa!

### Scribe

W pliku `build.sbt` dodajemy bibliotekę do wspólnych zależności:
```scala
  libraryDependencies ++= Seq(
    "com.outr" %%% "scribe" % ScribeVersion,
  ),
```

`Scribe` można używać na dwa sposoby.
Za pomocą traitu `Logging` oraz za pomocą obiektu pakietu `scribe`.

Trait `Logging` w prostu sposób tworzy `logger` dla każdej instancji klasy:
```scala
trait Logging {
  protected def loggerName: String = getClass.getName

  protected def logger: Logger = Logger(loggerName)
}
```

```scala
package pl.writeonly.re.shared

import scribe.Logging

object LoggingCore extends Core with Logging {
  override def apply(arg: String): Unit = {
    logger.info(s"Hello Scala $arg!")
  }
}
```

Obiekt pakietu `scribe` zawiera magię opartą na makrach, dlatego dziedziczenie nie jest potrzebne:
```scala
package object scribe extends LoggerSupport {
  lazy val lineSeparator: String = System.getProperty("line.separator")

  protected[scribe] var disposables = Set.empty[() => Unit]

  override def log[M](record: LogRecord[M]): Unit = Logger(record.className).log(record)

  def dispose(): Unit = disposables.foreach(d => d())

  implicit class AnyLogging(value: Any) {
    def logger: Logger = Logger(value.getClass.getName)
  }

  def async[Return](f: => Return): Return = macro Macros.async[Return]

  def future[Return](f: => Return): Future[Return] = macro Macros.future[Return]

  object Execution {
    implicit def global: ExecutionContext = macro Macros.executionContext
  }
}
```

```scala
package pl.writeonly.re.shared

object ScribeCore extends Core {
  def apply(arg: String): Unit = {
    scribe.info(s"Hello Scala $arg!")
  }
}
```

Łączymy wszystko obiektem `Core`:
```scala
package pl.writeonly.re.shared

trait Core {
  def apply(arg: String): Unit
}

object Core extends Core {
  override def apply(arg: String): Unit = {
    LoggingCore(arg)
    ScribeCore(arg)
  }
}
```

Tworzymy test:
```scala
package pl.writeonly.re.shared

import utest._

object CoreTest extends TestSuite {
  override val tests: Tests = Tests {
    'core - {
      Core("Awesome")
    }
  }
}
```

Wywołujemy:
```bash
sbt clean re/test
```

Niestety pojawia się błąd:
```
[error] cannot link: @java.util.Calendar$::getInstance_java.util.Calendar
[error] cannot link: @java.util.Calendar::setTimeInMillis_i64_unit
[error] unable to link
[error] (re / Nativetest / nativeLink) unable to link
```

## Podsumowanie

Jak zwykle składnia Scali pozwala zapisać te same rzeczy prościej niż w Javie,
jednocześnie dzięki temu można wymusić konwencję tworzenia loggerów na etapie kompilacji.
Dzięki temu nie mamy w kodzie loggerów o nazwach innych niż `loggger` jak np. `LOGGER` lub `LOG`.

[Scala Native]: /posts-by-tools/scala-native
[Scala.js]:     /posts-by-tools/scala-js

[uTest]:        /posts-by-libs/utest

[CLI]:          /posts-by-tags/cli
