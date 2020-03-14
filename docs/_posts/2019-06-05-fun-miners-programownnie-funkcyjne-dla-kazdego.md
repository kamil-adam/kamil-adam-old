---
title:    'Functional Miners - Programowanie Funkcyjne dla Każdego'
author:   TheKamilAdam
category: relationships
tags:     compiler interpreter lambda-calculus monad monoid transpiler
labels:   brainfuck subleq
langs:    elixir clojure scala java haskell
redirect_from:
  - programownnie-funkcyjne-dla-kazdego
  - relationships/programownnie-funkcyjne-dla-kazdego
  - fun-miners-programownnie-funkcyjne-dla-kazdego
  - relationships/fun-miners-programownnie-funkcyjne-dla-kazdego
  - relationships/2019/06/05/fun-miners-programownnie-funkcyjne-dla-kazdego.html
---

2019-05-21 odbyło się spotkanie *Functional Miners* (@fun_miners)
w *HackerSpace Silesia* (@hs_silesia) 
o tematyce *Programowanie Funkcyjne dla Każdego*.
Wydarzyły się dwie prezentacje:
* Wojciech Gawroński - Functional Programming in the Wild
* Andrzej Spiess - From \x.x to Facebook - Introduction to Lambda Calculus

## Wojciech Gawroński - Functional Programming in the Wild

Wojtek (@afronski) przygotował [prezentację](<https://youtu.be/mn4Dg1iYfPg>) 
próbującą przekonać,
że deklaratywne programowanie czysto funkcyjne jest lepsze od imperatywnego.
Było to o tyle łatwe,
że na spotkanie przyszli tylko fani programowania funkcyjnego. 

Dla mnie, 
głównym wnioskiem z prezentacji jest to,
że nie należy w prezentacji umieszczać żadnych skomplikowanych definicji matematycznych, 
np. **[monad]**.
Zwłaszcza jeśli są to pierwsze dwa slajdy.
Nawet jeśli jest to tylko żart.

Pozwólcie, że powtórzę: **nie należy ludziom pokazywać matematycznej definicji monady**, bo uciekną.

W prezentacji Wojtek stara się odpowiedzieć na pytania:
* Dlaczego uczyć się funkcyjnych języków programowania?
  * Bo jest totalnie inne od programowania imperatywnego, więc ćwiczy nasz mózg
  * Bo jest przejrzystrze, więc trudniej popełnić błąd
* Z czego składa się funkcyjny język programowania?
  * *Patern Maching* - dopasowywanie do wzorca
  * *Macros* - prawdziwe makra, 
  takie jak są w językach **[Elixir]**, **[Clojure]** lub **[Scala]** 
  * *Correctness* - *poprawność*, święty graal matematyków-programistów,
  która miała pozwolić na automatyczne stwierdzać poprawność programu
    * *Immutability* - *niezmienność*, zmienne są stałymi,
    referencje są finalne,
    wartości są niemodyfikowalne
    * *Referential Transparency* - *reguła podstawienia*, 
    wywołanie funkcji zawsze można zamienić na wartość przez nią zwracaną,
    nie używa się efektów ubocznych 
    * *Advanced Type Systems* - *zaawansowane systemy typów*,
    o wiele bardziej rozbudowany parametryczny polimorfizm
* Jak uczyć się funkcyjnego języka programowania?
  * Warto mieć jeden mały programik,
  trochę większy niż *Hello Wolrd* i implementować go w wielu językach. 
   Np **[interpreter]**, **[transpilator]** lub **[kompilator]** ezoterycznego języka Brainfuck

Oprócz tego Wojtek rozprawiał się z mitami na temat programowania funkcyjnego,
jak np. to że zasady SOLID stosują się także do funkcji i programowania funkcyjnego i deklaratywnego.

## Andrzej Spiess - From \x.x to Facebook - Introduction to Lambda Calculus

Andrzej (@ninjazoete) przygotował [prezentację](<https://youtu.be/nZuOyQalVW4>)
będącą bardzo teoretycznym i historycznym wprowadzeniem do [rachunku lambda].

Najważniesze punkty, które zrozumiałem to:
* Problemowi stopu z Maszyny Turinga w **[rachunku lambda]** odpowiada problem nieredukowalnych lambd do postaci normalnej.
* **[Haskell]** jest kompilowany do HSC CORE, 
który składa się 26 rodzajów konstruktorów (rachunek lambda + systemu F + kowersja + parametryczny polimorfizm) 
 * W typowanych lambdach problem stopu nie istnieje, 
ale nie da się wyrazić rekurencji,
więc dodaje się nowe operatory i traci się kompletność w sensie turinga.

Jeśli ktoś chciałby zobaczyć rachunek lambda w bardziej przystępnej formie, 
czyli interaktywnie w języku **[Java]** to polecam prezentacje Jarosława Ratajskiego (@jarek000000):
* W warszawie - *[WJUG #183 - Lambda Core: Hardcore - Jarosław Ratajski](<https://youtu.be/3GJpyHwzuh0>)* 
* W Łodzi - *[Lambda Core - Hardcore - Jarek Ratajski](<https://youtu.be/TYAjT3GQHP4>)*

Najważniejsza rzecz z tego wykładu to to, że:
> Wszystko to co robicie da się zrobić czysto funkcyjnie, 
to jest udowodnione przez [Turinga](<https://pl.wikipedia.org/wiki/Alan_Turing>)

Repozytorium z kodem do analizy lambd - *[Lambda analysis package](<https://github.com/jarekratajski/badlam>)*.

## Podsumowanie

Z niecierpliwością czekam na kolejne wykłady w ramach *Functional Miners* (@fun_miners)

[Clojure]:         /posts-by-langs/clojure
[Elixir]:          /posts-by-langs/elixir
[Haskell]:         /posts-by-langs/haskell
[Java]:            /posts-by-langs/java
[Scala]:           /posts-by-langs/scala

[kompilator]:      /posts-by-tags/compiler
[interpreter]:     /posts-by-tags/interpreter
[rachunku lambda]: /posts-by-tags/lambda-calculus
[monad]:           /posts-by-tags/monad
[transpilator]:    /posts-by-tags/transpiler

