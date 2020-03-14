---
title:    'Kolejny język programowania do nauki - paradygmaty programowania'
author:   TheKamilAdam
category: programming
tags:     lambda-calculus
langs:    clojure coffeescript common-lisp elm emacs-lisp fsharp go haskell java javascript kotlin lisp livescript meta-language ocaml perl purescript python racket reasonml ruby rust scala scheme smalltalk typescript
tools:    jvm node-js
redirect_from:
  - paradygmaty-programowania
  - programming/paradygmaty-programowania
  - onions/paradygmaty-programowania
---

[Zdecydowaliśmy się nauczyć programować](/jezyk-skryptowy).
[I zostać programistami](/czy-nadaje-sie-na-programiste).
Może nawet dostaliśmy pierwszą pracę.
I w tej pracy ktoś nam powiedział, że uczy się nowego, a więc i kolejnego, języka programowania.
Czemu się uczy?
Bo np. usłyszał/przeczytał cytat:

> Warto uczyć się przynajmniej jednego **nowego języka** rocznie.
**Różne języki** programowania pozwalają rozwiązywać te **same problemy** na **różne sposoby**.
Stałe poznawanie nowych rozwiązań ułatwia szersze postrzeganie rozwiązywanych problemów
i zmniejsza ryzyko wybierania utartych sposobów postępowania.

Andrew Hunt, David Thopmas *[Pragmatyczny programista]. Od czeladnika do mistrza.* Pogrubienia moje.

Jest to prawdopodobnie najsławniejszy cytat z tej książki.
I może się wydawać dość dziwny.
Przeanalizujmy go, więc zdanie po zdaniu.

> Warto uczyć się przynajmniej jednego **nowego języka** rocznie.

Ale po co?
Na co?
Przecież mamy dobrze płatną pracę i nic się nie zmieni.
Bo przecież w informatyce nic się nie zmienia.
Za wyjątkiem takich wypadków jak to że:
* C zmiażdżyło Pascala oraz zastąpiło większość języków asemblerowych,
stając się podstawowym językiem niskokoziomowym do pisania systemów operacyjnych i systemów wbudowanych.
* **[Java]** (z pomocą C#) wygryzła C++ i Cobola stając się głównym [językiem korporacyjnym](/jezyk-korporacyjny).
* **[Python]** wygryzł języki **[Perl]** oraz **[TCL]** i dalej spycha pozostałe [języki skryptowe](/jezyk-skryptowy) do coraz głębszej niszy.
* **[Python]** wygryzł języki **[Scheme]** i **[Racket]** z zastosowań naukowych. 

Aktualnie:
* **[Rust]** stara się zostać głównym [językiem natywnym](/jezyk-natywny).
* **[Go]** stara się zostać głównym [językiem korporacyjnym](/jezyk-korporacyjny)
i może także głównych [językim natywnym](/jezyk-natywny).

Tak więc warto się uczyć **nowych języków** programowania.
Pytanie tylko których.
Tu odpowiedź podsuwa nam kolejne zdanie:

> **Różne języki** programowania pozwalają rozwiązywać te **same problemy** na **różne sposoby**.

Drugie zdanie cytatu już lepiej precyzuje których języków programowania się uczyć.
Jednak o wiele trudniej je przeanalizować.

## Różne języki programowania -> różne sposoby programowania -> różne paradygmaty programowania

Powinniśmy uczyć się **różnych języków**,
które pozwalają programować na **różne sposoby**.
Różne sposoby programowania są popularnie nazywane paradygmatami programowania.
Ile tych paradygmatów jest?
Tutaj najlepiej sięgnąć do literatury.

### Czysta architektura

W książce [Czysta Architektura] Robert C. Martin zapewnia,
że są tylko trzy paradygmaty programowania i z tego co można wyczytać w jego książce są to:
1. **Programowanie strukturalne** - wymyślone w 1968  przez Edsger Dijkstra.
Edsger Dijkstra skrytykował używanie instrukcji `goto` 
i zalecał używanie instrukcji sterujących selekcji  (`if`/`then`/`else`) oraz iteracji (`for`/`while`/`until`).  
2. **Programowanie obiektowe** - wymyślone w roku 1966 przez Ole-Johan Dahl i Kristen Nygaard
przy tworzeniu języków do symulacji SIMULA I i SIMULA-67.
Rozwiązuje problem polimorfizmu.
3. **Programowanie funkcyjne** - wymyślone w roku 1936 przez Alonzo Church jako [rachunek lambda].
Zaimplementowany w roku 1958 w języku **[LISP]** przez John McCarthy.
Polega na niezmienności (ang. *immutable*).

Warto od razu wspomnieć,
że o ile Robert C. Martin jest jedną z ważniejszych osób dla informatyki biznesowej
i jego książka [Czysty kod] wpłynęła niesamowicie pozytywnie na sposób pisania oprogramowania,
to często żyje w swoim wyidealizowanym świecie.
Widać to zwłaszcza w książce [Mistrz czystego kodu].

Spróbujmy zderzyć z rzeczywistością to co napisał:
1. **Programowanie strukturalne** zostało zdefiniowane dopiero w 1968 jako nie używanie instrukcji `goto`,
ale przypadkiem zaimplementowane już w 1958 w języki **[LISP]**.
2. **Programowanie obiektowe** było definiowane co najmniej trzy razy
   plus jeszcze dwa inne systemy podszywają się pod programowanie obiektowe:
   1. Dla języka SIMULA, a właściwie SIMULA-67 w 1967 roku.
      Bardzo specyficzne i na potrzeby tworzenia symulacji zachowania statków.
   2. Dla języka **[Smalltalk]** w 1972 roku.
      Jest totalne programowanie obiektowe,
      gdzie wszystko jest obiektem,
      a obiekty komunikują się wiadomościami.
      Dziś tę definicję spełnia tylko **[Ruby]**.
   3. Dla języka C++ w 1985 roku.
      Jest to obecnie najpopularniejsza definicja obiektowości.
      Oparta na dziedziczeniu (czasem nazywanym rozszerzanie lub implementowaniem) klas, interfejsów i/lub protokołów.
   4. Duck typing i systemy typu strukturalnego, 
      gdzie nie implementuje się interfejsów, 
      ale obiekty po prostu mają posiadać pewien zestaw metod. 
      Używane głównie w [językach skryptowych](/jezyk-skryptowy),
      ale od niedawna także w statycznie typowanym jezyku **[Go]**.
   5. CLOS (Common Lisp Object System) -
      system obiektowy oparty o multimetody używany w **[Common Lisp]**.
3. **Programowanie funkcyjne** zostało zdefiniowane w 1936 jako [rachunek lambda].
Od tej pory były trzy główne próby stworzenia języka funkcyjnego:
   1. Dynamicznie typowany język z rekurencją ogonową i leniwymi listami (strumieniami),
      czyli **[LISP]** stworzony w roku 1958. 
      Ustandaryzowany jako **[Scheme]** w 1975 roku.
      Alternatywny standard **[Common Lisp]** jest bardziej podobny do zwykłych (imperatywnych) języków programowania,
      ponieważ  nie gwarantuje rekurencji ogonowej.
   2. Statycznie typowany, generyczny język programowania z rekurencją i strumieniami,
      czyli **[Meta Language]** stworzony  w 1973 roku. 
      Ustandaryzowany jako **Standard ML** w 1990 roku. 
      Co ciekawe **[OCaml]** z 1996 roku jest prawdopodobnie pierwszym [językiem wszystkomającym](/jezyk-wszystkomajacy), 
      czyli obiektowo-funkcyjnym.
   3. W pełni funkcyjny język programowania kompilowany do rachunku lambda,
      czyli **[Haskell]** stworzony w roku 1990.
      Ponieważ nie zbudowano jeszcze komputera wykonującego natywnie [rachunek lambda]
      to jest on dalej kompilowany do imperatywnych rozkazów procesora.  

### Scala. Nauka programowania

W książce [Scala. Nauka programowania] Vikash Sharma 
wymienia za to cztery paradygmaty programowania:
* **Programowanie imperatywne** - *najpierw zrób to, potem zrób tamto*.
* **Programowanie funkcyjne** - *oceń i zrób*.
* **Programowanie logiczne** - *odpowiedź za pomocą rozwiązania*.
* **Programowanie zorientowane obiektowo** - przekazuje **komunikaty** między obiektami, 
aby w ten sposób symulować ewolucję faktycznie używanego podejścia. 

Z czego programowanie logiczne jest dedykowane do specyficznej klasy problemów matematycznych.

### http://wazniak.mimuw.edu.pl
  
Na stronie <http://wazniak.mimuw.edu.pl>ę
w kursie [Paradygmaty programowania](http://wazniak.mimuw.edu.pl/index.php?title=Paradygmaty_programowania)
autor zgadza się co do czterech głównych paradygmatów z Vikash Sharma,
ale dodaje jeszcze cztery [inne paradygmaty](<http://wazniak.mimuw.edu.pl/index.php?title=Paradygmaty_programowania/Wyk%C5%82ad_15:_Inne_paradygmaty_warte_wspomnienia>):
* **Programowanie strukturalne**.
* **Programowanie sterowane przepływem danych**.
* **Programowanie sterowane zdarzeniami**.
* **Programowanie współbieżne**.

Czyli łącznie osiem paradygmatów.

### Wikipedia
Wikipedia nie jest może najpewniejszym źródłem informacji,
ale na [polskojęzycznej](<https://pl.wikipedia.org/wiki/Kategoria:Paradygmaty_programowania>) wikipedii paradygmatów jest więcej.
A na [anglojęzycznej](<https://en.wikipedia.org/wiki/Programming_paradigm>) - jeszcze więcej.

## Rozwiązywać te same problemy na różne sposoby

Kolejny język programowania powinien być na tyle inny by pozwalać programować w sposób różny od tych sposobów które już znamy.
Jednocześnie powinien być na tyle podobny by móc w nim rozwiązywać tą samą klasę problemów.
Np. jeśli piszemy korpo aplikację zawsze w Javie/C# to możemy spróbować napisać ją w tym drugim języku programowania.
Ale jest to przykład zły.
I to z dwóch powodów:
* Bo korpo aplikacje są duże i sami takiej nie napiszemy.
* Java i C# są chyba najbardziej podobnymi do siebie językami programowania, więc za dużo się nie nauczymy.

Co prawda będzie to przydatna umiejętność do wpisania w CV,
ale nie pogłębi naszego podejścia do *różnych sposobów* pisania aplikacji.

Trochę prościej jest jeśli pracujemy w software house robiącym strony internetowe w [językach skryptowych](/jezyk-skryptowy).
Po pierwsze strony internetowe są zwykle mniejsze niż korpo aplikacja,
więc jest szansa wykonania zadania samodzielnie w czasie wolnym.
Po drugie języki skryptowe jak **[Perl]**, **[Python]** i **[Ruby]** różnią się od siebie bardziej niż C# od Javy.

Jednak i tutaj stracimy pewnie dużo czasu na pisanie plików html i css.
Lepszym zadaniem jest stworzenie jakiegoś mikroserwisu (ang. microservice).
Ponieważ większość aplikacji jest obecnie przepisywana na mikroserwisy to w uproszczeniu można uznać,
że jeśli w danym języku programowania można napisać mikroserwis to można używać go na produkcji.

Ale tu znów będziemy kopać się z nieznanym sobie frameworkiem do RESTów w nieznanym sobie języku programowania.
Możliwe także, 
że z nieznaną sobie bazą danych.
Potrzebne jest lepsze zadanie.
Nie używające http, kolejek wiadomości i baz danych,
ale pozwalające wykorzystać jak najwięcej funkcjonalności (ang. *features*) poznawanego języka programowania.

Nawet jeśli znajdziemy takie zadanie, tj. używające dużo funkcjonalności języka bez nauki frameworków 
to poświęcimy dużo czasu na przebijanie się przez instalowanie tego języka, 
zwłaszcza jeśli będzie to [język natywny](/jezyk-natywny), 
oraz pisanie prostych `"Hello world!"` w tym języku.
Oczywiście jeśli mamy dużo czasu nie jest to problemem.
Jeśli jednak mamy mało czasu to pewnie chcielibyśmy od razu siąść i kodować.
Pewnym rozwiązaniem mogą być strony try-online jak:
* <https://try.kotlinlang.org/>
* <https://scastie.scala-lang.org/>
* <https://tryhaskell.org/>
* <https://clojurescript.io/>

Innym rozwiązaniem jest nauka nowych języków na platformę którą już mamy zainstalowaną.
Czyli:
* jeśli programujemy w C# na .NET możemy zacząć używać **[F#]**;
* jeśli programujemy w Javie na **[JVM]** możemy zacząć używać jednego z języków **[Scala]**, **[Kotlin]** lub **[Clojure]**;
* jeśli programujemy w **[JS]**/**[CS]**/**[LS]**/**[TS]** na **[node.js]**
możemy zacząć używać jednego z funkcyjnych transpilowanych do **[JS]** jak **[Elm]**, **[PureScript]** lub **[ReasonML]**. 

## Podsumowanie

Jednak idealniebyłoby, gdyby istniał jeden język programowania,
który zawierałby wszystkie paradygmaty programowania.
Na nasze szczęście język taki istnieje.
Tylko nie da się go nauczyć w jeden rok.

Ciąg dalszy nastpił jako artykuł [Kolejny język programowania - język wszystkomający](/jezyk-wszystkomajacy)

[Clojure]:       /posts-by-langs/clojure
[CS]:            /posts-by-langs/coffeescript
[Common Lisp]:   /posts-by-langs/common-lisp
[Elm]:           /posts-by-langs/elm
[F#]:            /posts-by-langs/fsharp
[Go]:            /posts-by-langs/go
[Haskell]:       /posts-by-langs/haskell 
[Java]:          /posts-by-langs/java
[JS]:            /posts-by-langs/javascript
[Kotlin]:        /posts-by-langs/kotlin
[LISP]:          /posts-by-langs/lisp
[LS]:            /posts-by-langs/livescript
[Meta Language]: /posts-by-langs/meta-language
[OCaml]:         /posts-by-langs/ocaml
[Perl]:          /posts-by-langs/perl
[PureScript]:    /posts-by-langs/purescript
[Python]:        /posts-by-langs/python
[Racket]:        /posts-by-langs/racket
[ReasonML]:      /posts-by-langs/reasonml
[Ruby]:          /posts-by-langs/ruby
[Rust]:          /posts-by-langs/rust
[Scheme]:        /posts-by-langs/scheme
[Smalltalk]:     /posts-by-langs/smalltalk
[Scala]:         /posts-by-langs/scala
[TCL]:           /posts-by-langs/tcl
[TS]:            /posts-by-langs/typescript

[JVM]:             /posts-by-tools/jvm
[node.js]:         /posts-by-tools/node-js

[rachunek lambda]: /posts-by-tags/lambda-calculus

[Czysta architektura]:        /read-books/czysta-architektura
[Czysty kod]:                 /read-books/czysty-kod
[Mistrz czystego kodu]:       /read-books/mistrz-czystego-kodu
[Pragmatyczny programista]:   /read-books/pragmatyczny-programista
[Scala. Nauka programowania]: /read-books/scala-nauka-programowania

[Squeak]: https://pl.wikipedia.org/wiki/Squeak
[Tiobe]:  https://www.tiobe.com/tiobe-index/
