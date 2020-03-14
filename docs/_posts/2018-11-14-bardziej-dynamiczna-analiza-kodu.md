---
title:    "Bardziej dynamiczna analiza kodu dla języka Scala - Property-based testing"
author:   TheKamilAdam
category: scala-native
tags:     code-analysis dynamic-code-analysis
labels:   property-based scalacheck scalaprops nyaya
langs:    scala haskell
tools:    scala-js scala-native
libs:     scalatest scalaz specs2
redirect_from:
  - bardziej-dynamiczna-analiza-kodu
  - scala-native/bardziej-dynamiczna-analiza-kodu
  - resentiment/bardziej-dynamiczna-analiza-kodu
  - resentiment/2018/11/14/bardziej-dynamiczna-analiza-kodu.html
---

Testy modułowe (jednostkowe) napisane w poście
[Dynamiczna analiza kodu](/dynamiczna-analiza-kodu.html)
dla projektu [resentiment](<https://github.com/writeonly/resentiment>)
zawiodły.
Mimo posiadania 100% pokrycia kodu dla klasy Calculator klasa ta nie działała w sposób poprawy.

To dlatego, że skupiłem się na drugiej linii definicji
> Korzystanie z metryk testów, takich jak pokrycie kodu, zapewnia,
że przetestowano odpowiednią ilość możliwych zachować programu

Zapominając jednocześnie o trzeciej:
> Aby analiza dynamiczna programu była skuteczna,
> program docelowy musi być wykonany z wystarczającą ilością danych wejściowych do testów,
> aby uzyskać interesujące zachowanie.

Problem można rozwiązać za pomocą *property-based testing*

## Property-based testing (Testowanie oparte na właściwościach)

Przy pisaniu normalnych testów, czyli modułowych (jednostkowych), integracyjnych i systemowych,
wyznaczamy przypadki brzegowe i klasy równoważności.
Chcemy by danych testowych było jak najmniej, tak by testy wykonywały się jak najszybciej.

W przypadku *property-based testing* jest inaczej.
Tutaj zamiast wyznaczać konkretne dane wejściowe definiujemy tylko ogólne ograniczenia jakie mają spełniać dane.
Na podstawie ograniczeń generowane są dane wejściowe dla testów.
Dużo danych wejściowych.
Dlatego testy te są wolne, chociaż testują pojedyncze moduły i jednostki.

## Biblioteki dla property-based testing w języku Scala

* [ScalaCheck](<https://www.scalacheck.org/>) -
pierwsza i najbardziej popularna biblioteka *property-based testing*.
Wspiera Scala.js w wersji 0.6 i 1.0.0.
Inspirowana biblioteką [QuickCheck](<http://hackage.haskell.org/package/QuickCheck>) dla języka **[Haskell]**.
Jeden z projektów [typelevel](<https://typelevel.org/projects/>).
Posiada integracje z [ScalaTest](<http://www.scalatest.org/user_guide/writing_scalacheck_style_properties>)
i [Specs2](<https://etorreborre.github.io/specs2/guide/SPECS2-4.3.4/org.specs2.guide.UseScalaCheck.html>).
* [scalaprops](<https://github.com/scalaprops/scalaprops>) -
druga najbardziej popularna biblioteka *property-based testing*.
Wspiera **[Scala.js]** w wersji 0.6 i **[Scala Native]** w wersji 0.3.
Posiada integrację z biblioteką **[Scalaz]**.
* [Nyaya](<https://github.com/japgolly/nyaya>) -
projekt niestety umarł.
Wspierał Scala.js w wersji 0.6.

## Testowanie oparte na właściwościach za pomocą ScalaProps
Ponieważ chcę utrzymać możliwość kompilacji krzyżowej (cross compilation),
wybieram bibliotekę `scalaprops` dla testów.

Dodajemy wtyczkę `sbt-scalaprops` do pliku `project/plugins.sbt`:
```
addSbtPlugin("com.github.scalaprops" % "sbt-scalaprops" % "0.2.6")
```

Dodajemy wymagane zależności do `libraryDependencies`:
```scala
  libraryDependencies ++= Seq(
    "com.github.scalaprops" %%% "scalaprops" % ScalaPropsVersion % "test,it",
    "com.github.scalaprops" %%% "scalaprops-scalazlaws" % ScalaPropsVersion % "test,it",
  ),
```

Ponieważ testy jednostkowe powinny być szybkie,
konfigurujemy `scalaprops` jako testy integracyjne.

Na początku musimy dodać do cross-projektu ustawienia dla `scalaprops` za pomocą linii:
```scala
lazy val re = crossProject(JSPlatform, JVMPlatform, NativePlatform)
  // ...
  .settings(scalapropsCoreSettings)
```

Następnie musimy wskazać folder, który będzie zawierać testy integracyjne:
```scala
lazy val re = crossProject(JSPlatform, JVMPlatform, NativePlatform)
  // ...
  .settings(
    unmanagedSourceDirectories in IntegrationTest ++= CrossType.Full.sharedSrcDir(baseDirectory.value, "it").toSeq
  )
```

Niestety Scala Native nie wspiera obecnie testów integracyjnych.
Może kiedyś będzie wspierać,
może jak będę miał czas sam ogarnę makra i napiszę stosownego pull-requesta.
Do tego czasu będzie mi o tym przypominać zakomentowana linia:
```scala
lazy val re = crossProject(JSPlatform, JVMPlatform, NativePlatform)
  // ...
  //.nativeSettings(scalapropsNativeSettings)
```



Ostatecznie konfiguracja projektu wygląda następująco:
```scala
lazy val re = crossProject(JSPlatform, JVMPlatform, NativePlatform)
  .withoutSuffixFor(NativePlatform)
  .crossType(CrossType.Full)
  .settings(SharedSettings)
  .jsSettings(jsSettings)
  .jvmSettings(jvmSettings)
  .nativeSettings(nativeSettings)
  // IntegrationTest
  .configs(IntegrationTest)
  .settings(Defaults.itSettings)
  .settings(
    inConfig(IntegrationTest)(scalafixConfigSettings(IntegrationTest)),
    inConfig(IntegrationTest)(ScalafmtPlugin.scalafmtConfigSettings),
    inConfig(IntegrationTest)(scalariformItSettings),
    unmanagedSourceDirectories in IntegrationTest ++= CrossType.Full.sharedSrcDir(baseDirectory.value, "it").toSeq
  )
  .jsSettings(inConfig(IntegrationTest)(ScalaJSPlugin.testConfigSettings))
  .nativeSettings(inConfig(IntegrationTest)(Defaults.testSettings))
  // PropsTest
  .settings(scalapropsCoreSettings)
  //.nativeSettings(scalapropsNativeSettings)
```

W folderze `re/shared/src/it/scala/` tworzymy testy dla klasy `pl.writeonly.re.shared.Calculator`:
```scala
package pl.writeonly.re.shared

import scalaprops.{ Property, Scalaprops }

object CalculatorIT extends Scalaprops {
  val calculator = new Calculator()

  val addition: (Int, Int) => Int = (x, y) => calculator.add(x, y)
  val additionTest = Property.forAll { (a: Int, b: Int) =>
    addition(a, b) == a + b
  }

  val multiplication: (Int, Int) => Int = (x, y) => calculator.mul(x, y)
  val multiplicationTest = Property.forAll { (a: Int, b: Int) =>
    multiplication(a, b) == a * b
  }

  val lessOrEqual: (Int, Int) => Boolean = (x, y) => calculator.leq(x, y)
  val lessOrEqualTest = Property.forAll { (a: Int, b: Int) =>
    lessOrEqual(a, b) == (a <= b)
  }
}
```

Wywołujemy:
```bash
sbt clean coverage reJS/it:test reJVM/it:test
```

I naszym oczom powinien ukazać się piękny komunikat:
```bash
pl.writeonly.re.shared.CalculatorIT$
+- additionTest  Falsified(0,0,[Arg(0, 18591416),Arg(0, 241819340)],LongSeed(1542137236582000128)) 4ms
+- lessOrEqualTest ................................................. Passed(50,0,LongSeed(1542137236604999936)) 11ms
`- multiplicationTest  Falsified(0,0,[Arg(0, -795557759),Arg(0, -1)],LongSeed(1542137236617999872)) 0ms
[error] falsified CalculatorIT additionTest Falsified(0,0,[Arg(0, 18591416),Arg(0, 241819340)],LongSeed(1542137236582000128))
[error] falsified CalculatorIT multiplicationTest Falsified(0,0,[Arg(0, -795557759),Arg(0, -1)],LongSeed(1542137236617999872))
[info] pl.writeonly.re.shared.CalculatorIT$ 39 ms
11 pl.writeonly.re.shared.CalculatorIT$.lessOrEqualTest 50 50
4 pl.writeonly.re.shared.CalculatorIT$.additionTest 50 50
0 pl.writeonly.re.shared.CalculatorIT$.multiplicationTest 50 50
[info] 11 pl.writeonly.re.shared.CalculatorIT$.lessOrEqualTest 50 50
[info] 4 pl.writeonly.re.shared.CalculatorIT$.additionTest 50 50
[info] 0 pl.writeonly.re.shared.CalculatorIT$.multiplicationTest 50 50
[error] Failed tests:
[error] 	pl.writeonly.re.shared.CalculatorIT
[error] (reJS / IntegrationTest / test) sbt.TestsFailedException: Tests unsuccessful
```
Testy nie przeszły, mamy błąd w kodzie. W związku z tym poprawiamy klasę `Calculator`:
```scala
package pl.writeonly.re.shared

class Calculator {
  type T = Int

  def add(a: T, b: T): T = a + b

  def mul(a: T, b: T): T = a * b

  def leq(a: T, b: T): Boolean = a < b

}
```

I ponownie wywołujemy:
```bash
sbt clean coverage reJS/it:test reJVM/it:test
```

Teraz dostajemy poprawną odpowiedź:
```bash
pl.writeonly.re.shared.CalculatorIT$
+- additionTest ................................................. Passed(50,0,LongSeed(1542137486777999872)) 12ms
+- lessOrEqualTest ................................................. Passed(50,0,LongSeed(1542137486793999872)) 5ms
`- multiplicationTest ................................................. Passed(50,0,LongSeed(1542137486800999936)) 5ms
[info] pl.writeonly.re.shared.CalculatorIT$ 31 ms
12 pl.writeonly.re.shared.CalculatorIT$.additionTest 50 50
5 pl.writeonly.re.shared.CalculatorIT$.lessOrEqualTest 50 50
5 pl.writeonly.re.shared.CalculatorIT$.multiplicationTest 50 50
[info] 12 pl.writeonly.re.shared.CalculatorIT$.additionTest 50 50
[info] 5 pl.writeonly.re.shared.CalculatorIT$.lessOrEqualTest 50 50
[info] 5 pl.writeonly.re.shared.CalculatorIT$.multiplicationTest 50 50
```

Ostatecznie moje pełne polecenie do kompilacji to:
```bash
sbt scalafix test:scalafix it:scalafix && \
sbt scalafmtSbt scalafmt test:scalafmt it:scalafmt && \
sbt clean compile test:compile it:compile re/test && \
sbt coverage reJS/test reJVM/test reJS/it:test reJVM/it:test && \
sbt coverageReport && \
sbt scalastyle test:scalastyle it:scalastyle && \
sbt scapegoat cpd stats
```

## Smutne podsumowania
Klasyczne testy modułowe (jednostkowe) nie wystarczają,
ponieważ poprawnie napisane testy modułowe,
które pokrywają 100% kodu aplikacji,
mogą być niepoprawne, jeśli dane wejściowe są źle dobrane.

[Haskell]:      /posts-by-langs/haskell

[Scalaz]:       /posts-by-libs/scalaz

[Scala Native]: /posts-by-tools/scala-native
[Scala.js]:     /posts-by-tools/scala-js
