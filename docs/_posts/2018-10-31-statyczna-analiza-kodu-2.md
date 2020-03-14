---
title:    "Statyczna analiza kodu dla języka Scala w SBT - część 2."
author:   TheKamilAdam
category: scala-native
tags:     code-analysis static-code-analysis 
labels:   scalastyle wartremover scapegoat linter scala-clippy sbt-cpd sbt-stats
langs:    scala
tools:    sbt scala-jvm scala-js scala-native
redirect_from:
  - statyczna-analiza-kodu-2
  - scala-native/statyczna-analiza-kodu-2.html
  - resentiment/statyczna-analiza-kodu-2.html
  - resentiment/2018/10/31/statyczna-analiza-kodu-2.html
---

Jest to kontynuacja posta
[Statyczna analiza kodu dla języka Scala w SBT - część 1](/statyczna-analiza-kodu-1.html).

## Wtyczki nie modyfikujące kodu źródłowego.

Jest to o wiele większy zestaw wtyczek niż poprzednio.


### Scalastyle - Scala style checker

[Scalastyle](<http://www.scalastyle.org>)

Dodajemy `Scalastyle` do pliku `project/plugins.sbt`:
```scala
addSbtPlugin("org.scalastyle" %% "scalastyle-sbt-plugin" % "1.0.0")
```

Generujemy domyślny plik konfiguracyjny `scalastyle-config.xml` zawierający reguły:
```bash
sbt scalastyleGenerateConfig
```

Wchodzimy do pliku `scalastyle-config.xml` i zmieniamy poziomy z `warning` na `error`.

Następnie wyłączamy sprawdzanie nagłówka:
```xml
 <check level="error" class="org.scalastyle.file.HeaderMatchesChecker" enabled="false"/>
```
A na końcu poprawiamy formatowanie dwuliniowej instrukcji `if`:
```xml
 <check level="error" class="org.scalastyle.scalariform.IfBraceChecker" enabled="true">
  <parameters>
   <parameter name="singleLineAllowed"><![CDATA[true]]></parameter>
   <parameter name="doubleLineAllowed"><![CDATA[true]]></parameter>
  </parameters>
 </check>
```

Teraz analizujemy kod i testy za pomocą polecenia:
```bash
sbt scalastyle test:scalastyle it:scalastyle
```

Pełna lista reguł jest dostępna pod linkiem
[rules-1.0.0](<http://www.scalastyle.org/rules-1.0.0.html>).

Dla mnie najważniejszą funkcjonalnością jest liczenie [złożoności cyklomatycznej](<https://pl.wikipedia.org/wiki/Złożoność_cyklomatyczna>):
```xml
 <check level="error" class="org.scalastyle.scalariform.CyclomaticComplexityChecker" enabled="true">
  <parameters>
   <parameter name="maximum"><![CDATA[2]]></parameter>
  </parameters>
 </check>
```

### WartRemover: a flexible scala linter
[WartRemover](<https://www.wartremover.org>)
jest to wtyczka do usuwania brodawek z kodu.
Przez brodawkę autor rozumie brzydkie rzeczy, które można napisać w języku Scala,
bo składnia języka jest zbyt liberalna.
Nazwa wtyczki jest trochę na wyrost,
ponieważ w tej chwili `WartRemover` pozwala tylko odnaleźć brodawki,
a usunąć musimy je sami.

Dodajemy `wartremover` do pliku `project/plugins.sbt`:
```scala
addSbtPlugin("org.wartremover" % "sbt-wartremover" % "2.3.7")
```

W pliku `build.sbt` włączamy `wartremover`:
```scala
wartremoverErrors ++= Warts.unsafe
```

Od teraz przy każdej kompilacji będą poszukiwane brodawki.
Pełna lista [brodawkek](<http://www.wartremover.org/doc/warts.html>)

### Scapegoat - Scala compiler plugin for static code analysis
[Scapegoat](<https://github.com/sksamuel/scapegoat>) to linter dla języka Scala.

Dodajemy `scapegoat` do pliku `project/plugins.sbt`:
```scala
addSbtPlugin("com.sksamuel.scapegoat" %% "sbt-scapegoat" % "1.3.8")
```

Ustawiamy wersję `scapegoat` w `build.sbt`:
```scala
scapegoatVersion := "1.1.0"
```

Analizujemy kod za pomocą polecenia:
```bash
sbt scapegoat
```

### Linter - Static Analysis Compiler Plugin for Scala
[Linter](<https://github.com/HairyFotr/linter>)
to niestety nie rozwijany już linter.

Dodajemy `Linter` do pliku `project/plugins.sbt`:
```scala
addCompilerPlugin("org.psywerx.hairyfotr" %% "linter" % "0.1.17")
```

Linter uruchamia się automatycznie podczas kompilacji.

### Scala clippy - Good advice for Scala compiler errors
[Scala clippy](<https://scala-clippy.org>)
to wtyczka dodająca porady jak poprawić błędy kompilacji.

Dodajemy `clippy` do pliku `project/plugins.sbt`:
```scala
addSbtPlugin("com.softwaremill.clippy" % "plugin-sbt" % "0.5.3")
```

### sbt-cpd - Copy & Paste Detector plugin using PMD for sbt.
[sbt-cpd](<https://github.com/sbt/sbt-cpd>)
to wtyczka do wykrywania duplikatów kodu za pomocą Copy/Paste Detector (CPD) z projektu PMD.

Dodajemy `sbt-cpd` do pliku `project/plugins.sbt`:
```scala
addSbtPlugin("com.github.sbt" % "sbt-cpd" % "2.0.0")
```

I analizujemy kod za pomocą polecenia:
```bash
sbt cpd
```

### stats - An sbt plugin for source code statistics

[sbt-stats](<https://github.com/orrsella/sbt-stats>)
to wtyczka licząca ilość plików, linii i znaków w projekcie.

Dodajemy `stats` do pliku `project/plugins.sbt`:
```scala
addSbtPlugin("com.orrsella" % "sbt-stats" % "1.0.7")
```

Analizujemy kod za pomocą polecenia:
```bash
sbt stats
```

## Podsumowanie

Wszystkie wymienione wyżej wtyczki dodałem do projektu
[resentiment](<https://github.com/writeonly/resentiment>)

Moje polecenie generowania raportów wygląda następująco:
```bash
sbt scalastyle test:scalastyle it:scalastyle && \
sbt scapegoat && \
sbt cpd && \
sbt stats
```

Niestety,
ponieważ używam metody `println` w klasie `Core`,
muszę obniżyć poziom raportowania błędów
dla reguły `org.scalastyle.file.RegexChecker` w `ScalaStyle`
z `error` na `warning`.