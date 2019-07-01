---
title:    'Który język programowania wybrać na początek - język fullstackowy'
author:   TheKamilAdam
category: onions
tags:     transpiler scala-js monad cli api interpreter
labels:   clojurescript udash
langs:    java python scala kotlin haskell clojure javascript typescript purescript elm dart ruby
redirect_from:
  - jezyk-fullstackowy
---
Wiele osób pyta się,
**który język programowania wybrać na początek** jako pierwszy język do nauki.
Wiele jednak zależy od tego do czego chcemy użyć tego języka programowania.
Dlatego wybrałem zwycięzców w czterech kategoriach:
1. [dynamicznie typowany język skryptowy ogólnego przeznaczenia](/jezyk-skryptowy)
2. [statycznie typowany język korporacyjny używany do pisania długowiecznych aplikacji klasy *enterprise*](/jezyk-korporacyjny)
3. język fullstackowy, który można używać do pisania frontendu i backendu
4. szybki język natywny działający bez maszyny wirtualnej i interpretera

W tym artykule skupię się na zwycięzcy trzeciej kategorii,
świętym Graalu programowanai webowago, 
czyli języku fullstack,
w którym można pisać zarówno frontend jak i backend.

**Ważna uwaga!**
Artykuł nie jest sponsorowany przez Google,
mimo że każdy ze zwycięskich języków jest używany przez Google.
Nie jest też sponsorowany przez JetBrains.
Po prostu uważam,
że JetBrains tworzy najlepsze IDE.

## JavaScript oraz jego problemy i dziwactwa
**[JavaScript]** jest obecnie jedynym językiem programowania wspieranym przez przeglądarki bezpośrednio.
Dlatego jesteśmy skazani na niego przy programowaniu frontedu działającego po stronie przeglądarki. 
Jednocześnie JS posiada sporo swoich programów i dziwact. Zaczynając od najważniejszych są to:
1. Różne implementacje w różnych przeglądarkach
2. [Słabe typowanie], które pozwala robić takie rzeczy jak [JSFuck] 
3. Obiektowość oparta na [prototypach](<https://pl.wikipedia.org/wiki/Prototyp_(oprogramowanie)>),
a nie [klasach](<https://pl.wikipedia.org/wiki/Klasa_(programowanie_obiektowe)>)

Ostatnie nie było by nawet problemem gbyby nie to,
że w początkowej fazie istnienia  rozdziału na frontend i backend
programiści backendowi byli przymusani do pisania frontendu. 

### Podejście zerowe
Pierwszym problemem z JavaScryptem było to,
że był różnie implementowany w różnych przeglądarkach.
W niektórych przeglądarkach brakowało niektórych funkcji,
w innych te same funkcje zachowywały się różnie.
Spowodowało to wpostawanie wielu różnych nakładek i bibliotek na JS,
z czego jedna stałą się standardem sama w sobie - [JQuery].

[JQuery] nie rozwiazuje jednak głównego probemu,
czyli że potrzebujemy jednego języka do pisania frontendu a drugiego do pisania backendu.
Rozwiązaniem są dopiero języki fullstack.

### Podejście pierwsze - język backendowy transpilowany do JS

Ponieważ programistów JavaScriptu było mało,
a frontend stawał się coraz skomplikowany pojawił się pomysł,
żeby już istniejące języki backendu można transpilować do JavaScriptu.
Tutaj są dwie pod grupy rozwiązań:
* Biblioteki graficzne przeniesione do **[JS]**:
  * [RAP] (ang. *Remote Aplication Platform*) - 
  to implementacja [SWT] (ang. *Standard Widget Toolkit*).
   SWT niestandardowy zestaw bibliotek graficznych dla Javy,
  posadająca implementacje dla najpopularniejszych systemów operacyjnych (Mac, Linux, Windows). 
  * [GWT] (ang. *Google Widget Toolkit*) - 
  biblioteka graficzna zaprojektowana dla Javy specjalnie pod kompilacje do JSa 
  * [Pyjs] Port GWT dla Pythona
* Język backendu przeniesiony do frontendu jednocześnie nie narzucający frameworka widoku:
  * **[Scala.js]** - posiada już dedykowane frameworki ja *[udash]*  
  * [Kotlin.js] - dalej w prosesie projektowania
  * [ClojureScript]* - tutaj pojawia się gwiazdka ponieważ istnieją [różnice](<https://clojurescript.org/about/differences>) pomiędzy 
  **[Clojure]** i ClojureScript,
   ponieważ Clojure i ClojureScript są miejscami tylko cieńką otoczką na **[JVM]** i **[JS]**
  * Dla Javy: 
    * [J2CL] - [transpilator] od Google używający [Closure Compiler] i będący następcą [GWT]
    * [JSweet] - [transpilator] do  języka [TypeScript], który następnie jesttranspilowany do [JS]
  * Programiści języka **[Haskell]** podejmowali kilka prób stworznia transpilatora z Haskella do JS.
Są to [Fay], [GHCJS], [Haste] i [uhc]

### Podejście drugie - nowy język transpilowany do JS

Według wielu programistów pierwsze podejście było niezadowalające.
Istniało wiele problemów z językami backedowymi transpilowanymi do JS.
Prawdopodobnie największym jest przetwarzanie współbieżne.
Statycznie typowane jezyki korporacyjne posiadają wielowątkowość do przetwarzania współbieżnego.
Interpretery JavaScriptu posiadają jeden wątek 
i do przetwarzania współbieżnego używa konstrukcji `Promise`,
któremu najbliżej do [monady](/posts-by tags/monad) `IO` z Haskella lub `Future` z Scali.
Ponieważ nie da się łątwo zamienić modelu `Promise` na wielowątkowość to jest to problemem.

Ponieważ pierwsze podejście okazało niezadowalające postanowiono 
stworzyć nowe języki programowania będące jak najbardziej podobne do JS,
ale jednocześnie rozwiązujące znane w nim problemu.
Te języki to m.in.:
* **[CoffeeScript]** - pierwszy popularny, nowy język, pisada klasy i *normalne* dziedziczenie,
ale typowany dynamicznie. Promowany przez programistów [Ruby] we frameworku RoR
* **[TypeScript]** - rorzszeżenie **[JS]** o statyczne typowanie i klasy
* **[PureScript]** - **[Haskell]**, ale wykonywany zachłannie, 
czyli jak *normalny* język programowania, a nie Haskell
* **[Elm]*** - **[Haskell]**, ale już zintegrowany z Reactem i Reduxem.
Jest z gwiastką, bo jest dedykowany tylko do pisania frontu
* **[Dart]*** - kolejny język z gwiazdką. Mimo że jest względnie młody przeszedł już historię dzielącą się na etapy:
  1. Natywny język przeglądarki - niestety wykonywany natywnie tylko przez Chroma. 
Inne przeglądarki miały posiadać maszynę wirtualną Darta napisaną w JavaScripcie.
  2. Język do pisania frontu, transpilowany do JavaScriptu
  3. Język do pisania frontu i aplikacji mobilnych za pomocą frameworku Flutter

Ale jakim cudem w ogóle można mówić o JavaScripcie jako o języku fullstack?
* 2007 - Qt dodaje Qt Script, własną implementacją EmcaScriptu, język jest dedykowany do tworzenia GUI
* 2008 - Gnome dodaje dwa [bindingi Javascriptu](<https://wiki.gnome.org/JavaScript>), [Gjs] i [Seed].
Są one dedykowane do tworzenia GUI w miejsce wcześniej stosowanego w tym celu języka [Python], 
ale można ich używać jako główny język do pisania aplikacji oraz jako język skryptowy
* 2009 - powstaje [Node.js], wyciągnięty z przegladarki interpreter V8,
który można używać z linii poleceń [CLI]
* 2011 - powstaje [Vert.x], framework do przetwarzania współbieżnego na [JVM],
który posiada [API] m.in. w JavaScripcie


### Podejście wygrywające
Zwyciężcą kategorii jest język transpilowany do JavaScriptu i jest to... JavaScript!

Dlaczego JavaScript jest transpilowany?
Wynika to z tego, 
że w miedzy czasie tworzenia gigantycznej ilości nakładek do JavaScriptu sam Javascript też był rozwijany.
Niestety dalej są wspierane przeglądarki używające starszej wersji JavaScriptu.
Dlatego jest potrzebny [transpilator] [Babel] zamieniający ECMAScript 6 do ECMAScript 5.

Dlaczego JavaScript jest zwycięzcą?
* Język roku 2014 według [Tiobe]
* 
* Niestety [WebStorm] od JetBains jest płatny,
ale na szczęście istnieją inne dobre IDE dla JavaScriptu jak [Atom] lub [VSC]

## Ale jakim cudem?



## Podsumowanie


[Słabe typowanie]: https://pl.wikipedia.org/wiki/Typowanie_s%C5%82abe
[JSFuck]: https://github.com/aemkei/jsfuck

[JQuery]: https://jquery.com/

[transpilator]: /posts-by-tags/transpiler

[Java]: /posts-by-langs/java
[Scala]: /posts-by-langs/scala
[Kotlin]: /posts-by-langs/kotlin
[Haskell]: /posts-by-langs/haskell
[Clojure]: /posts-by-langs/clojure

[RAP]: https://www.eclipse.org/rap/
[SWT]: https://www.eclipse.org/swt/
[GWT]: http://www.gwtproject.org
[Pyjs]: http://pyjs.org/

[Scala.js]: /posts-by-tags/scala-js
[Kotlin.js]: https://kotlinlang.org/docs/reference/js-overview.html
[ClojureScript]: https://clojurescript.org/

[Closure Compiler]: https://github.com/google/closure-compiler
[J2CL]: https://github.com/google/j2cl
[JSweet]: https://github.com/cincheo/jsweet

[Fay]: https://github.com/faylang/fay/wiki
[GHCJS]: https://github.com/ghcjs/ghcjs
[Haste]: https://github.com/valderman/haste-compiler
[uhc]: https://github.com/uhc/uhc

[JS]: /posts-by-langs/javascript
[JVM]: /posts-by-tags/jvm
[udash]: https://udash.io/

[JavaScript]: /posts-by-langs/javascript
[CoffeeScript]: /posts-by-langs/coffeescript
[TypeScript]: /posts-by-langs/typescript
[PureScript]: /posts-by-langs/purescript
[Elm]: /posts-by-langs/elm
[Dart]: /posts-by-langs/dart

[babeljs]: https://babeljs.io/

[Tiobe]: https://www.tiobe.com/tiobe-index/
[WebStorm]: https://www.jetbrains.com/webstorm/
[Atom]: https://ide.atom.io/
[VSC]: https://code.visualstudio.com/docs/

[Python]: /posts-by-langs/python
[Ruby]: /posts-by-langs/ruby
[Gjs]: https://gitlab.gnome.org/GNOME/gjs/blob/master/README.md
[Seed]: https://gitlab.gnome.org/GNOME/seed
[V8]: https://pl.wikipedia.org/wiki/V8_(silnik_JavaScript)
[Node.js]: https://en.wikipedia.org/wiki/Node.js
[Npm]: https://pl.wikipedia.org/wiki/Npm_(manager_pakiet%C3%B3w)
[Vert.x]: https://en.wikipedia.org/wiki/Vert.x

[Babel]: https://babeljs.io/
[Programowanie sterowane zdarzeniami]: https://pl.wikipedia.org/wiki/Programowanie_sterowane_zdarzeniami

[CLI]: /posts-by-tags/cli
