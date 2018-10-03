---
layout:   post
title:    "Przenośna Scala"
author:   "writeonly"
category: jekyll
tag:      jekyll jekyllcodex
comments: true
toc:      true
---

## JVM Resentment

Znajomy zajarał się językiem Rust.
Opowiadami mi jaki to wspaniały język i pokazuje przykłady kodu.
RustLang na pierwszy rzut oka wygląda jak skrzyżowanie C i Haskella plus kanały jak w GoLang.
Czyni go to pretendentem do bycia najbardziej skomplikowanym językiem programowania na świecie.
Pretendentem, bo istnieje wśród programistów JVM opinia, że najbardziej skomlikowanym językiem na świecie jest Scala.
Scala jest skrzyżowaniem Javy i Haskella plus aktory z Erlanga.

Przykłady kodu coś mi przypominają.
Wyglądają prawie jak w Scali tylko trochę mniej obiektowe, więc pytam:
- Dlaczego nie Scala? - pytam -
Jest to w tej chwili jedyny funkcyjny język programowania, który odniósł sukces komercyjny.
Nie licząc niszowego Erlanga - dodaję.
- Bo ja nie lubię JVM - odpowiada. - Za dużo musiałem robić w apletach.

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
JavaScript jest platformą docelową dla każdego,
kto chce uruchamiać cokolwiek na stronie internetowej.
Dlatego jeśliby posiadać kompilator Scali do JavaScriptu
to w łatwy sposób można by z każdego programisty Scali stworzyć legendarnego Full-Stack Developera.
Szczęśliwie taki kompilator istnieje i nazywa się [Scala.js](<https://www.scala-js.org/>).
Istnieje nawet [Akka.js](<http://akka-js.org/>), framework aktorów.

Niestety Scala.js i Akka.js posiadają wszystkie wady Node.js to znaczy jednowątkowość,
ale do front-endu wydają się idealne.

### Native
Największą zaletą języków RustLang i GoLang jest to,
że są to języki kompilowane do postaci natywnej,
a programy w nich pisane mogą być dostarczane do klienta pod postacią jednego pliku.

To samo ze Scalą robi kompilator [ScalaNative](<http://www.scala-native.org/en/v0.3.8/>).
Niestety dalej jest w wersji eksperymentalnej i nie posiada np. wielowątkowości.
Co czyni go na razie tylko zabawką dla nerdów i np. ... DevOpsów i QA.
Bo o ile jednowątkowy program na produkcji zwykle nie ma sensu,
to ScalaNative może zastąpić inne języki używane do wdrażania aplikacji i testowania.
Zwłaszcza, że zwykle i tak są to zwykle języki jednowątkowe.

## Portable Scala - wszystkie części mocy

W łatwy sposób można stworzyć projekt, który będzie kompilowany na wszystkie trzy platformy,
to znaczy JS, JVM i Native.

Na początek instalujemy zależności dla
[Scala Native](<http://www.scala-native.org/en/v0.3.8/user/setup.html#installing-clang-and-runtime-dependencies>):

```bash
sudo apt install clang libunwind-dev
sudo apt install libgc-dev libre2-dev
```

Następnie pobieramy przykładową aplikację z [portable-scala](<https://github.com/portable-scala/sbt-crossproject.g8>):
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

Stworzyłem projekt na portalu [GitHub](<https://github.com/writeonly/resentiment>),
gdzie będę starał się rozwijać aplikację kompilowaną na wszystkie trzy platformy.
Na razie pod tagiem [portable-scala](<https://github.com/writeonly/resentiment/tree/portable-scala>)
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
