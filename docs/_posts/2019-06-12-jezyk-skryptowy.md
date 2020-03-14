---
title:    'Który język programowania wybrać na początek - język skryptowy'
author:   TheKamilAdam
category: programming
tags:     bdd cst dsl script sed
langs:    awk clojure common-lisp crystal elixir lisp perl python racket ruby scheme
tools:    bash
redirect_from:
  - jezyk-skryptowy
  - programming/jezyk-skryptowy
  - onions/jezyk-skryptowy
  - onions/2019/06/12/jezyk-skryptowy.html
  - onions/2019/06/12/ktory-jezyk-programowania-wybrac-jezyk-skryptowy.html
---

Wiele osób pyta się,
**który język programowania wybrać na początek** jako pierwszy język do nauki.
Wiele jednak zależy od tego do czego chcemy użyć tego języka programowania.
Dlatego wybrałem zwycięzców w czterech kategoriach:
1. dynamicznie typowany język skryptowy ogólnego przeznaczenia 
2. [statycznie typowany język korporacyjny używany do pisania długowiecznych aplikacji klasy *enterprise*](/jezyk-korporacyjny)
3. [fullstack język, który można używać do pisania frontendu i backendu](/jezyk-fullstackowy)
4. [szybki język natywny działający bez maszyny wirtualnej i interpretera](/jezyk-natywny)

W tym artykule skupię się na zwyciężcy pierwszej kategorii,
czyli języku skryptowym ogólnego przeznaczenia.

**Ważna uwaga!**
Artykuł nie jest sponsorowany przez Google,
mimo że każdy z tych języków jest używany przez Google.
Nie jest też sponsorowany przez JetBrains.
Po prostu uważam,
że JetBrains tworzy najlepsze IDE.
Jest to tylko mój mały subiektywny ranking języków programowania na rok 2019.

## Język skryptowy ogólnego przeznaczenia - definicja
[Język skryptowy](<https://pl.wikipedia.org/wiki/J%C4%99zyk_skryptowy>) (ang. *script language*)
powinien być prostym językiem programowania,
czyli być dynamicznie typowany i mieć prostą składnie.
Dzięki temu można w nim szybko skryptować, testować, prototypować.
Łatwo i szybko można go zrozumieć i jest polecany tym którzy *programują, ale nie są programistami*.

Wzorcowy język skryptowy jest idealny dla:
* eksploratorów danych i naukowców -
ale tu jest mała gwiazdka,
bo zwykle pod spodem są biblioteki napisane w szybkim języku natywnym
* SysAdminów (*SysOps Engenerów*, *DevOpsów Engenerów*) - do pisania skryptów zarządzających i administrujących
* testerów (*QA Engenerów*) - do pisania testów akceptacyjnych
* hobbystów - do zabawy i np. oprogramowywania Raspberry Pi
* programistów:
  * do [prototypowania](<https://pl.wikipedia.org/wiki/Model_prototypowy>)
  * pisania małych aplikacji, zwykle webowych

Dużych aplikacji w językach skryptowych się nie pisze,
bo są trudno utrzymywalne.
Oczywiście w językach skryptowych powstawały duże aplikacje,
ale wiele z nich zostało już przepisanych do korpo języków ze statycznym typowaniem.

## Język skryptowy ogólnego przeznaczenia - zwycięzca
Zwycięzcą w kategorii *język skryptowy* jest **[Python]**.
Główne przesłanki przemawiające za tym,
że jest najlepszy to:
* Język roku 2008, 2010 i 2018 według [Tiobe]
* Pierwszy język według [IEEE]
* Darmowe IDE [PyCharm] od JetBrains
* Jest używany w Google do prototypowania
* Prosta składnia - niektórzy jednak nie zgadzają się z tym,
że [składnia Pythona jest prosta](<https://github.com/satwikkansal/wtfpython>)

Niestety jest też parę minusów:
* Rakiem,
który toczy Pythona najbardziej,
jest problem z wersjami,
czyli rozłam na wersję 2 oraz wersję 3.
Powoduje to przymus poznania takich narzędzi jak [pipenv], [pyenv] i [virtualenv].
Dodatkowo nie pomagają różne implementacje jak [PyPy],
lub [Stackless Python].
* Statystyki informujące o wspaniałej przyszłości Pythona dotyczą zbiorczo całego świata.
A niestety różnica między USA a Europą,
jeśli chodzi o popularność poszczególnych języków programowania,
zawsze była duża.
Różnice są także spore,
jeśli chodzi o poszczególne miasta w Polsce.

## ... i pokonani
Python powstał jako konkurencja dla języka **[Perl]** z prostszą składnią.
**[Perl]** posiadał mocno niespójną i trudną do nauki składnię.
Wynika to z tego,
że inspiracją dla Perla były narzędzia **[Bash]**, **[AWK]** i [Sed].

Jednocześnie Python ciągle wygrywa z **[Ruby]**,
ponieważ ma prostszą składnię i [działa szybciej](<https://bulldogjob.pl/news/232-ktory-jezyk-programowania-jest-najszybszy>).
Jednak Ruby pozostaje bardzo ciekawym językiem programowania w którym powstały takie rzeczy jak:
* [Sinatra] - wzorcowy mały framework webowy przeniesiony do wielu innych języków programowania,
jak np. [Scalatra] lub [Spark]
* [RoR] - duży framework webowy będący inspiracją dla wielu innych, jak np. [Play Framework] lub [Phoenix]
* [RSpec] - framework popularyzujący nowy **[DSL]** dla testów,
zaimplementowany także  wielu innych frameworkach testowych jak np. **[ScalaTest]** i **[Specs2]**
* [Cucumber] -  framework do testów akceptacyjnych,
używany podczas *rozwoju opartego o zachowanie* (ang *behavior-driven development*, **[BDD]**),
który stał się *de facto* standardem i został przeportowany dla wielu innych języków programowania
* [Capybara] - narzędzie to testów stron internetowych i aplikacji webowych

Sama składnia języka **[Ruby]** była inspiracją dla języków **[Crystal]** i **[Elixir]**.
Prawdopodobnych następców powolnego Rubiego.

## Podsumowanie
Czy warto uczyć się języka skryptowego i Pythona w szczególności?
Tu nastąpi standardowa odpowiedź w informatyce, *to zależy*.
* Jeśli chcesz zostać *osobą która programuje, ale nie jest to jej głównych zajęciem* to polecam.
* Jeśli jednak chcesz zostać programistą to polecam wcześniej przejrzeć oferty pracy
czy w twojej okolicy jest zapotrzebowanie na ten język programowania.
**[Python]** jest aktualnie na trzecim miejscu w rankingu [Tiobe],
ale bardzo możliwe, 
że w twojej okolicy jest więcej ofert na np. programistę języka **[Ruby]**. 

## Postscriptum

Nie lubię języków skryptowych.
Kiedyś lubiłem Perla, ale wyrosłem.
Z języków dynamicznie typowanych interesujący dla mnie jest tylko **[Lisp]**
ze wszystkimi swoimi dialektami (**[Clojure]**, **[Racket]**, **[Scheme]**, **[Common Lisp]**).
Jest coś szalonego w języku, którego zapis jest od razu jego drzewem **[CST]**.

[AWK]:         /posts-by-langs/awk
[Clojure]:     /posts-by-langs/clojure
[Common Lisp]: /posts-by-langs/common-lisp
[Crystal]:     /posts-by-langs/crystal
[Elixir]:      /posts-by-langs/elixir
[Lisp]:        /posts-by-langs/lisp
[Perl]:        /posts-by-langs/perl
[Python]:      /posts-by-langs/python
[Racket]:      /posts-by-langs/racket
[Ruby]:        /posts-by-langs/ruby
[Scheme]:      /posts-by-langs/scheme

[Bash]:        /posts-by-tools/bash 

[ScalaTest]:   /posts-by-libs/scalatest
[Specs2]:      /posts-by-libs/specs2

[BDD]:         /posts-by-tags/bdd
[CST]:         /posts-by-tags/cst
[DSL]:         /posts-by-tags/dsl

[Język skryptowy]: https://pl.wikipedia.org/wiki/J%C4%99zyk_skryptowy
[Tiobe]: https://www.tiobe.com/tiobe-index/

[IEEE]: https://spectrum.ieee.org/at-work/innovation/the-2018-top-programming-languages
[PyCharm]: https://www.jetbrains.com/pycharm/
[virtualenv]: https://pypi.org/project/virtualenv/
[pipenv]: https://pypi.org/project/pipenv/
[pyenv]: https://github.com/pyenv/pyenv
[PyPy]: https://pypy.org/
[Stackless Python]: https://github.com/stackless-dev/stackless/wiki

[Sed]: https://pl.wikipedia.org/wiki/Sed_(program)

[Sinatra]: https://en.wikipedia.org/wiki/Sinatra_(software)
[Scalatra]: https://en.wikipedia.org/wiki/Scalatra
[Spark]: https://en.wikipedia.org/wiki/Spark_(software)
[RoR]: https://pl.wikipedia.org/wiki/Ruby_on_Rails
[Play Framework]: https://pl.wikipedia.org/wiki/Play_(framework)
[Phoenix]: https://en.wikipedia.org/wiki/Phoenix_(web_framework)
[RSpec]: https://en.wikipedia.org/wiki/RSpec
[Cucumber]: https://en.wikipedia.org/wiki/Cucumber_(software)
[Capybara]: https://en.wikipedia.org/wiki/Capybara_(software)
