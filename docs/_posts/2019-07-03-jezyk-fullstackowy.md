---
title:    'Który język programowania wybrać na początek - język fullstackowy'
author:   TheKamilAdam
category: programming
tags:     api cli interpreter gui monad transpiler
langs:    ceylon clojure coffeescript dart elm java javascript haskell kotlin livescript meta-language ocaml purescript python racket reasonml ruby scala typescript
tools:    bucklescript clojurescript kotlin-js node-js postgresql scala-js
libs:     akka-http dropwizard jquery udash
redirect_from:
  - jezyk-fullstackowy
  - programming/jezyk-fullstackowy
  - onions/jezyk-fullstackowy
  - onions/2019/07/03/jezyk-fullstackowy.html
  - onions/2019/07/03/ktory-jezyk-programowania-wybrac-jezyk-fullstackowy.html
---

Wiele osób pyta się,
**który język programowania wybrać na początek** jako pierwszy język do nauki.
Wiele jednak zależy od tego do czego chcemy użyć tego języka programowania.
Dlatego wybrałem zwycięzców w czterech kategoriach:
1. [dynamicznie typowany język skryptowy ogólnego przeznaczenia](/jezyk-skryptowy)
2. [statycznie typowany język korporacyjny używany do pisania długowiecznych aplikacji klasy *enterprise*](/jezyk-korporacyjny)
3. język *fullstackowy*, który można używać do pisania frontendu i backendu
4. [szybki język natywny działający bez maszyny wirtualnej i interpretera](/jezyk-natywny)

W tym artykule skupię się na zwycięzcy trzeciej kategorii,
świętym Graalu programowania webowego, 
czyli języku *fullstackowy*,
w którym można pisać zarówno frontend jak i backend.

**Ważna uwaga!**
Artykuł nie jest sponsorowany przez Google,
mimo że każdy ze zwycięskich języków jest używany przez Google.
Nie jest też sponsorowany przez JetBrains.
Po prostu uważam,
że JetBrains tworzy najlepsze IDE.
Jest to tylko mój mały subiektywny ranking języków programowania na rok 2019.

## JavaScript oraz jego problemy i dziwactwa
**[JavaScript]** jest obecnie jedynym językiem programowania wspieranym przez przeglądarki bezpośrednio.
Dlatego jesteśmy skazani na niego przy programowaniu frontendu działającego po stronie przeglądarki. 
Jednocześnie JS posiada sporo swoich problemów i dziwactw. Zaczynając od najważniejszych są to:
1. Różne implementacje w różnych przeglądarkach
2. [Słabe typowanie], które pozwala robić takie rzeczy jak [JSFuck] 
3. Obiektowość oparta na [prototypach](<https://pl.wikipedia.org/wiki/Prototyp_(oprogramowanie)>).

Ostatnie nie byłoby nawet problemem gdyby nie to,
że w początkowej fazie istnienia rozdziału na frontend i backend
programiści backendowi byli przymuszani do pisania frontendu.
Bolało to zwłaszcza programistów języków korporacyjnych,
gdzie obiektowość oparta jest na [klasach](<https://pl.wikipedia.org/wiki/Klasa_(programowanie_obiektowe)>).

### Podejście zerowe
Początkowo głównym problemem z JavaScryptem było to,
że był różnie implementowany w różnych przeglądarkach.
W niektórych przeglądarkach brakowało niektórych funkcji,
w innych te same funkcje zachowywały się różnie.
Spowodowało to powstawanie wielu różnych nakładek i bibliotek na JS,
z czego jedna stała się *de facto* standardem - **[JQuery]**.
Było to jednak w dawnych czasach,
gdy programowanie JavaScripcie było proste,
ponieważ służył on głownie do robienia bezsensownych animacji na strona oraz customowych menu kontekstowych.

Obecnie głównym problemem pisania aplikacji webowych jest to,
że potrzebujemy osobnych programistów do tworzenia frontendu (*frontendowców*) 
i osobnych do tworzenia backendu (*backendowców*).
Teoretycznie istnieje święty Graal wszelakiej rekrutacji,
człowiek orkiestra,
Leonardo da Vinci swoich czasów,
czyli fullstackowiec potrafiący pisać zarówno frontend jak i backend.
W praktyce jest to jednak osoba znająca się na wszystkim, ale po trochu.
Trochę jak np. internista w szpitalu.
Rozwiązaniem jest dopiero język *fullstackowy*.

### Podejście pierwsze - język backendowy transpilowany do JS

Ponieważ programistów JavaScriptu było mało,
a frontend stawał się coraz bardziej skomplikowany pojawił się pomysł,
żeby już istniejące języki backendu transpilować do JS.
Dzięki temu programiści backendu mogą z marszu stać się programistami frontendu.
Tutaj są dwie grupy rozwiązań:
* Biblioteki graficzne przeniesione do **[JS]**:
  * [RAP] (ang. *Remote Aplication Platform*) - 
  to implementacja [SWT] (ang. *Standard Widget Toolkit*).
   SWT to niestandardowy (sic!) zestaw bibliotek graficznych dla Javy,
  posiadający implementacje dla najpopularniejszych systemów operacyjnych (Mac, Linux, Windows). 
  * [GWT] (ang. *Google Widget Toolkit*) - 
  biblioteka graficzna zaprojektowana dla Javy specjalnie pod transpilację do JS
  * [Pyjs] - Port GWT dla języka **[Python]**
* Język backendu przeniesiony do frontendu jednocześnie nie narzucający frameworka widoku i biblioteki graficznej:
  * **[Scala.js]** - posiada już dedykowane frameworki ja *[Udash]*
  * [Kotlin.js] - dalej w procesie projektowania
  * [Ceylon.js] - transpilowany do CommonJS
  * [ClojureScript]* - używa [Closure Compiler] do optymalizacji kodu.
Tutaj pojawia się gwiazdka ponieważ istnieją [różnice](<https://clojurescript.org/about/differences>) pomiędzy 
  **[Clojure]** i ClojureScript
  * Dla Javy: 
    * [J2CL] - [transpilator] od Google używający [Closure Compiler] i będący następcą [GWT]
    * [JSweet] - [transpilator] do  języka **[TypeScript]**, który następnie jest transpilowany do [JS]
  * Programiści języka **[Haskell]** także podejmowali kilka prób stworzenia transpilatora z Haskella do JS.
Są to [Fay], [GHCJS], [Haste] i [uhc]
  * Dla języka **[OCaml]** jest kilka transpilatorów, 
    ale aktualnie najbardziej obiecująco wygląda **[BuckleScript].**
  * Język **[Racket]** był jednym z pierwszych transpilowanych do JS, aktualnie jest rozwijany [RacketScript]

### Podejście drugie - nowy język transpilowany do JS

Według wielu programistów pierwsze podejście było niezadowalające.
Istniało wiele problemów z językami backedowymi transpilowanymi do JS.
Prawdopodobnie największym jest przetwarzanie współbieżne.
Statycznie typowane języki korporacyjne posiadają wielowątkowość do przetwarzania współbieżnego.
Interpretery JS posiadają jeden wątek 
i do przetwarzania współbieżnego używa konstrukcji `Promise` (*obietnicy*),
której najbliżej do [monady]) `IO` z Haskella lub `Future` ze Scali.
Ponieważ nie da się łatwo zamienić modelu `Promise` na wielowątkowość to jest to problemem.

Ponieważ pierwsze podejście okazało się niezadowalające postanowiono 
stworzyć nowe języki programowania będące jak najbardziej podobne do JS,
ale jednocześnie rozwiązujące znane w nim problemy.
Te języki to m.in.:
* **[CoffeeScript]** - pierwszy popularny, nowy język transpilowany do JS. Posiada klasy i *normalne* dziedziczenie,
ale typowany dynamicznie. Promowany przez programistów **[Ruby]** we frameworku RoR
* **[LiveScript]** - funkcyjny następca CoffeeScriptu
* **[TypeScript]** - rozszeżenie **[JS]** o statyczne typowanie i klasy
* **[PureScript]** - **[Haskell]**, ale wykonywany zachłannie, 
czyli jak *normalny* język programowania, a nie Haskell
* **[ReasonML]** - **[OCaml]** ze zmienioną składnią w celu upodobnienia go do **[JS]**.
  Także transpilowany za pomocą **[BuckleScript]**.
* **[Elm]*** - język będący połączeniem języków **[Meta Language]** i **[Haskell]** 
  oraz będący już zintegrowany z frameworkami React i Redux (implementacja architektury Flux).
Jest z gwiazdką, bo jest dedykowany tylko do pisania frontendu.
Jednocześnie posiada ciekawą właściwość jaką jest usuwanie martwego kodu podczas transpilacji.
Dlatego aplikacja napisana w Elmie może być mniejsza niż kod Reacta 
* **[Dart]*** - kolejny język z gwiazdką. Mimo że jest względnie młody przeszedł już historię dzielącą się na etapy:
  1. Natywny język przeglądarki - niestety wykonywany natywnie tylko przez Chroma. 
Inne przeglądarki miały posiadać maszynę wirtualną Darta napisaną w JS.
  2. Język do pisania frontendu, transpilowany do JS
  3. Język do pisania frontendu i aplikacji mobilnych za pomocą frameworku Flutter

Ale jakim cudem w ogóle można mówić o JS jako o języku *fullstackowym*?
Spójrzy na małe kalendarium:
* 2007 - Qt dodaje Qt Script, własną implementacją EmcaScriptu, język jest dedykowany do tworzenia **[GUI]**. 
Teoretycznie nic to nie wnosi do tej historii, ale zainspirowało niektórych
* 2008 - Gnome dodaje dwa [bindingi Javascriptu](<https://wiki.gnome.org/JavaScript>), [Gjs] i [Seed].
Są one dedykowane do tworzenia **[GUI]** w miejsce wcześniej stosowanego w tym celu języka **[Python]**, 
ale można ich używać jako główny język do pisania aplikacji oraz jako język skryptowy
* 2009 - powstaje [Node.js], wyciągnięty z przeglądarki [interpreter] V8,
który można używać z linii poleceń [CLI]
* 2011 - powstaje [Vert.x], framework do przetwarzania współbieżnego na [JVM],
który posiada [API] m.in. w JavaScripcie

A więc wszystkie języki transpilowane do JS (i sam JS oczywiście) można wykonywać po stronie backendu! 

### Podejście wygrywające
zwycięzcą kategorii *język fullstackowy* jest język transpilowany do JS i jest to ... JavaScript!

Co?! Dlaczego JavaScript jest transpilowany do JavaScriptu?
Wynika to z tego, 
że w międzyczasie tworzenia gigantycznej ilości nakładek do JavaScriptu sam Javascript też był rozwijany.
Niestety dalej trzeba wspierać stare przeglądarki używające starszych wersji JavaScriptu.
Dlatego jest potrzebny [transpilator] [Babel] zamieniający ECMAScript 6 do ECMAScript 5.

A dlaczego JavaScript jest zwycięzcą?
* Ewoluował i nie jest już tak brzydki jak kiedyś
* Jest popularny - język roku 2014 według [Tiobe]
* Nawet jeśli będziesz pisać frontend w innym języku programowania niż JS to prawdopodobnie
i tak będziesz musiał znać podstawy JavaScriptu,
* Niestety [WebStorm] od JetBains jest płatny,
ale na szczęście istnieją inne dobre IDE dla JavaScriptu jak [Atom] lub [VSC].
* Chyba wreszcie zrozumieli JS w Google.
Google długo miało problemy z JavaScriptem i dlatego m.in. stworzyło [GWT].
Jednak od pewnego czasu Google wspiera użycie JavaScriptu np w [Google Cloud Functions],
gdzie można używać tylko i wyłącznie JavaScriptu.

Ale nie to jest największą zaletą JavaScriptu! 
Największą zaletą jest [Node.js].
A największą zaletą [Node.js] jest to,
że jest jednowątkowy i zmusza do pisania aplikacji funkcyjnych, asynchronicznych i reaktywnych.
Dlaczego warto pisać takie aplikacje?
Zobacz:
* [Funkcyjne Serwery w Javie, Jarek Ratajski ](<https://www.youtube.com/watch?v=QUJgD9t5jMw>)
* [SegFault Łódź, 18 maja 2018. Jarek Ratajski: "Nadeszła era funkcyjnego serwera, to nie tylko NodeJS"](<https://www.youtube.com/watch?v=ae0JuSrDUE0>)

[Node.js] nie jest jedynym asynchronicznym serwerem. Istnieją także inne jak:
* [Vert.x] - wielki framework dla języków JavaScript, Java, Scala, Kotlin, **[Ceylon]**, Groovy i **[Ruby]**
* [Lagom] - kolejny wielki framework, dedykowany dla języka Java
* [Akka HTTP] - biblioteka dedykowana dla języków **[Scala]** i Java
* [Spark] - biblioteka dedykowana dla języków **[Kotlin]** i Java
* [Ratpack] - biblioteka dedykowana dla języków Groovy i Java
* [WebFlux] - reaktywa wersja Springa

Wiele innych frameworków także zaczyna wspierać programowanie asynchroniczne,
jak np. [DropWizard]. 

## Podsumowanie

Trudno tutaj o dobre podsumowanie.
Chyba nie mam odwagi polecić komuś JavaScript/TypeScript do nauki jako pierwszy język do programowania.
Głównie obawiając się o zdrowie psychiczne tej osoby,
która miałaby programować w JS.
 
Osobiście jestem zwolennikiem statycznie typowanych języków backendu transpilowanych do JS,
jak np. Scala.js lub Kotlin.js.
Pozwala to współdzielić kod między frontendem i backendem,
który teoretycznie może być nawet aplikacją natywną.
Jednocześnie  w tych językach programowania
do rozwiązywania problemów asynchroniczności 
są preferowane konstrukcje `Future` oraz **[monady](/posts-by-tags/monad)** `IO`,
które łatwo przetłumaczyć na `Promise` z JS.

Równie ciekawy wydaje się także,
pojawiącący w niektórych zagranicznych ogłoszeniach o pracę,
stos technologiczny PHP,
czyli:
* **P**ureScript na frontendzie
* **H**askell na backandzie
* **P**ostgreSQL jako baza danych

Są to co prawda dwa języki programowania do nauki, 
ale bardzo podobne do siebie.
O wiele bardziej niż Java i JavaScript.
Więc opanowanie jednego z nich,
gdy umie się już drugi nie powinno być problemem.

## Ciekawe linki

[Lista języków kompilowanych do JS](<https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS>)

[Ceylon]:        /posts-by-langs/ceylon
[Clojure]:       /posts-by-langs/clojure
[CoffeeScript]:  /posts-by-langs/coffeescript
[Dart]:          /posts-by-langs/dart
[Elm]:           /posts-by-langs/elm
[Java]:          /posts-by-langs/java
[JavaScript]:    /posts-by-langs/javascript
[JS]:            /posts-by-langs/javascript
[Haskell]:       /posts-by-langs/haskell
[Kotlin]:        /posts-by-langs/kotlin
[LiveScript]:    /posts-by-langs/livescript
[Meta Language]: /posts-by-langs/meta-language
[OCaml]:         /posts-by-langs/ocaml
[PureScript]:    /posts-by-langs/purescript
[Python]:        /posts-by-langs/python
[Racket]:        /posts-by-langs/racket
[ReasonML]:      /posts-by-langs/reasonml
[Ruby]:          /posts-by-langs/ruby
[Scala]:         /posts-by-langs/scala
[TypeScript]:    /posts-by-langs/typescript

[BuckleScript]:  /posts-by-tools/bucklescript
[ClojureScript]: /posts-by-tools/clojurescript
[JVM]:           /posts-by-tools/jvm
[Kotlin.js]:     /posts-by-tools/kotlin-js 
[Node.js]:       /posts-by-tools/node-js
[PosgreSQL]:     /posts-by-tools/postgresql
[Scala.js]:      /posts-by-tools/scala-js

[Akka HTTP]:     /posts-by-libs/akka-http
[DropWizard]:    /posts-by-libs/dropwizard
[JQuery]:        /posts-by-libs/jquery

[API]:           /posts-by-tags/api
[CLI]:           /posts-by-tags/cli
[interpreter]:   /posts-by-tags/interpreter
[GUI]:           /posts-by-tags/gui
[monady]:        /posts-by-tags/monad
[transpilator]:  /posts-by-tags/transpiler

[Słabe typowanie]: https://pl.wikipedia.org/wiki/Typowanie_s%C5%82abe
[JSFuck]: https://github.com/aemkei/jsfuck

[RAP]: https://www.eclipse.org/rap/
[SWT]: https://www.eclipse.org/swt/
[GWT]: http://www.gwtproject.org
[Pyjs]: http://pyjs.org/

[Ceylon.js]: https://ceylon-lang.org/documentation/1.3/reference/interoperability/js/
[ClojureScript]: https://clojurescript.org/

[Closure Compiler]: https://github.com/google/closure-compiler
[J2CL]: https://github.com/google/j2cl
[JSweet]: https://github.com/cincheo/jsweet

[Fay]: https://github.com/faylang/fay/wiki
[GHCJS]: https://github.com/ghcjs/ghcjs
[Haste]: https://github.com/valderman/haste-compiler
[uhc]: https://github.com/uhc/uhc

[RacketScript]: https://github.com/vishesh/racketscript

[udash]: https://udash.io/

[babeljs]: https://babeljs.io/

[Tiobe]: https://www.tiobe.com/tiobe-index/
[WebStorm]: https://www.jetbrains.com/webstorm/
[Atom]: https://ide.atom.io/
[VSC]: https://vscodium.com/
[Google Cloud Functions]: https://cloud.google.com/functions/

[Gjs]: https://gitlab.gnome.org/GNOME/gjs/blob/master/README.md
[Seed]: https://gitlab.gnome.org/GNOME/seed
[V8]: https://pl.wikipedia.org/wiki/V8_(silnik_JavaScript)
[Npm]: https://pl.wikipedia.org/wiki/Npm_(manager_pakiet%C3%B3w)
[Vert.x]: https://en.wikipedia.org/wiki/Vert.x

[Babel]: https://babeljs.io/
[Programowanie sterowane zdarzeniami]: https://pl.wikipedia.org/wiki/Programowanie_sterowane_zdarzeniami

[Lagom]: https://github.com/lagom/lagom
[Spark]: https://github.com/perwendel/spark
[Ratpack]: https://github.com/ratpack/ratpack
[WebFlux]: https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html
