---
title:    "Scala - No Universal Equality"
author:   TheKamilAdam
category: scala-native
tags:     compiler library monad operator type-classes
labels:   scalatic
langs:    haskell java scala
tools:    scala-jvm scala-js scala-native scalafix
libs:     cats scalatest scalaz utest
redirect_from:
  - no-universal-equality
  - scala-native/no-universal-equality
  - resentiment/no-universal-equality
  - resentiment/no-universal-equality.html
---

Ostatnim błędem zgłaszanym w kodzie projektu **[resentiment]** przez **[scalafix]**
jest "No Universal Equality" wynikający z użycia operatora `==`.

W języku **[Scala]** obiekty domyślnie porównuje się za pomocą operatora `==`.
Operator ten wywołuje pod spodem znaną z Javy metodę `equals`.
Operator `==` pozwala jednak na bezsensowne porównywanie obiektów, które są różnych klas.
Mimo że  poprawnie napisana metoda `equals` zawsze zwróci w takim przypadku `false`.
Np. porównanie `"A" == 'A'` zawsze zwróci `false`,
ponieważ `"A"` jest klasy `String`, a `'A'` jest klasy `Char`.
Umieszczenie czegoś takiego w kodzie zawsze jest błędem programisty i powinno spowodować nieskompilowanie się kodu.
Jest to nazywane problemem `Universal Equality`.
Można ten problem rozwiązać na kilka sposobów.

## Dotty - Multiversal Equality

Najprostszym sposobem rozwiązania problemu `Universal Equality` jest poczekać.
Nowa wersja **[kompilator]** Scala - *[Dotty](<https://dotty.epfl.ch/>)* będzie posiadać
[Multiversal Equality](<http://dotty.epfl.ch/docs/reference/other-new-features/multiversal-equality.html>)
co rozwiązuje problem.

## Biblioteki zewnętrzne
Jeśli jednak jesteście niecierpliwi istnieje kilka bibliotek rozwiązujących ten problem.
Wykorzystują one to,
że Scala pozwala implementować metody,
których wywołanie wygląda jak wywołanie operatora i zwykle tym nowym operatorem jest `===`.

### Scalactic
**[Scalactic](<http://www.scalactic.org>)**
jest to zestaw utilsów/narzędzi wydzielony ze **[ScalaTest]**,
który może być przydatny także w kodzie produkcyjnym.

**Scalactic** posiada wiele klas do porównywania wartości,
między innymi klasę `org.scalactic.TypeCheckedTripleEquals`,
która wymaga by oba porównywane obiekty były tej samej klasy.

Największą zaletą biblioteki **Scalactic** jest to,
że nie zagłębia się w teorię czystego programowania funkcyjnego (ang. *pure functional programming*)
i nie pojawiają się tam takie straszne terminy jak **[monada]** czy **[klasy typów]**.

### Scalaz i Cats
*Kolejność chronologiczna.*

Są to dwie wspaniałe biblioteki, które robią ze Scali język funkcyjny przypominający język **[Haskell]**.

Biblioteki te dzielą się na dwie główne części:
* *Data types* - tutaj znajdują się monady, które są w Haskellu, ale nie ma ich w bibliotece standardowej języka Scala
* *Type classes* - typ konstruktu systemowego, który obsługuje polimorfizm *ad hoc*.

Zarówno **[Scalaz]** jak i **[Cats]** posiadają klasę `Equal`,
która pozwala porównywać obiekty za pomocą operatora `===`.

Dobre porównanie obu bibliotek można znaleźć na [githubie](<https://github.com/fosskers/scalaz-and-cats>),
chociaż różnice są bardzo małe.
Obie biblioteki wspierają **[scala.js])**,
ale tylko **Scalaz** - **[scala native]**.

## "No Universal Equality" z Scalaz w projekcie Resentiment

W `build.sbt` do `SharedSettings` dodajemy bibliotekę `Scalaz`:
```scala
  libraryDependencies += "org.scalaz" %%% "scalaz-core" % "7.2.27",
```

Jeśli używamy scalafix w pliku `.scalafix.conf` można dodać/odkomentować linię:
```conf
DisableSyntax.noUniversalEquality = true
```

Teraz należy poprawić cały kod zamieniając `==` na `===`.
W przypadku projektu **resentiment** są to klasy `CalculatorTest` i `CalculatorIT`

```scala
package pl.writeonly.re.shared

import scalaz.Scalaz._
import utest._

object CalculatorTest extends TestSuite {
  override val tests: Tests = Tests {
    val calculator = new Calculator()
    'addition - {
      val addition: (Int, Int) => Int = (x, y) => calculator.add(x, y)
      "0 + 0 == 0" - {
        assert(addition(0, 0) === 0)
      }
      "2 + 2 == 4" - {
        assert(addition(2, 2) === 4)
      }
    }
    'multiplication - {
      val multiplication: (Int, Int) => Int = (x, y) => calculator.mul(x, y)
      "0 + 0 == 0" - {
        assert(multiplication(0, 0) === 0)
      }
      "2 + 2 == 4" - {
        assert(multiplication(2, 2) === 4)
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

```scala
package pl.writeonly.re.shared

import scalaprops.{Property, Scalaprops}
import scalaz.Scalaz._

object CalculatorIT extends Scalaprops {
  val calculator = new Calculator()

  val addition: (Int, Int) => Int = (x, y) => calculator.add(x, y)
  val additionTest = Property.forAll { (a: Int, b: Int) =>
    addition(a, b) === a + b
  }

  val multiplication: (Int, Int) => Int = (x, y) => calculator.mul(x, y)
  val multiplicationTest = Property.forAll { (a: Int, b: Int) =>
    multiplication(a, b) === a * b
  }

  val lessOrEqual: (Int, Int) => Boolean = (x, y) => calculator.leq(x, y)
  val lessOrEqualTest = Property.forAll { (a: Int, b: Int) =>
    lessOrEqual(a, b) === (a <= b)
  }
}

```

## Podsumowanie
Język Scala posiada kilka mniejszych lub większych błedów projektowych.
Część z nich zostanie poprawiona w nowej wersji kompilatora Dotty.
Jeśli jednak nie chcemy czekać do tego czasu warto się rozejrzeć w internecie,
ponieważ prawdopodobnie istnieją już rozwiązania naszych problemów.
"Universal Equality" jest jednym z problemów,
które w prosty sposób mogą być rozwiązane już dziś.

[resentiment]:  /posts-by-category/resentiment

[Haskell]:      /posts-by-langs/haskell
[Scala]:        /posts-by-langs/scala

[Cats]:         /posts-by-libs/cats
[ScalaTest]:    /posts-by-libs/scalatest
[Scalaz]:       /posts-by-libs/scalaz

[scala native]: /posts-by-tools/scala-native
[scalafix]:     /posts-by-tools/scalafix
[scala.js]:     /posts-by-tools/scala-js

[klasy typów]:  /posts-by-tags/type-classes
[kompilator]:   /posts-by-tags/compiler
[monada]:       /posts-by-tags/monad

