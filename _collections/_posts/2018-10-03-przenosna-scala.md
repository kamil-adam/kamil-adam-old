---
title:    "Przenośna Scala"
author:   TheKamilAdam
category: scala-native
tags:     compiler native nojvm transpiler
langs:    crystal erlang haskell go javascript pony rust scala
tools:    clang jvm llvm node-js sbt scala-jvm scala-js scala-native
libs:     akka
redirect_from:
  - przenosna-scala
  - scala-native/przenosna-scala
  - resentiment/przenosna-scala
  - resentiment/2018/10/03/przenosna-scala.html
---

Znajomy zajarał się językiem **[Rust]**.
Opowiada mi jaki to wspaniały język i pokazuje przykłady kodu.
**[Rust]** na pierwszy rzut oka wygląda jak skrzyżowanie **[C]** i języka **[Haskell]** plus kanały jak w języka **[Go]**.
Czyni go to pretendentem do bycia najbardziej skomplikowanym językiem programowania na świecie.
Pretendentem, bo istnieje wśród programistów JVM opinia, że najbardziej skomlikowanym językiem na świecie jest **[Scala]**.
**[Scala]** jest skrzyżowaniem Javy i Haskella plus aktory z języka **[Erlang]**.

Przykłady kodu coś mi przypominają.
Wyglądają prawie jak w Scali tylko trochę mniej obiektowe, więc pytam:
- Dlaczego nie Scala? Jest to w tej chwili jedyny funkcyjny język programowania, który odniósł sukces komercyjny.
Nie licząc niszowego Erlanga - dodaję.
- Bo ja nie lubię **[JVM]** - odpowiada. - Za dużo musiałem robić w apletach.

Po tej rozmowie zacząłem się zastanawiać czy istnieje możliwość używania Scali poza JVM.
Czy Scala jest językiem przenaszalnym na inne platformy?

## Portable Scala - dwa razy tak i jeden raz nie

### .Net Framework
Podobno największą konkurencją dla JVM jest .Net.

Z kilka lat temu, jak o Scali zaczynano dopiero mówić, podobno ruszyły prace nad przeniesieniem Scali na .Net.
Podobno nawet M$ dofinansował ten projekt.

Jednak do dziś nie ma języka Scala.NET ani S#.
Podobno różnice między JVM a .Net są zbyt duże,
żeby w sensowny sposób udało się przenieść statycznie typowany język programowania
z jednego środowiska uruchomieniowego na drugie.

Podobno istniał jeden statycznie typowany język programowania,
który działał na obu platformach.
Jednak było to zalane taką ilością warstw abstrakcyjnych,
że czyniło go to bezużytecznym.

### JavaScript
**[JavaScript]** jest platformą docelową dla każdego,
kto chce uruchamiać cokolwiek na stronie internetowej.
Dlatego jeśliby posiadać **[transpilator]** Scali do JavaScriptu
to w łatwy sposób można by z każdego programisty Scali stworzyć legendarnego Full-Stack Developera.
Szczęśliwie taki **[transpilator]** istnieje i nazywa się **[Scala.js]**.
Istnieje nawet [Akka.js], framework aktorów.

Niestety **[Scala.js]** i Akka.js posiadają wszystkie wady **[Node.js]** to znaczy jednowątkowość,
ale do front-endu wydają się idealne.

### Native
Największą zaletą języków
**[Rust]**, **[Pony]**, **[Crystal]** czy **[Go]**,
jest to,
że są to języki kompilowane do postaci natywnej,
a programy w nich pisane mogą być dostarczane do klienta pod postacią jednego pliku.

To samo ze Scalą robi **[kompilator]** **[Scala Native]** oparty na **[LLVM]**.
Niestety dalej jest w wersji eksperymentalnej i nie posiada np. wielowątkowości.
Co czyni go na razie tylko zabawką dla nerdów i np. ... DevOpsów oraz QA.
Bo o ile jednowątkowy program na produkcji zwykle nie ma sensu,
to ScalaNative może zastąpić inne języki używane do wdrażania aplikacji i testowania.
Zwłaszcza, że zwykle i tak są to języki jednowątkowe.

## Portable Scala - wszystkie części mocy

W łatwy sposób można stworzyć projekt, który będzie kompilowany na wszystkie trzy platformy,
to znaczy JS, JVM i Native.

Na początek instalujemy [zależności] dla **[Scala Native]**:

```bash
sudo apt install clang libunwind-dev
sudo apt install libgc-dev libre2-dev
```

Następnie pobieramy przykładową [aplikację skośną] z portable-scala:
```bash
sbt new portable-scala/sbt-crossproject.g8
```

Kompilujemy:
```bash
sbt clean compile test
```

I uruchamiamy:
```bash
sbt barJS/run barJVM/run barNative/run
```

## Mój Resentiment

Stworzyłem projekt na portalu [GitHub],
gdzie będę starał się rozwijać aplikację kompilowaną na wszystkie trzy platformy.
Na razie pod tagiem [portable-scala]
znajduje się wersja z podniesionymi zależnościami i ze zmienioną konfiguracją projektu.

Pobranie projektu:
```
git clone https://github.com/writeonly/resentiment.git
```

Kompilacja:
```bash
sbt clean compile test
```

I uruchomienie:
```bash
sbt re/run reJS/run reJVM/run
```

[Crystal]:      /langs/crystal
[Erlang]:       /langs/erlang
[Go]:           /langs/go
[Haskell]:      /langs/haskell
[JavaScript]:   /langs/javascript
[Pony]:         /langs/pony
[Rust]:         /langs/rust
[Scala]:        /langs/scala

[C]:            /tools/clang
[JVM]:          /tools/jvm
[LLVM]:         /tools/llvm
[Node.js]:      /tools/node-js
[Scala Native]: /tools/scala-native
[Scala.js]:     /tools/scala-js

[Akka.js]:      /libs/akka-js

[Transpilator]: /tags/transpiler
[Kompilator]:   /tags/compiler

[zależności]: http://www.scala-native.org/en/v0.3.8/user/setup.html#installing-clang-and-runtime-dependencies
[aplikację skośną]: https://github.com/portable-scala/sbt-crossproject.g8

[GitHub]: https://github.com/writeonly/resentiment
[portable-scala]: https://github.com/writeonly/resentiment/tree/portable-scala
