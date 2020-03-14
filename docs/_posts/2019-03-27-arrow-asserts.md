---
title:    "uTest - operator Arrow Asserts"
author:   TheKamilAdam
category: scala-native
tags:     operator
langs:    scala
libs:     utest
redirect_from:
  - arrow-asserts
  - scala-native/arrow-asserts
  - resentiment/arrow-asserts
  - resentiment/2019/03/27/arrow-asserts.html
---

Dziś krótki wpis o tym, że warto czytać dokumentację. Zapraszam.

## Arrow Asserts

Framework **[uTest]** do testów jednostkowych dla języka **[Scala]** udostępnia **[operator]** `a ==> b` zwany po angielsku **Arrow Asserts**
(po polsku *Asercja Strzałkowa* ?). Jest on skrótem od `assert(a == b)`. Dzięki niemu kod :

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

może zostać zastąpiony swoją czytelniejszą wersją:

```scala
package pl.writeonly.re.shared.calculator

import utest._

object CalculatorTest extends TestSuite {
  override val tests: Tests = Tests {
    val calculator = new Calculator()
    'addition - {
      val addition: (Int, Int) => Int = (x, y) => calculator.add(x, y)
      "0 + 0 == 0" - {
        addition(0, 0) ==> 0
      }
      "2 + 2 == 4" - {
        addition(2, 2) ==> 4
      }
    }
    'multiplication - {
      val multiplication: (Int, Int) => Int = (x, y) => calculator.mul(x, y)
      "0 + 0 == 0" - {
        multiplication(0, 0) ==> 0
      }
      "2 + 2 == 4" - {
        multiplication(2, 2) ==> 4
      }
    }
    'less_or_equal - {
      val less_or_equal: (Int, Int) => Boolean = (x, y) => calculator.leq(x, y)
      "0 <= 2 == true" - {
        less_or_equal(0, 2) ==> true
      }
      "2 <= 0 == false" - {
        less_or_equal(2, 0) ==> false
      }
    }
  }
}
```

[Scala]:    /langs/scala

[uTest]:    /libs/utest

[operator]: /tags/operator
