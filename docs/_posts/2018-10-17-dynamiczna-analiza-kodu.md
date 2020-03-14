---
title:    "Dynamiczna analiza kodu dla SBT - testy jednostkowe"
author:   TheKamilAdam
category: scala-native
tags:     code-analysis dynamic-code-analysis 
labels:   minitest greenlight
langs:    scala
tools:    scala-jvm scala-js scala-native
libs:     specs2 scalatest utest
redirect_from:
  - dynamiczna-analiza-kodu
  - scala-native/dynamiczna-analiza-kodu
  - resentiment/dynamiczna-analiza-kodu
  - resentiment/2018/10/17/dynamiczna-analiza-kodu.html
---

> Dynamiczna analiza programu to analiza oprogramowania komputerowego wykonywanego przez wykonywanie programów na rzeczywistym lub wirtualnym procesorze.
> Korzystanie z metryk testów, takich jak pokrycie kodu, zapewnia, że przetestowano odpowiednią ilość możliwych zachować programu.
> Aby analiza dynamiczna programu była skuteczna, program docelowy musi być wykonany z wystarczającą ilością danych wejściowych do testów, aby uzyskać interesujące zachowanie.
> Testy jednostkowe, testy integracyjne, testy systemowe i testy akceptacyjne wykorzystują dynamiczną analizę programu.

Za [wikipedią](<https://en.wikipedia.org/wiki/Dynamic_program_analysis>).

W tym poście skupię się tylko na frameworkach do testów, testach jednostkowych i mierzeniu pokrycia kodu testami.

## Frameworki dla testów

* [ScalaTest](<http://www.scalatest.org>) -
jest to chyba najbardziej znany i rozbudowany framework dla testów do języka Scala.
Wspiera Scala.js w wersji 0.6.x. Ostatnia wersja snapshot wspiera Scala Native.
Posiada osiem różnych [stylów pisania testów](<http://www.scalatest.org/user_guide/selecting_a_style>),
jednak autorzy zachęcają do wybrania dwóch dla projektu.
Jeden styl dla testów jednostkowo-integracyjnych, drugi - dla akceptacyjnych.
Najciekawsze style to:
  * `FunSuite` i `FlatSpec` - są to proste, płaskie style pisania testów podobne do JUnit.
  Jeśli jednak są dla kogoś zbyt awangardowe jest możliwość pisania testów w Scali z użyciem [JUnit i assercji z ScalaTest](<http://www.scalatest.org/getting_started_with_junit_4_in_scala>)
  * `FunSpec`, `FreeSpec` i `WordSpec` - są to style testów umożliwiające pisanie zagnieżdżonych testów,
  jednak zagnieżdżenia nie są wymagane (za wyjątkiem stylu `FunSpec`, gdzie trzeba użyć przynajmniej jeden poziom `Describe`)
  * `FeatureSpec` - jest to zaawansowany styl dla pisania testów akceptacyjnych.
* [specs2](<https://etorreborre.github.io/specs2/>) -
jest to drugi najbardziej znany framework do pisania testów dla języka Scala.
Od wersji czwartej wspiera Scala.js w wersji 0.6.x.
Ma dwa style pisania testów:
  * `org.specs2.mutable.Specificatio` - najbardziej przypomina `FreeSpec` i jest przewidziany do pisania testów jednostkowych i integracyjnych.
  * `org.specs2.Specification` - styl testów przewidziany do pisania testów akceptacyjnych,
* [uTest](<https://github.com/lihaoyi/utest>) -
czarny koń tego zestawienia.
Wspiera Scala.js w wersji 0.6.x i 1.0.x oraz Scala Native.
Autor frameworka skromnie chwali się, że wspiera wszystkie wersje języka Scala.
Ma jeden styl pisania testów który wygląda jak `FreeTest`.
* [MiniTest](<https://github.com/monix/minitest>) -
stworzony przez [Monix](<https://monix.io>) do testowania swojej biblioteki.
Wspiera Scala.js w wersji 0.6.x.
Ma jeden styl pisania testów, który wygląda jak `FunSuite`.
* [Greenlight](<https://github.com/greencatsoft/greenlight>) -
projekt niestety umarł.
Wspiera Scala.js w wersji 0.6.x.
Ma jeden styl pisania testów, który wygląda jak `FlatSpec`

## Test jednostkowy w uTest

W `build.sbt` dodajemy `uTest` do zależności projektu:
```scala
  libraryDependencies += "com.lihaoyi" %%% "utest" % "0.6.5" % "test"
```

i ustawiamy jako framework testowy:
```scala
  testFrameworks += new TestFramework("utest.runner.Framework"),
```


Tworzymy klasę `Calculator`, którą będziemy testować :
```scala
package pl.writeonly.re.shared

class Calculator {
  type T = Int

  def add(a: T, b: T): T = a * b

  def mul(a: T, b: T): T = a + b

  def leq(a: T, b: T): Boolean = a < b

}
```

Oraz testy dla niej:

```scala
package pl.writeonly.re.shared

import utest._

object CalculatorTest extends TestSuite {
  override val tests: Tests = Tests {
    val calculator = new Calculator()
    'addition - {
      val addition: (Int, Int) => Int = (x, y) => calculator.add(x, y)
      "0 + 0 == 0" - {
        assert(addition(0, 0) == 0)
      }
      "2 + 2 == 4" - {
        assert(addition(2, 2) == 4)
      }
    }
    'multiplication - {
      val multiplication: (Int, Int) => Int = (x, y) => calculator.mul(x, y)
      "0 + 0 == 0" - {
        assert(multiplication(0, 0) == 0)
      }
      "2 + 2 == 4" - {
        assert(multiplication(2, 2) == 4)
      }
    }
    'less_or_equal - {
      val less_or_equal: (Int, Int) => Boolean = (x, y) => calculator.leq(x, y)
      "0 <= 2 == true" - {
        assert(less_or_equal(0, 2))
      }
      "2 <= 0 == false" - {
        assert(!less_or_equal(2, 0))
      }
    }
  }
}
```

Wszystko kompilujemy i uruchamiamy testy za pomocą polecenia:
```bash
sbt clean compile test
```

Testy przeszły, jesteśmy szczęśliwi:
```log
[info] -------------------------------- Running Tests --------------------------------
[info] + pl.writeonly.re.shared.CalculatorTest.addition.0 + 0 == 0 0ms
[info] + pl.writeonly.re.shared.CalculatorTest.addition.2 + 2 == 4 0ms
[info] + pl.writeonly.re.shared.CalculatorTest.multiplication.0 + 0 == 0 0ms
[info] + pl.writeonly.re.shared.CalculatorTest.multiplication.2 + 2 == 4 0ms
[info] + pl.writeonly.re.shared.CalculatorTest.less_or_equal.0 <= 2 == true 0ms
[info] + pl.writeonly.re.shared.CalculatorTest.less_or_equal.2 <= 0 == false 0ms
[info] Tests: 6, Passed: 6, Failed: 0
```

## Testowanie testów - mierzenie pokrycia kodu testami
Skąd mamy mieć pewność, że przetestowaliśmy klasę `Calculator` w wystarczający sposób?
Możemy to częściowo sprawdzić mierząc pokrycie kodu produkcyjnego (tj. klasy `Calculator`) testami.

Jeśli chodzi o narzędzia do mierzenia pokrycia kodu testami to tutaj król jest jeden
i jest nim [scoverage](<http://scoverage.org>).
Posiada on wtyczki do:
* [sbt](<https://github.com/scoverage/sbt-scoverage>)
* [maven](<https://github.com/scoverage/scoverage-maven-plugin>)
* [gradle](<https://github.com/scoverage/gradle-scoverage>)
* [scalac](<https://github.com/scoverage/scalac-scoverage-plugin>)
* [sonarqube](<https://github.com/scoverage/sonar-scoverage-plugin>)

Przy czym użyjemy tutaj tylko pierwszej z nich.


Dodajemy `sbt-scoverage` do `build.sbt`:
```scala
addSbtPlugin("org.scoverage" % "sbt-scoverage" % "1.5.1")
```
I wykonujemy:
```bash
sbt clean coverage test && sbt coverageReport
```
gdzie:
* `coverage` -  wykonuje kompilacje z instrumentacją kodu
* `coverageReport` -  generuje raport

Niestety powyższe polecenie działa tylko dla implementacji Scala/JVM i Scala.js.
Scala Native nie wspiera instrumentacji kodu.
Dlatego projekt [resentiment](https://github.com/writeonly/resentiment) trzeba kompilować za pomocą polecenia:
```bash
sbt clean compile re/test coverage reJVM/test reJS/test && sbt coverageReport
```

Teraz możemy otworzyć pliki `<folder_projektu>/re/js/target/scala-2.11/scoverage-report/index.html`
oraz `<folder_projektu>/re/jvm/target/scala-2.11/scoverage-report/index.html`
i zobaczyć, że klasa `Calculator` ma 100% pokrycia kodu testami.
Lider nietechniczny i Product Owner powinni być z nas zadowoleni.
