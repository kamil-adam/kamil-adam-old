---
title:    'Który język programowania wybrać na początek - język korporacyjny'
author:   TheKamilAdam
category: programming
langs:    java scala kotlin clojure frege eta go python ruby lisp haskell ocaml fsharp
tools:    jvm
redirect_from:
  - jezyk-korporacyjny
  - programming/jezyk-korporacyjny
  - onions/jezyk-korporacyjny
  - onions/2019/06/19/jezyk-korporacyjny
  - onions/2019/06/19/ktory-jezyk-programowania-wybrac-jezyk-korporacyjny.html
---

Wiele osób pyta się,
**który język programowania wybrać na początek** jako pierwszy język do nauki.
Wiele jednak zależy od tego do czego chcemy użyć tego języka programowania.
Dlatego wybrałem zwycięzców w czterech kategoriach:
1. [dynamicznie typowany język skryptowy ogólnego przeznaczenia](/jezyk-skryptowy)
2. statycznie typowany język korporacyjny używany do pisania długowiecznych aplikacji klasy *enterprise*
3. [fullstack język, który można używać do pisania frontendu i backendu](/jezyk-fullstackowy)
4. [szybki język natywny działający bez maszyny wirtualnej i interpretera](/jezyk-natywny)

W tym artykule skupię się na zwycięzcy drugiej kategorii,
czyli statycznie typowanym języku korporacyjnym używanym do pisania długowiecznych aplikacji klasy enterprise.
Wbrew nazwie języki z tej kategorii są używane nie tylko w korporacjach,
ale często są przez korpo preferowane.

**Ważna uwaga!**
Artykuł nie jest sponsorowany przez Google,
mimo że każdy ze zwycięskich języków jest używany przez Google.
Nie jest też sponsorowany przez JetBrains.
Po prostu uważam,
że JetBrains tworzy najlepsze IDE.
Jest to tylko mój mały subiektywny ranking języków programowania na rok 2019.

## Język korporacyjny - definicja

Główne cechy dobrego języka korporacyjnego to:
1. statyczne typowanie - aplikacje będą pisane w nim latami,
a utrzymywane dziesiątki lat,
dlatego potrzebne jest by kompilator był jak najbardziej radykalny
2. bycie daleko od sprzętu - programista powinien jak najmniej zajmować się niskopoziomowymi technikaliami,
a jak najwięcej uwagi poświęcać na pisanie wysokopoziomowej logiki biznesowek
3. prosta składnia - bo programistów wciąż brakuje i trzeba cały czas przyuczać nowych
4. wydajność/skalowalność - często aplikacje klasy enterprise mają dużo klientów naraz,
więc muszą być wydajne i skalowalne

Co ciekawe 1. kłóci się z 3. a 2. kłóci się z 4. 
Widać więc, że potrzebny jest *zgniły kompromis*.

Kiedyś były dwa główne języki korporacyjne:
* prosty język Cobol używany dla programów będących daleko od sprzętu
* skomplikowany język C++ używany dla programów będących blisko sprzętu

## Język korporacyjny - zwycięzca

Była potrzeba na stworzenie języka będącego pomiędzy językami Cobol i C++.
Tym językiem jest **[Java]**.

Główne zalety pozajęzykowe Javy to:
* Najbardziej popularny język programowania według [Tiobe]
* Język roku 2005 i 2015 według [Tiobe]
* Darmowe IDE *[IntelliJ IDEA]* od JetBrains
* Główny język używany w Google do pisania aplikacji,
a przynajmniej do niedawna tak było

Pradopodobnie największą wadą Javy jest to, 
że jej rozwój mocno zamarł po wydaniu Javy 6 przez co inne języki mocno ją przegoniły.
Co prawda ostatnio nowe wersje wydawane są częściej,
jednak dodają one mało nowych funkcjonalności.
Z tego powodu składnia Javy jest niesamowicie rozwlekłą i bywa nazywana barokową, 
tzn. trzeba napisać dużo kodu by osiągnąć ten sam efekt co w nowszych językach programowania.

## Korpo platforma - JVM

Java to nie tylko język,
ale także platforma **[JVM]** (ang. *Java Virtual Machine*) odcinająca język od sprzątu.
Java jest kompilowana do *[kodu bajtowego Javy](https://pl.wikipedia.org/wiki/Kod_bajtowy_Javy)*
(and. *Java bytecode*),
który jest następnie wykonywany przez JVM, 
a dokładniej przez **JRE**  (ang. *Java Runtime Environment*).
Do kodu bajtowego Javy są też kompilowane inne języki programowania,
które w łatwy i przyjazny sposób można integrować z Javą.
Języki te posiadają o wiele zwięźlejszą składnie i można je podzielić z grubsza na trzy kategorie: 
* Nowe języki programowania:
  * **[Scala]** - wielki worek na *feature'y*,
dzięki czemu w Scali da się zaimplementować wszystkie paradygmaty programowania
  * **[Kotlin]** - Scala-- plus pare innych *feature'ów*, 
zdrowy kompromis między *wszystkomaniem* Scali i prostotą Javy,
ale powoli zmierza do języka w którym także można używać wszystkich paradygmatów programowania
  * **Groovy** - skryptowy język oparty składniowo o Javę.
W skrócie *Java z opcjonalnymi typami*, 
co jest oczywiście **wadą**
* Dialekty istniejących języków (niekompatybilne na poziomie kodu źródłowego):
  * **[Clojure]** - dialekt języka **[Lisp]**, posiada opcjonalny system @TypedClojure
  * **[Frege]** - dialekt języka **[Haskell]**, kompilowany do klas Javy, posiadający imperatywne wejście-wyjście
* Nowe implementacje istniejących języków (kompatybilne na poziomie kodu źródłowego):
  * **Jython** -> **[Python]**
  * **JRuby** -> **[Ruby]**
  * **[Eta]** -> **[Haskell]**

## Główna konkurencja - język C# i platforma .Net

Powiedzieć o Javie, a nie powiedzieć o C# to jak powiedzieć o Wizygotach, a nie wspomnieć o Ostrogotach.
Język C# jest odpowiedzią Micro$oftu na Javę.
Ponieważ te języki programowania są bardzo podobne do siebie,
to od powstania C# istnieje niekończąca się wojna ideologiczna,
który język programowania jest lepszy do pisania aplikacji korporacyjnych.
W sporze tym przypadkowo wygrała Java,
ponieważ jest darmowa i już prawie całkiem Open Source.
Jednocześnie Java posiada bardziej rozwlekłą składnie i mniejszą bibliotekę standardową.

C# identycznie jak Java jest kompilowany do kodu bajtowego, 
który nazywany jest 
[Wspólnym Językiem Pośredni](https://en.wikipedia.org/wiki/Common_Intermediate_Language)
(ang. *Common Intermediate Language*, **CLI**).
CLI następnie jest wykonywany przez maszynę wirtualną nazywaną platformą .NET.

Podobnie jak dla kodu bajtowego Javy i JVM, 
tak dla CLI i platformy .Net także istnieją inne języki programowania,
które można z grubsza podzielić na dwie kategorie:
* Nowe języki programowania inspirowane istniejącymi już językami:
  * **[C++/CLI]** - *ulepszona* wersja C++
  * **[VB.NET]** -  **[Visual Basic]** dostosowany do platformy .Net
  * **[F#]** - dialekt języka **[OCaml]**
* Nowe implementacje istniejących języków (kompatybilne na poziomie kodu źródłowego):
  * **IronPython** -> **[Python]**
  * **IronRuby** -> **[Ruby]**

## Podsumowanie

Czy warto uczyć się języków Java i C#?
Biorąc pod uwagę,
że pojawiają się nowe języki z lepszą składnią (Scala, Kotlin, F#, Go)?

Według mnie warto. 
Dziesięcioletnie aplikacje napisane w Javie i C# nie znikną z dnia na dzień.
Dodatkowo menedżerowie nie lubią często eksperymentować,
dlatego nowe aplikacje także powstają w Javie i C#.
Poza tym trudno pracować w nowych językach jak Scala, Kotlin czy F# nie znając starych języków jak Javy czy C#,
ponieważ nowe języki używają bibliotek napisanych w swoich starszych kuzynach.

[Clojure]: /posts-by-langs/clojure
[Eta]:     /posts-by-langs/eta
[Frege]:   /posts-by-langs/frege
[F#]:      /posts-by-langs/fsharp
[Go]:      /posts-by-langs/go
[Haskell]: /posts-by-langs/haskell
[Java]:    /posts-by-langs/java
[Kotlin]:  /posts-by-langs/kotlin
[Lisp]:    /posts-by-langs/lisp
[OCaml]:   /posts-by-langs/ocaml
[Python]:  /posts-by-langs/python
[Ruby]:    /posts-by-langs/ruby
[Scala]:   /posts-by-langs/scala

[JVM]: /posts-by-tools/jvm

[C++/CLI]: https://pl.wikipedia.org/wiki/C%2B%2B/CLI
[VB.NET]: https://pl.wikipedia.org/wiki/Visual_Basic_.NET
[Visual Basic]: https://pl.wikipedia.org/wiki/Visual_Basic
[Tiobe]: https://www.tiobe.com/tiobe-index/
[IntelliJ IDEA]: https://www.jetbrains.com/idea/download/
