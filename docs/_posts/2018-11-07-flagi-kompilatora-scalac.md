---
title:    "Flagi kompilatora Scalac"
author:   TheKamilAdam
category: scala-native
tags:     compiler
labels:   scalafix scalac
langs:    perl scala
tools:    sbt scalafix
redirect_from:
  - flagi-kompilatora-scalac
  - scala-native/flagi-kompilatora-scalac
  - resentiment/flagi-kompilatora-scalac
  - resentiment/2018/11/07/flagi-kompilatora-scalac.html
---

Nie bójmy się tego powiedzieć, Scala to nowy **[Perl](/posts-by-langs/perl)**.
I tak jak w Perlu, w Scali obowiązuje zasada TIMTOWTDI (ang. There is more than one way to do it),
czyli "Można to zrobić na różne sposoby".

Jednak z biegiem czasu twórcy języka Scala uznali,
że niektóre sposoby są lepsze od innych i powinna istnieć możliwość wyłączenia gorszych sposobów.
Dodatkowo niektóre funkcjonalności języka są tak inne od tego co do tej pory widzieli programiści języków obiektowych,
że nie powinny być domyślnie włączone.
Oba te warunki, i pewnie jeszcze kilka innych, powodują, że Scalac, **[kompilator](/posts-by-tags/compiler)** języka Scala,
posiada [flagi kompilacji](<https://docs.scala-lang.org/overviews/compiler-options/index.html>).
Dokładniej Scalac posiada ogromną ilość flag kompilacji.

## Rekomendowana lista flag kompilatora

Na szczęście istnieją tacy ludzie jak [tpolecat](<https://github.com/tpolecat>),
który na swoim blogu zebrał listę [rekomendowanych flag kompilatora](https://tpolecat.github.io/2017/04/25/scalac-flags.html)
Są to:
```scala
scalacOptions ++= Seq(
  "-deprecation",                      // Emit warning and location for usages of deprecated APIs.
  "-encoding", "utf-8",                // Specify character encoding used by source files.
  "-explaintypes",                     // Explain type errors in more detail.
  "-feature",                          // Emit warning and location for usages of features that should be imported explicitly.
  "-language:existentials",            // Existential types (besides wildcard types) can be written and inferred
  "-language:experimental.macros",     // Allow macro definition (besides implementation and application)
  "-language:higherKinds",             // Allow higher-kinded types
  "-language:implicitConversions",     // Allow definition of implicit functions called views
  "-unchecked",                        // Enable additional warnings where generated code depends on assumptions.
  "-Xcheckinit",                       // Wrap field accessors to throw an exception on uninitialized access.
  "-Xfatal-warnings",                  // Fail the compilation if there are any warnings.
  "-Xfuture",                          // Turn on future language features.
  "-Xlint:adapted-args",               // Warn if an argument list is modified to match the receiver.
  "-Xlint:by-name-right-associative",  // By-name parameter of right associative operator.
  "-Xlint:constant",                   // Evaluation of a constant arithmetic expression results in an error.
  "-Xlint:delayedinit-select",         // Selecting member of DelayedInit.
  "-Xlint:doc-detached",               // A Scaladoc comment appears to be detached from its element.
  "-Xlint:inaccessible",               // Warn about inaccessible types in method signatures.
  "-Xlint:infer-any",                  // Warn when a type argument is inferred to be `Any`.
  "-Xlint:missing-interpolator",       // A string literal appears to be missing an interpolator id.
  "-Xlint:nullary-override",           // Warn when non-nullary `def f()' overrides nullary `def f'.
  "-Xlint:nullary-unit",               // Warn when nullary methods return Unit.
  "-Xlint:option-implicit",            // Option.apply used implicit view.
  "-Xlint:package-object-classes",     // Class or object defined in package object.
  "-Xlint:poly-implicit-overload",     // Parameterized overloaded implicit methods are not visible as view bounds.
  "-Xlint:private-shadow",             // A private field (or class parameter) shadows a superclass field.
  "-Xlint:stars-align",                // Pattern sequence wildcard must align with sequence component.
  "-Xlint:type-parameter-shadow",      // A local type parameter shadows a type already in scope.
  "-Xlint:unsound-match",              // Pattern match may not be typesafe.
  "-Yno-adapted-args",                 // Do not adapt an argument list (either by inserting () or creating a tuple) to match the receiver.
  "-Ypartial-unification",             // Enable partial unification in type constructor inference
  "-Ywarn-dead-code",                  // Warn when dead code is identified.
  "-Ywarn-extra-implicit",             // Warn when more than one implicit parameter section is defined.
  "-Ywarn-inaccessible",               // Warn about inaccessible types in method signatures.
  "-Ywarn-infer-any",                  // Warn when a type argument is inferred to be `Any`.
  "-Ywarn-nullary-override",           // Warn when non-nullary `def f()' overrides nullary `def f'.
  "-Ywarn-nullary-unit",               // Warn when nullary methods return Unit.
  "-Ywarn-numeric-widen",              // Warn when numerics are widened.
  "-Ywarn-unused:implicits",           // Warn if an implicit parameter is unused.
  "-Ywarn-unused:imports",             // Warn if an import selector is not referenced.
  "-Ywarn-unused:locals",              // Warn if a local definition is unused.
  "-Ywarn-unused:params",              // Warn if a value parameter is unused.
  "-Ywarn-unused:patvars",             // Warn if a variable bound in a pattern is unused.
  "-Ywarn-unused:privates",            // Warn if a private member is unused.
  "-Ywarn-value-discard"               // Warn when non-Unit expression results are unused.
)
```

Lista jest długa i działa dla języka Scala w wersji 2.12.
Jeśli używasz języka Scala w wersji wcześniejszej to część flag będziesz musiał wyłączyć.
Dla wersji 2.11 jest to:
```scala
scalacOptions --= Seq(
  "-Xlint:constant",
  "-Ywarn-extra-implicit",
  "-Ywarn-unused:implicits",
  "-Ywarn-unused:imports",
  "-Ywarn-unused:locals",
  "-Ywarn-unused:params",
  "-Ywarn-unused:patvars",
  "-Ywarn-unused:privates",
)
```

## .. i wtyczka do nich

Lista opcji jest długa i może zaciemniać plik `build.sbt`.
Na szczęście [DavidGregory084](https://github.com/DavidGregory084)
stworzył wtyczkę [sbt-tpolecat](https://github.com/DavidGregory084/sbt-tpolecat)
dodającą flagi kompilatora do projektu.

W pliku ` project/plugins.sbt` dodajemy:
```scala
addSbtPlugin("io.github.davidgregory084" % "sbt-tpolecat" % "0.1.4")
```
i wtyczka automatycznie ustawia odpowiednie flagi dla wersji 2.10/2.11/2.12/2.13

## Portable Scala & Multi-project

Jeśli kompilujesz projekt w Scali na różne platformy (JVM/JS/Native)
lub posiadasz [multi-project](<https://www.scala-sbt.org/1.x/docs/Multi-Project.html>),
tak jak ja w projekcie [resentiment](https://github.com/writeonly/resentiment),
to musisz ręcznie dodać flagi dla kompilatora.
Flagi generuje metoda `scalacOptionsFor`, która jako parametr pobiera wersję języka Scala.
Flagi dodajemy do każdego projektu z osobna lub do wydzielonych ustawień jak w moim przypadku:

```scala
val SharedSettings = Seq(
  scalaVersion := "2.11.12",
  scalacOptions ++= scalacOptionsFor(scalaVersion.value),
  // ...
)
```

### ScalaFix i modyfikacja domyślnych flag

Właśnie ustawiliśmy ponad 30 różnych flag,
ale pewnie w niektórych wypadkach chciałbyś zmodyfikować tę listę.
Np. żeby móc używać wtyczki [ScalaFix](/statyczna-analiza-kodu-1.html).

Wtyczka ta wymaga dodania dwóch flag (`-Ywarn-adapted-args`, `-Ywarn-unused"`) oraz usunięcia jednej (`-Xfatal-warnings`).
Dla wygody, flagi przypisuję do zmiennych, a następnie dodaje do `scalacOptions`.
```scala
val ScalaFixScalacOptions = Seq(
  "-Ywarn-adapted-args", // for NoAutoTupling
  "-Ywarn-unused", // for RemoveUnused
)

val ScalaFixScalacOptionsOff = Seq(
  "-Xfatal-warnings",   // it should be disabled for scalafix
)

val SharedSettings = Seq(
  scalaVersion := "2.11.12",
  scalacOptions ++= scalacOptionsFor(scalaVersion.value),
  scalacOptions ++= ScalaFixScalacOptions,
  scalacOptions --= ScalaFixScalacOptionsOff,
  // ...
)
```

W identyczny sposób można włączać i wyłączać każdą inną flagę kompilatora Scalac.
