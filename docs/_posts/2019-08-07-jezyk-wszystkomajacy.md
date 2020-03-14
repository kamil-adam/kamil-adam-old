---
title:    'Kolejny język programowania - język wszystkomający'
author:   TheKamilAdam
category: programming
tags:     lambda-calculus type-classes
langs:    clojure eiffel elm emacs-lisp fsharp go haskell java javascript kotlin lisp meta-language ocaml perl python racket reasonml ruby rust sather scala scheme smalltalk tcl
tools:    jvm node-js
libs:     akka arrow cats pulsar quasar scalaz vavr zio
redirect_from:
  - jezyk-wszystkomajacy
  - programming/jezyk-wszystkomajacy
---

**Język wszystkomający** jest to język w którym można programować 
[imperatywnie], [funkcyjnie], [obiektowo], [proceduralnie] oraz [strukturalnie].
Prawdopodobnie jest to język zły do nauki jako pierwszy język programowania.
Może też być złym językiem do nauki pojedynczych paradygmatów programowania,
jeśli nie mamy odpowiedniej dyscypliny.
Jeśli jednak mamy tę dyscyplinę jest to genialny język do nauki nowych paradygmatów programowania.
Po co uczyć się nowych paradygmatów programowania starałem się wyjaśnić w artykule 
[Kolejny język programowania do nauki - paradygmaty programowania](/paradygmaty-programowania).

## Pierwszy język wszystkomający
Chyba najpopularniejszym językiem wszystkomającym jest **[Scala]**.
Jednak to nie ten język programowania chciałbym Tobie polecić.
A język będący pierwowzorem Scali.

Istnieje popularna legenda,
że Martin Odersky tworząc język **[Scala]** połączył świat obiektowy, czyli język **[Java]**, 
ze światem funkcyjnym, czyli z językiem **[Haskell]**.
Jednak gdyby była to prawda to nie byłyby potrzebne dodatkowe biblioteki jak **[Scalaz]** lub **[Cats]** robiące z Scali Haskella.
Tak naprawdę Martin Odersky dostał zlecenie dodania typów polimorficznych (nazywanych w Javie generykami)
umożliwiających metaprogramowanie (nazywane w Javie programowaniem generycznym) do Javy 1.4.

Ponieważ praca nad dodaniem typów generycznych do Javy była trudna,
Martin Odersky stworzył nowy język programowania na **[JVM]** nazwany przez niego Generic Java.
Wzorowany był on na innym do metaprogramowania,
czyli funkcyjnym **[Meta Language]**.
A dokładniej jego obiektowo-funkcyjnej wersji,
czyli język **[OCaml]**.
Później Generic Java dostała nową nazwę i tak powstał język programowania Scala.

Chyba największą zmianą jaką zrobił Martin Odersky była zamiana znaczących wcięć na wąsate nawiasy,
dzięki czemu **[Scala]** nie wygląda jak **[Python]**.
Ale podobno co wersje Scali zastanawia się czy postąpił słusznie
i czy nie przywrócić znaczących wcięć w miejsce wąsatych nawiasów.

Ale dlaczego nikt o tym nie mówi i powszechnie uważa się,
że **[Scala]** była pierwszym językiem obiektowo-funkcyjnym?
Może dlatego,
że z trzech rodzin funkcyjnych języków programowania **[OCaml]** jest najmniej znany.
Na dowód tego mam przykładowe zapytania do wyszukiwarki google. 
* `scheme tutorial` - 1 770 000 000 wyników
* `haskell tutorial` - 1 220 000 wyników
* `ocaml tutorial` -233 000 wyników

**[OCaml]** jest tak mało znany,
że nie pojawia się nawet w rankingu [Tiobe],
a **[Meta Language]** pojawia się w drugiej 50.

Mimo tego to właśnie język **[OCaml]** chciałbym Tobie polecić jako kolejny język do nauki.
Zwłaszcza jeśli nie lubisz składni języka **[Scala]** lub maszyny wirtualnej **[JVM]**.

Ważne jest też to,
że składnia języków **[OCaml]** powoli zaczyna być doceniana
i przeżywa swój renesans pod postacią nowych języków programowania jak:
* **[F#]** - dialekt języka OCaml na platformę .Net
* **[ReasonML]** - dialekt języka OCaml transpiloway do **[JS]**
* **[Elm]** - język transpilowany do **[JS]** inspirowany składnią języków **[Meta Language]** i **[Haskell]**

## Język funkcyjny a pragmatyczny programista

Dlaczego jednak autorzy książki nie wspomnieli o języku **[Ocaml]** powstałym w roku 1996?
Nie wspomnieli też o językach
**[LISP]** (1958), **[Meta Language]** (1973), **[Scheme]** (1975), **[Haskell]** (1990) oraz **[Racket]** (1995).
Ani nawet o **[Emacs Lisp]** używanym do skryptowania w polecanym przez nich edytorze kodu Emacs!

Książka [Pragmatyczny programista] powstała w 2000 roku.
Świat informatyki i języków programowania wyglądał wtedy inaczej.
Istniały trzy główne grupy języków programowania (przynajmniej według autorów książki [Pragmatyczny programista]):
1. Niskopoziomowe, rozwlekłe [języki korporacyjne](/jezyk-korporacyjny) i [języki natywne](/jezyk-natywny) -
   ciężko się w nich pisało, były rozwlekłe i wszystkie były podobne do siebie.
2. Wysokopoziomowe, dynamicznie typowane [języki skryptowe](/jezyk-skryptowy) - 
   **[TCL]**, **[Perl]**, **[Python]**.
   **[Ruby]** był jeszcze nieznany poza Japonią.
3. Języki eksperymentalne w których pokładano przyszłość, czyli:
   * **[Smalltalk]** i jego implementacja [Squeak]. 
     Język totalnie obiektowy (zwany reflektywnym) w którym można było wszystko przedefiniować.
     Odbijało się to jednak negatywnie na jego szybkości.
   * **[Eiffel]** oraz wzorujący się na nim **[Sather]**,
     promujące programowanie kontraktowe. 

Żaden z języków eksperymentalnych nie przebił się do mainstreamu.
Jednocześnie autorzy nie zająkneli się na temat programowania funkcyjnego wierząc,
że języki dynamicznie typowane i totalnie obiektowe (reflektywne) 
oraz programowanie kontraktowe rozwiążą wszystkie nasze problemy.
Dziś wiadomo że nie rozwiązały.

Część winy za to ponoszą naukowcy,
tworzący języki funkcyjne,
siedzący w swoich wysokich wieżach i z góry spoglądający na zwykłych programistów aplikacji biznesowych.

## Postscriptum

Jeśli jednak chcesz uczyć się języka,
który jest używany w celach biznesowych,
polecam Scalę.
Jeśli jednak nie chcesz uczyć się Scali polecam małe porównanie języków programowania na **[JVM]**
i które paradygmaty można osiągnąć w nich przy użyciu zewnętrznych bibliotek.

| Paradygmat | [Java] | [Scala] | [Kotlin] | [Clojure] |
| ------ | ------ | ------ | ------ | ------ |
| Programowanie imperatywne/proceduralne/obiektowe z listami mutowalnymi | Java | *Sclava, ale nie ma imperatywnej pętli `for`* | Kotlin, *ale nie ma imperatywnej pętli `for`* | *Nie można, listy w Clojure z założenia są niemutowalne* |
| Programowanie obiektowo-funkcyjne, jak w języku **[OCaml]**, plus niemutowalne listy | Java + **[Vavr]** | Scala | *Scotlin*, czyli Kotlin + Vavr-kotlin | Clojure |
| Programowanie czysto funkcyjne jak w języku **[Haskell]** z typami wyższych rzędów | Java + **[Functional Java]** | Scala + **[Scalaz]** lub Scala + **[Cats]** | Kotlin + **[ARROW]** | *Nie można, Clojure jest dynamicznie typowany. Ale trwają prace nad @TypedClojure* |
| Programowanie Aktorowe z *ciężkimi* aktorami | Java + **[Akka]** | Scala + **[Akka]** | Kotlin + **[Akka]** | *Nie widziałem. Autor języka Clojure ceni wyżej pamięć transakcyjną niż model aktorów* |
| Programowanie z włóknami (ang. *fiber*), kanałami (ang. *channel*) i *lekkimi* aktorami | prawdopodobnie można użyć bibliotek **[ZIO]** lub **[Quasar]** | Scala + **[ZIO]** | Kotlin + **[Quasar]** | Clojure + **[Pulsar]** |

Tu należy się małe wyjaśnienie:
* *Sclava* jest to określenie imperatywnego kodu napisanego w Scali przez programistę Javy 6,
  który tylko zerknął na dokumentację składni Scali
  i swoje imperatywne przyzwyczajenia do nowopoznanego języka.
* *Scotlin* lub *Skotlin* jest to określenie tego czym powoli staje się język Kotlin,
  który początkowo miał być pragmatycznym i prostym do nauki językiem ogólnego przeznaczenia.
  A powoli zbiera wszystkie pomysły ze Scali. 
  Aktualnie trwają [dyskusje](<https://discuss.kotlinlang.org/t/type-classes-in-kotlin/410/3>)
  nad wprowadzeniem **[Type Classes]** do tego pragmatycznego i prostego języka programowania.

Z książek polecam [Java. Programowanie funkcyjne].
Nawet jeśli nie programujesz w Javie warto przeczytać tę książkę.
Ponieważ pokazuje ona jak niesamowicie elastyczne są języki obiektowe.
Dzięki czemu można w łatwy sposób zaimplementować bibliotekę,
która umożliwia programować funkcyjnie w języku obiektowym.

[Clojure]:         /posts-by-langs/clojure
[Eiffel]:          /posts-by-langs/eiffel
[Elm]:             /posts-by-langs/elm
[Emacs Lisp]:      /posts-by-langs/emacs-lisp
[F#]:              /posts-by-langs/fsharp
[Haskell]:         /posts-by-langs/haskell
[Java]:            /posts-by-langs/java
[JS]:              /posts-by-langs/javascript
[Kotlin]:          /posts-by-langs/kotlin
[LISP]:            /posts-by-langs/lisp
[Meta Language]:   /posts-by-langs/meta-language
[OCaml]:           /posts-by-langs/ocaml
[Perl]:            /posts-by-langs/perl
[Python]:          /posts-by-langs/python
[Racket]:          /posts-by-langs/racket
[ReasonML]:        /posts-by-langs/reasonml
[Ruby]:            /posts-by-langs/ruby
[Sather]:          /posts-by-langs/sather
[Scala]:           /posts-by-langs/scala
[Scheme]:          /posts-by-langs/scheme
[Smalltalk]:       /posts-by-langs/smalltalk
[TCL]:             /posts-by-langs/tcl

[JVM]:             /posts-by-tools/jvm
[node.js]:         /posts-by-tools/node-js

[Akka]:            /posts-by-libs/akka
[ARROW]:           /posts-by-libs/arrow
[Cats]:            /posts-by-libs/cats
[Functional Java]: /posts-by-libs/functionaljava
[Pulsar]:          /posts-by-libs/pulsar
[Quasar]:          /posts-by-libs/quasar
[Scalaz]:          /posts-by-libs/scalaz
[Vavr]:            /posts-by-libs/vavr
[ZIO]:             /posts-by-libs/zio

[rachunek lambda]: /posts-by-tags/lambda-calculus
[Type Classes]:    /posts-by-tags/type-classes

[Java. Programowanie funkcyjne]: /read-books/java-programowanie-funkcyjne
[Pragmatyczny programista]:      /read-books/pragmatyczny-programista

[Squeak]: https://pl.wikipedia.org/wiki/Squeak
[Tiobe]:  https://www.tiobe.com/tiobe-index/

[imperatywnie]: https://pl.wikipedia.org/wiki/Programowanie_imperatywne
[funkcyjnie]: https://pl.wikipedia.org/wiki/Programowanie_funkcyjne
[obiektowo]: https://pl.wikipedia.org/wiki/Programowanie_obiektowe
[proceduralnie]: https://pl.wikipedia.org/wiki/Programowanie_proceduralne
[strukturalnie]: https://pl.wikipedia.org/wiki/Programowanie_strukturalne
