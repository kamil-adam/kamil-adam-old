---
title:    'Problem wywołań cebulowych w Scali'
author:   TheKamilAdam
category: scala-native
tags:     operator
langs:    clojure elixir elm fsharp julia kotlin lisp livescript meta-language ocaml perl racket scala
tools:    bash jekyll
libs:     scalaz
redirect_from:
  - scalapipe
  - scala-native/scalapipe
  - resentiment/scalapipe
  - resentiment/2019/02/27/scalapipe.html
---

## Problem: wywołania cebulowe

### Przypadek pierwszy - języki nieobiektowe

Jeśli mamy dane wejściowe, które chcemy przetworzyć za pomoca kilku funkcji po kolej, np:
```scala
third_function(second_function(first_function(data)))
```
Powstaje nam brzydkie i nieczytelne **wywołanie cebulowe**.
* Cebulowe, ponieważ nawiasy układają się jak warstwy w cebuli wokół rdzenia, którym są tu dane wejściowe.
* Nieczytelne, ponieważ przy czytaniu wzrok podąża od lewej do prawej.
W tym wypadku jednak, żeby zrozumieć sens linijki wzrok musi zawrócić i ponownie czytać od prawej do lewej.
* Brzydkie, ponieważ rozwiązanie to się nie *skaluje*,
jeśli mielibyśmy trzydzieści takich funkcji musielibyśmy w końcu złamać linię lub przepisać kod na taki:

```scala
val data1 = first_function(data)
val data2 = second_function(data1)
val data3 = third_function(data2)
// (...)
val data30 = thirty_function(data29)
```
Dlaczego uważam, że ten kod jest zły?
Ponieważ zawiera wiele niepotrzebnego szumu.
Szumem jest tutaj tworzenie pomocniczych zmiennych,
które często trudno nazwać w sensowny sposób.

Dlatego powinniśmy unikać *wywołań cebulowych*
Chyba, że piszemy w języku **[Clojure]**, **[Racket]** lub innym **[Lispie]**.
Wtedy formatujemy kod:
```clojure
(third_function
  (second_function
    (first_function data)))
```
i mówimy że wszystko jest w porządku.

### Przypadek drugi - języki obiektowe

Gdybyśmy programowali w języku obiektowym moglibyśmy zapisać:
```scala
data.first_function().second_function().third_function()
```
lub bardziej czytelnie:
```scala
data
  .first_function()
  .second_function()
  .third_function()
```

Oczywiście o ile `first_function` jest metodą obiektu `data`,
`second_function` jest metodą obiektu zwracanego przez `first_function` i tak dalej.
Jeśli nie, to musimy użyć haków
jak [implicit classes](<https://docs.scala-lang.org/overviews/core/implicit-classes.html>) w języku **[Scala]**
lub [extensions](<https://kotlinlang.org/docs/reference/extensions.html>) w języku **[Kotlin]**.

Jeśli nasz język programowania nie wspiera haków to pozostaje nam kod z tworzeniem wielu pomocniczych zmiennych:
```scala
val data1 = first_function(data)
val data2 = second_function(data1)
val data3 = third_function(data2)
// (...)
val data30 = thirty_function(data29)
```

### Prawdopodobna inspiracja - potoki w Bash i Jekyll

W powłoce systemowej **[Bash]** przesyłanie danych między jednym poleceniem,
a drugim jest realizowane przez potoki, np:
```bash
ps -a | sort | uniq | grep -v sh
```
Dwa lub więcej poleceń można połączyć w jedno polecenie za pomocą operatora pionowej kreski `|` (ang. *pipe*).

**[Jekyll]** także posiada potoki, ale dla utrudnienia nazywają się filtrami.
Precyzyjniej to Jekyll używa języka szablonów Liquid, a Liquid posiada Filtry.
Kod :
```jekyll
{{ "adam!" | capitalize | prepend: "Hello " }}
```
daje na wyjściu:
```
Hello Adam!
```

## Rozwiązanie - operator potoku

Jednym z możliwych rozwiązań **wywołań cebulowych** jest operator potoku (ang. *pipe operator*) `|>`.
Pozwala on na zapis:
```elixir
data |> first_function |> second_function |> third_function
```
lub czytelniej:
```elixir
data
  |> first_function
  |> second_function
  |> third_function
```

Został spopularyzowany przez język [Elixir](<https://hexdocs.pm/elixir/Kernel.html#%7C%3E/2>),
ale wcześniej był już używany w odmianach języka **[Meta Language]** jak [OCaml](http://caml.inria.fr/pub/docs/manual-ocaml/libref/Pervasives.html#VAL%28%7C%3E%29)
oraz [F#](https://en.wikibooks.org/wiki/F_Sharp_Programming/Higher_Order_Functions#The_.7C.3E_Operator).
W tym ostatnim istnieje nawet możliwość samodzielnego zdefiniowania operatora potoku za pomocą linii:
```F#
let inline (|>) x f = f x
```

Na fali popularności *operator potoku* został dodany także do wielu innych języków programowania takich jak
[Elm](<https://edmz.org/design/2015/07/29/elm-lang-notes.html>),
[LiveScript](<http://livescript.net/#piping>),
[Julia](<https://docs.julialang.org/en/v1/base/base/#Base.:%7C%3E>) czy
[Hack](<https://docs.hhvm.com/hack/expressions-and-operators/pipe>).

Część z nich zawiera także drugi podobny operator zwany *back pipe operator* zapisywany `<|` lub `|>>`.
Ten drugi zapis prawdopodobnie inspirowany jest językiem [Clojure](<https://clojure.org/guides/threading_macros>).

Tak, **[Clojure]** posiada dużo lukru składniowego,
żeby poprawić standardową nieczytelność **[Lispa]** dzięki czemu możemy zapisać:

```clojure
(-> data (first_function) (second_function) (third_function))
```
**lub**
```clojure
(--> data (first_function) (second_function) (third_function))
```

Po co nam dwa operatory potoku, tj `|>` i `<|`?

Otóż `|>` dodaje argument na początku listy parametrów, a `<|` - na końcu listy.
Czyli jeśli w języku **[Perl]** 5 wprowadzonoby oba operatory to moglibyśmy wywołać:

```perl
(0, 1, 2, 3) <| grep { $_ != 2} <| map { $_ * 2})
```

## Rozwiązanie w Scali - ScalaPipe i operator drozda

Język **[Scala]** nie posiada operatora potoku,
ale posiada możliwość definiowania operatorów.
W internecie pod hasłem *ScalaPipe* można znaleść wiele możliwych implementacji.
Moja ulubiona to:
```scala
package pl.writeonly.re.shared.scalapipe

trait ScalaPipeOps {
  implicit def toPipe[A](a: A): ScalaPipe[A] = ScalaPipe(a)

  class ScalaPipe[A](a: A) {
    def |>[B](f: A => B): B = f(a)
  }

  object ScalaPipe {
    def apply[A](v: A): ScalaPipe[A] = new ScalaPipe(v)
  }

}

object ScalaPipeOps extends ScalaPipeOps
```

Na szczęście nie musimy sami implementować operatora *ScalaPipe*,
ponieważ istnieje on już w bibliotece **[Scalaz]**
ale dla utrudnienia nazywa się **operator drozda** (ang. *Thrush combinator*).
Używając tego operatora z łatwością możemy zapisać:
```scala
import scalaz.Scalaz._

data |> firstFunction |> secondFunction |> threeFunction
```

Niestety Scala to nie **[Elixir]** i nie możemy zapisać:
```scala
data
  |> firstFunction
  |> secondFunction
  |> threeFunction
```

Wywołanie zdefiniowanego przez nas operatora nie może znajdować się bezpośrednio na początku linii.
Ale może znajdować się na końcu linii:
```scala
data |>
  firstFunction |>
  secondFunction |>
  threeFunction
```

Lub, co wygląda jeszcze gorzej, na początku linii poprzedzony kropką:
```scala
data
  .|>(firstFunction)
  .|>(secondFunction)
  .|>(threeFunction)
```

Jednak w takim wypadku lepiej użyć aliasu `into`:
```scala
data
  .into(firstFunction)
  .into(secondFunction)
  .into(threeFunction)
```

## Podsumowanie

Składnia języka **[Scala]** jest elastyczna, ale czasem nie aż tak bardzo jak była by potrzeba.
Mimo to, łatwo definiować nowe operatory oraz składnię, która może znacząco skrócić i uprościć kod.
Warto jednak wcześnie sprawdzić czy nasz operator nie jest zdefiniowany w istniejącej i popularnej bibliotece.

[Clojure]:       /posts-by-langs/clojure
[Elixir]:        /posts-by-langs/elixir
[Kotlin]:        /posts-by-langs/kotlin
[Lispa]:         /posts-by-langs/lisp
[Lispie]:        /posts-by-langs/lisp
[Meta Language]: /posts-by-langs/meta-language
[Perl]:          /posts-by-langs/perl
[Racket]:        /posts-by-langs/racket
[Scala]:         /posts-by-langs/scala

[Scalaz]:        /posts-by-libs/scalaz

[Bash]:          /posts-by-tools/bash 
[Jekyll]:        /posts-by-tools/jekyll
