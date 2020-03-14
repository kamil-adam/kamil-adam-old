---
title:    "Statyczna analiza kodu dla języka Scala w SBT - część 1."
author:   TheKamilAdam
category: scala-native
tags:     code-analysis static-code-analysis  
labels:   scalafmt scalariform
langs:    scala
tools:    sbt scalafix
redirect_from:
  - statyczna-analiza-kodu-1
  - scala-native/statyczna-analiza-kodu-1
  - resentiment/statyczna-analiza-kodu-1
  - resentiment/2018/10/24/statyczna-analiza-kodu-1.html
---

> Statyczna analiza programu to analiza oprogramowania komputerowego wykonywanego bez faktycznego uruchamiania programów,
w przeciwieństwie do analizy dynamicznej,
która jest analizą wykonywaną na programach podczas ich wykonywania.

> Termin ten jest zwykle stosowany do analizy wykonywanej przez zautomatyzowane narzędzie,
analiza wykonywana przez człowieka jest nazywana przeglądem kodu.

Za [wikipedią](<https://en.wikipedia.org/wiki/Static_program_analysis>).

Jest to moja ulubiona część konfigurowania projektu,
ponieważ odpowiednio dobrany zestaw wtyczek do statycznej analizy kodu
potrafi znacząco skrócić czas potrzebny do zrobienia przeglądu kodu.


## Wtyczki modyfikujące kod źródłowy

Z powodu ogromu różnego rodzaju wtyczek do statycznej analizy kodu dla języka Scala
w tym poście skupię się tylko na wtyczkach modyfikujących kod źródłowy.

### sbt-scalariform - sbt plugin adding support for source code formatting using Scalariform
[sbt-scalariform](<https://github.com/sbt/sbt-scalariform>)
to wtyczka sbt dodająca obsługę formatowania kodu źródłowego przy użyciu formatera kodu Scalariform

Dodajemy `scalariform`  do pliku `projektu/plugins.sbt`:
```scala
addSbtPlugin("org.scalariform" % "sbt-scalariform" % "1.8.2")
```

Konfiguracja jest możliwa za pomocą:
* zmiennej `scalariformPreferences` w pliku `build.sbt`
* pliku `.scalariform.conf`

Formatowanie kodu jest wykonywane automatycznie podczas kompilacji:

```bash
sbt compile test:compile it:compile
```

### Scalafmt - Code formatter for Scala
[Scalafmt](<https://scalameta.org/scalafmt/>) to formater kodu dla języka Scala.

Dodajemy `scalafmt`  do pliku `projektu/plugins.sbt`:
```scala
addSbtPlugin("com.geirsson" % "sbt-scalafmt" % "1.5.1")
```

Konfiguracja jest możliwa za pomocą pliku `.scalafmt.conf`, np.:
```hocon
style=IntelliJ
maxColumn=80
```

Formatowanie domyślnie nie wykonuje się podczas kompilacji.
Aby sformatować kod należy wykonać:
```bash
sbt scalafmtSbt scalafmt test:scalafmt it:scalafmt
```
Kolejno formatowany jest plik `build.sbt`, kod produkcyjny, testy jednostkowe i testy integracyjne.

Możliwe jest także tylko sprawdzenie czy kod jest sformatowany poprawnie za pomocą polecenia:
```bash
sbt scalafmtSbtCheck scalafmtCheck test:scalafmtCheck it:scalafmtCheck
```

### Scalafix - Refactoring and linting tool for Scala
[Scalafix](<https://scalacenter.github.io/scalafix/>) to narzędzie do analizy statycznej kodu w języku Scala.
Jest to jedyne narzędzie, które potrafi znalezione błędy poprawić.

Dodajemy `scalafix` do pliku `projektu/plugins.sbt`:
```scala
addSbtPlugin("ch.epfl.scala" % "sbt-scalafix" % "0.9.0")
```

W pliku `build.sbt` dodajemy następujące linie:
```scala
  addCompilerPlugin(scalafixSemanticdb)
  scalacOptions ++= Seq(
    //"-Xfatal-warnings",   // it should be disabled for scalafix
     "-Ywarn-adapted-args", // for NoAutoTupling
     "-Ywarn-unused",       // for RemoveUnused
  )
```

Konfiguracja jest możliwa za pomocą pliku `.scalafix.conf`.
Poniższa konfiguracja włącza wszystkie istniejące obecnie reguły:
```hocon
rules = [

// Semantic Rules - Reguły semantyczne
  NoAutoTupling
  RemoveUnused

// Syntactic Rules - Reguły składniowe
  DisableSyntax
  LeakingImplicitClassVal
  NoValInForComprehension
  ProcedureSyntax
]

DisableSyntax.noVars = true
DisableSyntax.noThrows = true
DisableSyntax.noNulls = true
DisableSyntax.noReturns = true
DisableSyntax.noAsInstanceOf = true
DisableSyntax.noIsInstanceOf = true
DisableSyntax.noXml = true
DisableSyntax.noDefaultArgs = true
DisableSyntax.noFinalVal = true
DisableSyntax.noFinalize = true
DisableSyntax.noValPatterns = true
DisableSyntax.noUniversalEquality = true
DisableSyntax.noUniversalEqualityMessage = "== is unsafe since it allows comparing two unrelated types"
DisableSyntax.regex = []
```

Aby naprawić kod należy wykonać:
```bash
sbt scalafix test:scalafix it:scalafix
```
Kolejno naprawiany jest kod produkcyjny, testy jednostkowe i testy integracyjne.


Możliwe jest także tylko sprawdzenie czy kod nie zawiera błędów za pomocą polecenia:
```bash
sbt 'scalafix --check' 'test:scalafix --check' 'it:scalafix --check'
```

## Podsumowanie

Wszystkie wymienione wyżej wtyczki dodałem do projektu
[resentiment](<https://github.com/writeonly/resentiment>).

Na chwilę obecna moje polecenie do zbudowania tego projektu to:
```bash
sbt clean compile test:compile it:compile re/test && \
sbt coverage reJVM/test reJS/test && \
sbt coverageReport
```

Wcześniej jednak powinienem wywołać polecenie refaktoryzującą i formatującą kod:
```bash
sbt scalafix test:scalafix it:scalafix && \
sbt scalafmtSbt scalafmt test:scalafmt it:scalafmt
```

Ewentualnie, gdy robię przegląd kodu mogę sprawdzić czy kod jest poprawny za pomocą polecenia:
```bash
sbt 'scalafix --check' 'test:scalafix --check' 'it:scalafix --check' && \
sbt scalafmtSbtCheck scalafmtCheck test:scalafmtCheck it:scalafmtCheck
```

Niestety ponieważ w testach używam porównania `==`
musiałem zakomentować linię `DisableSyntax.noUniversalEquality` w pliku  `.scalafix.conf`.
Problem ten rozwiąże w następnym poście.
