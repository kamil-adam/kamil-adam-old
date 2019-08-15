---
title:    'Który język programowania wybrać na początek - język natywny'
author:   TheKamilAdam
category: onions
tags:     node-js clang native llvm monad bytecode
labels:
langs:    rust java julia ocaml common-lisp go typescript dart haskell javascript scheme erlang lua pony crystal scala fsharp racket ml
redirect_from:
  - jezyk-natywny
  - onions/jezyk-natywny
  - onions/2019/07/03/jezyk-natywny.html
  - onions/2019/07/03/ktory-jezyk-programowania-wybrac-jezyk-natywny.html
---

Wiele osób pyta się,
**który język programowania wybrać na początek** jako pierwszy język do nauki.
Wiele jednak zależy od tego do czego chcemy użyć tego języka programowania.
Dlatego wybrałem zwycięzców w czterech kategoriach:
1. [dynamicznie typowany język skryptowy ogólnego przeznaczenia](/jezyk-skryptowy)
2. [statycznie typowany język korporacyjny używany do pisania długowiecznych aplikacji klasy *enterprise*](/jezyk-korporacyjny)
3. [język *fullstackowy*, który można używać do pisania frontendu i backendu](/jezyk-fullstackowy)
4. szybki język natywny działający bez maszyny wirtualnej i interpretera

W tym artykule skupię się na zwycięzcy czwartej kategorii,
czyli języku natywnym.

**Ważna uwaga!**
Artykuł nie jest sponsorowany przez Google,
mimo że każdy ze zwycięskich języków jest używany przez Google.
Nie jest też sponsorowany przez JetBrains.
Po prostu uważam,
że JetBrains tworzy najlepsze IDE.

## Język natywny - definicja
Roboczo przyjmiemy następujące definicje:
1. Język natywny jest to język, który pozwala pisać aplikacje natywne.
2. Aplikacja natywna jest to aplikacja, która jest skompilowana do kodu natywnego.
3. Kod natywny jest to najbliższa sprzętowo implementacja kodu jaka jest możliwa.
Czyli:
   * Dla Androida będzie to **[kod bajtowy]** Javy
   * Dla przeglądarki będzie to **[JavaScript]**
   * Dla Maszyny Pascala był to PCode
   * Gdyby Micro$oft skończył prace nad systemem operacyjnym Midori byłby to kod bajtowy CIL
   * W pozostałych wypadkach będzie to najprawodpodobniej kod maszynowy

## Zalety języków natywnych
Języki natywne posiadają wiele zalet. 
Dla mnie najważniejszymi są:
* możliwość spakowania programu/aplikacji do jednego pliku wykonywalnego
razem ze wszystkimi bibliotekami trzecimi i plikami konfiguracyjnymi
* mała zajętość zasobów, głównie pamięci RAM
* szybkość działania

###  Jedna paczka ze wszystkim jako plik wykonywalny
Jeśli piszemy aplikację desktopową prawdopodobnie chcielibyśmy dostarczyć klientowi jeden plik wykonywalny.
Tak żeby nie musiał instalować żadnych maszyn wirtualnych, interpreterów i dodatkowych bibliotek współdzielonych.
Tak właśnie jest w przypadku języków kompilowanych do kodu natywnego.

Jeśli piszemy w języku skryptowym czasem można oszukać.
Niektóre języki skryptowe pozwalają spakować skrypty i interpreter w jeden wykonywalny plik.
Przykładem może tu być [Electron], 
który posłużył do napisania edytorów [Atom] oraz [VSC].

Gorzej jest w przypadku języków korporacyjnych kompilowanych do kodu bajtowego.
Ich maszyny wirtualne, jak JVM, są często zbyt duże, by móc je dołączać do każdego programu z osobna.
Prawdziwy problem zaczyna się,
gdy różne programy wymagają różnych wersji maszyny wirtualych np. JRE 6 i JRE 11.   

### Niska zajętość RAMu
[Electron] jest wspaniałym narzędziem,
które pozwoliło programistom frontendu pisać aplikacje desktopowe.
Ale jest to okupione dużym kosztem.
Zwykle koszt ten przelicza się na duże zużycie pamięci RAM.
Koszt ten wynika z tego,
że każda aplikacja oparta na Electronie musi uruchomić zawarty w sobie
interpreter JavaScriptu V8 oraz silnik do renderowania HTMLu i CSSów.

W przypadku języków natywnych możemy użyć bibliotek graficznych wbudowanych w system operacyjny.
Lub przenośnych bibliotek graficznych jak GTK (Gnome) oraz Qt (KDE).
Nie musimy uruchamiać także zewnętrznych interpreterów, maszyn wirtualnych i kompilatorów JIT.
 
### Szybkość działania
Szybkość poszczególnych języków programowania jest tematem drażliwym.
Często testy porównawcze (ang. *benchmarks*) szybkości działania poszczególnych języków programowania 
są pisane w taki sposób,
żeby potwierdziły tezę piszącego.
Potem można spotkać raporty z których wynika,
że [JavaScript jest szybszy od C++](<https://stackoverflow.com/questions/17036059/why-does-javascript-appear-to-be-4-times-faster-than-c>).

Drugim problemem jest to, że wydajność języków zmienia się w czasie.
Np. początkowo kod bajtowy Javy był tylko interpretowany.
Obecnie jest kompilowany podczas uruchomienia  (ang. *just-in-time compilation*, **JIT**) 

Przydałby się niezależny zestaw testów nie sponsorowany przez żaden z języków. 
Szczęśliwie taki zestaw istnieje i nazywa się [Benchmarks Game].

Na podstawie tego zestawu testów możemy podzielić języki programowania na kilka grup pod względem szybkości działania:
1. Top - trzy prawie idealnie tak samo szybkie języki programowania:
   * C gcc
   * C++ g++
   * **[Rust]** - kompilowany do kodu natywnego język z systemem typów inspirowanych językiem **[Haskell]**
2. Około dwa razy wolniejsze niż C:
   * Ada 2012 Gnat - kompilowany do kodu natywnego
   * Fortran Intel - kompilowany do kodu natywnego
   * Swift - kompilowany do kodu natywnego
   * C# .NET Core - kompilowany do kodu bajtowego CIL
   * **[Java]** - kompilowany do kodu bajtowego maszyny wirtualnej Javy
   * FreePascal - kompilowany do kodu natywnego
3. Około trzy razy wolniejsze niż C:
   * **[Julia]** - kompilowany do kodu natywnego
   * Chapel
   * **[F#]**.NET Core - kompilowany do kodu bajtowego CIL
   * **[OCaml]** - obiektowa werjsa **[Meta Language]** kompilowany do kodu natywnego
   * LispSBCL - implementacja **[Common Lisp]**
   * **[Go]** - kompilowany do kodu natywnego
4. Trzy do dziesięciu razy wolniejsze niż C:
   * **[TypeScript]** - kompilowany do JS i uruchamiany na Node.js
   * **[Dart]** - prawdopodobnie kompilowany do JS i uruchamiany na Node.js 
   * **[Haskell]** GHC - prawdopodobnie kompilowany do C
   * **[Node.js]** - prawdopodobnie chodzi o **[JavaScript]**
   * **[Racket]** - dialekt **[Scheme]**
5. Ponad dziesięć razy wolniejsze niż C:
   * reszta [języków skryptowych](/jezyk-skryptowy) w tym **[Erlang]** i **[Lua]**

Moje największe zaskoczenia,
gdy analizowałem wykresy:
1. Do niedawna nikomu nieznany **[Rust]** znalazł się w pierwszej trójce najszybszych jezyków programowania.
2. Kompilowany do kodu bajtowego **[F#]** wyprzedził kompilowany do kodu natywnego **[OCaml]**.
3. Dynamicznie typowany **[Common Lisp]** wyprzedził statycznie typowany **[Go]**.
4. **[TypeScript]** wyprzedził język **[Haskell]** - nie mam pojęcia jak oni to zrobili.
Widocznie leniwość i **[monady]** są drogie.
5. **[JavaScript]** (i **[TypeScript]**) niesamowicie wyprzedzają pozostałe języki skryptowe.
Nawet język **[Erlang]**, w którym, z powodu niezmienności, powinny być możliwe bardzo agresywne optymalizacje.

Oczywiście z powodu istnienia kompilatora  **[LLVM]** kolejność,
jak i sama lista,
może w najbliższej przyszłości się zmienić.

## Język natywny - wady
Przez wiele lat jako najbardziej popularny natywny język programowania królował C++.
Dlatego wady języków natywnych są to głównie wady języka C++.
A lista rzeczy które można zarzucić C++ jest długa:
* trudna składnia i bycie zbyt blisko sprzętu
* długi czas kompilacji
* duża ilość narzędzi potrzebnych do  poprawnej kompilacji (kompilator/transpilator, konsolidator/linker, preprocesor/makroprocesor)
* przestarzałe narzędzia
* archaiczne podejście do zarządzania zależnościami, czyli jego brak
* często biblioteki wymagane do kompilacji instaluje się wprost do systemu operacyjnego,
dlatego istnieje żart że linux nie jest systemem operacyjnym tylko środowiskiem do programowania w C/C++

## Język natywny - zwycięzcy ...
Język C++ z pozycji lidera próbowały wygryźć inne języki jak D oraz **[Vala]**
(język transpilowany do C i oparty na bibliotece [GObject] ze składnią wzorowaną na językach **[Java]** i C#).
Jednak nie stała za tymi językami programowania żadna duża korporacja.
Inaczej jest w przypadku języka **[Go]**,
który jest zwycięzcą w kategorii.
Główne cechy języka:
* Język roku 2009 i 2016 według [Tiobe]
* Pierwszy język stworzony przez Google,
który przebił się do mainstreamu
* Niestety [GoLand](<https://www.jetbrains.com/go/>) od JetBains jest płatny,
ale na szczęście istnieją inne dobre IDE dla **[Go]** jak [Atom] lub [VSC]
* Mimo że to język względnie nowy powstała w nim już ogromna ilość oprogramowania jak np. **[Docker]** i Kubernetes.
* Dzięki temu, że posiada <s>~~upośledzoną~~</s> prostą składnię prawdopodobnie będzie to też nowy [język korporacyjny](/jezyk-korporacyjny).

Dodatkowo problemy znane z C++ są rozwiązane w **[Go]** za pomocą wszystkomającego kompilatora,
który także formatuje kod i zarządza zależnościami. 
Co prawda nie jest superszybki,
co widać po testach,
ale za to szybko się kompiluje.

## ... i trudne alternatywy
Co jednak jeśli nie chcemy pisać w języku z <s>~~upośledzoną~~</s> prostą składnią,
który nie zawiera nawet generyków?
Lub chcemy pisać szybko działające oprogramowanie?
W takim przypadku istnieje kilka alternatyw,
ale żadna z nich nie jest łatwa:
* **[Rust]** - posiada zaawansowany system typów,
domyślną niezmienność (ang. *immutable*), 
prawie [Type Classes] i wiele innych cech deklaratywno funkcyjnych języków programowania.
Jednocześnie pozwalając na imperatywne optymalizacje tam gdzie ważna jest wydajność.
* **[Pony](/posts-by-lang/pony)** - posiada typowany system aktorów,
i podobnie jak **[Rust]**,
rozbudowany system własności zmiennych.
* **[Crystal](/posts-by-lang/crystal)** - język bazujący składniowo na języku **[Ruby]**,
a więc kolejny spadkobierca języka SmallTalk

Oprócz tego część języków nienatywnych stara się zostać językami natywnymi.
Przykładami mogą tu być **[Scala Native]** i **[Kotlin Native]**.
Jest to dziś łatwiejsze dzięki istnieniu kompilatora **[LLVM]**.

## Podsumowanie
W tej chwili trudno doradzać komuś naukę języków **[Go]** lub **[Rust]** jako pierwszego języka programowania.
Ponieważ aktualnie ilość ofert pracy dla Go jest mniejsza niż dla języka **[Scala]**.
Np. na Górnym Śląsku jest jedna firma zatrudniająca do Go.
Z drugiej strony ilość i jakość narzędzi,
które powstają w Go jest niesamowita.
I to może odwrócić trend w najbliższych latach.

[maszyny P-code]: https://en.wikipedia.org/wiki/P-code_machine
[kod bajtowy]: /posts-by-tags/bytecode

[Electron]: https://pl.wikipedia.org/wiki/Electron_(oprogramowanie)
[Atom]: https://ide.atom.io/
[VSC]: https://code.visualstudio.com/docs/

[Benchmarks Game]: https://benchmarksgame-team.pages.debian.net/benchmarksgame/which-programs-are-fastest.html

[Rust]: /posts-by-langs/rust
[Java]: /posts-by-langs/java
[Julia]: /posts-by-langs/julia
[F#]: /posts-by-langs/fsharp
[OCaml]: /posts-by-langs/ocaml
[Meta Language]: /posts-by-langs/ml
[Common Lisp]: /posts-by-langs/common-lisp
[Go]: /posts-by-langs/go
[TypeScript]: /posts-by-langs/typescript
[Dart]: /posts-by-langs/dart
[Haskell]: /posts-by-langs/haskell
[Node.js]: /posts-by-tags/node-js
[JavaScript]: /posts-by-langs/javascript
[Racket]: /posts-by-langs/racket 
[Scheme]: /posts-by-langs/scheme
[Erlang]: /posts-by-langs/erlang
[Lua]: /posts-by-langs/lua

[monady]: /posts-by-tags/monad
[LLVM]: /posts-by-tags/llvm

[Vala]: https://pl.wikipedia.org/wiki/Vala_(j%C4%99zyk_programowania)
[GObject]: https://en.wikipedia.org/wiki/GObject

[Tiobe]: https://www.tiobe.com/tiobe-index/
[IEEE]: https://spectrum.ieee.org/at-work/innovation/the-2018-top-programming-languages
[Docker]: /posts-by-tags/docker


[Type Classes]: /posts-by-tags/type-classes

[Pony]: /posts-by-langs/pony
[Crystal]: /posts-by-langs/crystal
[Ruby]: /posts-by-langs/ruby

[Scala Native]: /posts-by-tags/scala-native
[Kotlin Native]: /posts-by-tags/kotlin-native
[Scala]: /posts-by-langs/scala