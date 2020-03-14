---
title:    'No Exceptions - IO, królowa monad'
author:   TheKamilAdam
category: scala-jvm
tags:     alias api applicative for-comprehension io monad no-exceptions task
langs:    scala haskell
tools:    clang
libs:     scalaz zio
redirect_from:
  - no-exceptions-io
  - scala-jvm/no-exceptions-io
---

Czasem słyszy się opinie,
że programowanie funkcyjne jest bez sensu,
ponieważ czyste funkcje (ang. *pure functions*) nie pozwalają na pisanie efektów ubocznych.
A przecież każdy działający program potrzebuje efektów ubocznych.
Dla wyjaśnienia efektem ubocznym jest:
* Komunikacja ze światem zewnętrznym, zarówno odczyt jak i zapis
* Komunikacja między wątkami
* Zmienny stan (ang. *mutable state*) i zmienne kolekcje (ang. *mutable collections*)

Wszystkich tych rzeczy można używać w czystofunkcyjnych językach programowania, takich jak **[Haskell]**.
Trzeba tylko je opakować w odpowiednią monadę.
Najczęściej monadą to jest `IO`.
Co ciekawe monada `IO` powstała przypadkiem,
ponieważ twórcy języka **[Haskell]** chcieli stworzyć język programowania,
który maksymalnie odracza w czasie wykonywanie obliczeń.
Jednak przeszkodą były właśnie operacje wejścia/wyjścia (ang. *input/output*)
Rozwiązaniem było użycie monady jako kontekstu do obliczeń.
Stąd też nazwa monady `IO` (ang. *input/output*).

W Scali, dzięki bibliotekom, mamy do wyboru kilka implementacji monady `IO`:
* `scalaz.effect.IO` - pierwotnie należąca do rdzenia biblioteki **[Scalaz]**
* `scalaz.ioeffect.IO` - znajdująca się także poza rdzeniem biblioteki **[Scalaz]**
* `zio.IO` - pochodząca z biblioteki **[ZIO]**

## `scalaz.effect.IO`

Monada `scalaz.effect.IO` pierwotnie należała do `scalaz-core`,
ale obecnie jest przeniesiona do biblioteki `scalaz-effect`. 
Posiada jeden parametr generyczny określający zwracany typ.

Logika programu [linkchecker] pisana przy wykorzystaniu `scalaz.effect.IO` wygląda następująco:
```scala
object IOState {

  def fromDomain(implicit d: Domain): IOState = new IOState(UrlsWithThrowableList.fromDomain)

  def run(state: IOState): IO[ValidationAPIState] =
    if (state.isEmptyNextInternalUrls) IO.apply(state) else state.nextMonad.flatMap(run)

  private def sequence(set: Set[IO[SourcePageValidation]]): IO[SourcePageValidationSet] =
    set
      .foldLeft(IO.apply(Set.empty[SourcePageValidation])) { (b, a) =>
        for {
          bb <- b
          aa <- a
        } yield bb + aa
      }
}

class IOState(data: UrlsWithThrowableList)(implicit d: Domain) extends ValidationAPIState(data) {

  override type NextState = IOState

  def nextState(data: UrlsWithThrowableList): IOState = new IOState(data)

  def nextMonad: IO[IOState] = {

    val set: Set[IO[SourcePageValidation]] = data.nextUrls
      .map(SourcePageIOFromInternalUrl.apply)
    val monad: IO[SourcePageValidationSet] = IOState.sequence(set)

    monad.map(newState)
  }
}
```

Niestety nie znalazłem jak w łatwy sposób trawersować typ `C[IO[_]]` na `IO[C[_]]`,
dlatego napisałem to samodzielnie za pomocą **[for comprehension]**.

```scala
object IOApp extends SafeApp {

  private val domain = "https://www.writeonly.pl"

  override def run(args: ImmutableArray[String]): IO[Unit] = applyIO().map(_.showResult())

  def apply(): ValidationAPIState = applyIO().unsafePerformIO()

  def applyIO(): IO[ValidationAPIState] = IOState.fromDomain(new Domain(domain)) |> IOState.run
}
```

Biblioteka dostarcza także cechę `SafeApp` której można przekazać sterowanie.
Dzięki czemu nie trzeba wypakowywać najbardziej zewnętrzne monady za pomocą metody `unsafePerformIO`.
Tutaj jednak nie skorzystałem z tej opcji.

Aktualnie monada `scalaz.effect.IO` jest tylko ciekawostką historyczną ponieważ
została zdeprecjonowane i zastąpiona przez monadę `scalaz.ioeffect.IO`.

## `scalaz.ioeffect.IO` - Monada IO po raz drugi

Monada `scalaz.ioeffect.IO` jest ulepszoną wersję monady  `scalaz.effect.IO` i posiada dwa typy generyczne.
Lewy na wartość niepoprawną, prawy na wartość poprawną.

Logika programu [linkcheckera] nie zmienia się za wiele po zmianie wersji monady `IO`:
```scala
object IO2State {

  def fromDomain(implicit d: Domain): IO2State = new IO2State(UrlsWithThrowableList.fromDomain)

  def run(state: IO2State): ParallelStateIO2 =
    if (state.isEmptyNextInternalUrls) IO.now(state) else state.nextMonad.flatMap(run)

  private def sequence(set: Set[IO[Throwable, SourcePageValidation]]): IO[Throwable, SourcePageValidationSet] =
    set.foldLeft(IO.point[Throwable, SourcePageValidationSet](Set.empty)) {
      (b: IO[Throwable, SourcePageValidationSet], a: IO[Throwable, SourcePageValidation]) =>
        b.flatMap(bb => a.map(aa => bb + aa))
    }
}

class IO2State(data: UrlsWithThrowableList)(implicit d: Domain) extends ValidationAPIState(data) {

  override type NextState = IO2State

  def nextState(data: UrlsWithThrowableList): IO2State = new IO2State(data)

  def nextMonad: IO[Throwable, IO2State] = {

    val set: Set[IO[Throwable, SourcePageValidation]] = data.nextUrls
      .map(SourcePageIO2FromInternalUrl.apply)
    val monad: IO[Throwable, SourcePageValidationSet] = IO2State.sequence(set)

    monad.map(newState)
  }
}
```

Dla tej wersji monady `IO` także nie znalazłem prostej metody trawersowania,
więc napisałem ją za pomocą metod `flatMap` i `map`.

## `scalaz.ioeffect.Task` - Task po raz drugi 

W bibliotece `scalaz-ioeffect` monada `Task` jest tylko aliasem do monady `IO`: 
```scala
  type Task[A] = IO[Throwable, A]
```
Ponieważ w większości przypadków chcemy obsługiwać wszystkie rodzaje błędów jest to bardzo użyteczny alias.

Logika programu [linkcheckera] nie zmienia się za wiele po przepisaniu kodu z monady `IO` na monadę `Task`:
```scala
object Task2State {

  def fromDomain(implicit d: Domain): Task2State = new Task2State(UrlsWithThrowableList.fromDomain)

  def run(state: Task2State): ParallelStateTask2 =
    if (state.isEmptyNextInternalUrls) Task.now(state) else state.nextMonad.flatMap(run)

  private def sequence(set: Set[Task[SourcePageValidation]]): Task[SourcePageValidationSet] =
    set.foldLeft(Task.point[SourcePageValidationSet](Set.empty)) { (b: Task[SourcePageValidationSet], a: Task[SourcePageValidation]) =>
      b.flatMap(bb => a.map(aa => bb + aa))
    }
}

class Task2State(data: UrlsWithThrowableList)(implicit d: Domain) extends ValidationAPIState(data) {

  override type NextState = Task2State

  def nextState(data: UrlsWithThrowableList): Task2State = new Task2State(data)

  def nextMonad: Task[Task2State] = {

    val set: Set[Task[SourcePageValidation]] = data.nextUrls
      .map(SourcePageIO2FromInternalUrl.apply)
    val monad: Task[SourcePageValidationSet] = Task2State.sequence(set)

    monad.map(newState)
  }
}
```

## `zio.IO` - IO po raz trzeci

Monada `IO` z biblioteki ` scalaz-ioeffect` także została zdeprecjonowana.

Czemu powstała kolejna biblioteka?
Dla wielu osób programowanie czysto funkcyjne z biblioteką `scalaz` było odpychające 
z powodu ogromnej ilości typów proponowanych przez tą bibliotekę 
(`Option`, `Maybe`, `Either`, `Disjunction`, `Validation`).
Jest to spowodowane tym,
że biblioteka `scalaz` jest próbą przeniesienia full typowania z języka **[Haskell]**.

Dla kontrastu biblioteka `zio` skupia się na dwóch klasach.
Monadzie `ZIO` oraz klasie `ZManaged`.
I od początku jest ukierunkowana tylko na pisanie czystego kodu bez efektów ubocznych.
Jednocześnie cały czas jest kompatybilna z biblioteką `scalaz`.

Monada `IO` jest zdefiniowana jako alias dla monady `ZIO`:
```scala
type IO[+E, +A]   = ZIO[Any, E, A]
```

Monada `zio.IO` w przeciwieństwie do swoich poprzedników wreszcie posiada metodę `traverse`,
dzięki czemu logika programu [linkchecker] wymaga mniej kodu:
```scala
object IO3State {

  def fromDomain(implicit d: Domain): IO3State = new IO3State(UrlsWithThrowableList.fromDomain)

  @SuppressWarnings(Array("org.wartremover.warts.Any"))
  def run(state: IO3State): ParallelStateIO3 =
    if (state.isEmptyNextInternalUrls) IO.effect(state) else state.nextMonad.flatMap(run)

  private def sequence(set: Set[IO[Throwable, SourcePageValidation]]): IO[Throwable, SourcePageValidationSet] =
    IO.traverse(set)(identity)
      .map(_.toSet)
}

class IO3State(data: UrlsWithThrowableList)(implicit d: Domain) extends ValidationAPIState(data) {

  override type NextState = IO3State

  def nextState(data: UrlsWithThrowableList): IO3State = new IO3State(data)

  def nextMonad: IO[Throwable, IO3State] = {

    val set: Set[IO[Throwable, SourcePageValidation]] = data.nextUrls
      .map(SourcePageIO3FromInternalUrl.apply)
    val monad: IO[Throwable, SourcePageValidationSet] = IO3State.sequence(set)

    monad.map(newState)
  }
}
```

## `zio.Task` - Task po raz trzeci

Kolejny raz monadzie `IO` towarzyszy monada `Task`:
```scala
  type Task[+A]  = ZIO[Any, Throwable, A]
```

I kolejny raz logika [linkchekera] nie zmienia się za wiele po przepisaniu kodu z monady `IO` na monadę `Task`:
```scala
object Task3State {

  def fromDomain(implicit d: Domain): Task3State = new Task3State(UrlsWithThrowableList.fromDomain)

  @SuppressWarnings(Array("org.wartremover.warts.Any"))
  def run(state: Task3State): ParallelStateTask3 =
    if (state.isEmptyNextInternalUrls) IO.effect(state) else state.nextMonad.flatMap(run)

  private def sequence(set: Set[Task[SourcePageValidation]]): Task[SourcePageValidationSet] =
    Task
      .traverse(set)(identity)
      .map(_.toSet)
}

class Task3State(data: UrlsWithThrowableList)(implicit d: Domain) extends ValidationAPIState(data) {

  override type NextState = Task3State

  def nextState(data: UrlsWithThrowableList): Task3State = new Task3State(data)

  def nextMonad: Task[Task3State] = {

    val set: Set[Task[SourcePageValidation]] = data.nextUrls
      .map(SourcePageTask3FromInternalUrl.apply)
    val monad: Task[SourcePageValidationSet] = Task3State.sequence(set)

    monad.map(newState)
  }
}
```

## `zio.UIO` i reszta

Istnieje także więcej aliasów dla monady `ZIO`.
Z czego chwilowo najbardziej użytecznym jest dla mnie `UIO`:
```scala
  type UIO[+A]      = ZIO[Any, Nothing, A]
```

Wynika to z tego,
że i tak w linkcheckerze wszystkie błędy obsługiwałem samodzielnie
oraz niemożliwe było żeby linkchecker zwrócił odpowiedź błędną.

## Podsumowanie

Chociaż **[Scala]** nie była do tego zaprojektowana jako język programowania,
czyste programowanie bez wyjątków jest możliwe za jej pomocą.
Wymaga to jednak dużo samozaparcia i jest trudniejsze niż w językach od początku zaprojektowanych w tym celu jak **[Haskell]** czy **[Eta]**.

Kod jest oczywiście dostępny na [Githubie](https://github.com/writeonly/linkchecker/tree/v4.0).

[eta]:               /posts-by-langs/eta
[haskell]:           /posts-by-langs/haskell
[scala]:             /posts-by-langs/scala

[scalaz]:            /posts-by-libs/scalaz
[zio]:               /posts-by-libs/zio

[api]:               /posts-by-tags/api
[aplikatywem]:       /posts-by-tags/applicative
[aplikatywy]:        /posts-by-tags/applicative
[io]:                /posts-by-tags/io
[for comprehension]: /posts-by-tags/for-comprehension
[linkchecker]:       /posts-by-tags/linkchecker
[monad]:             /posts-by-tags/monad
[monada]:            /posts-by-tags/monad
[monad]:             /posts-by-tags/monad
[monady]:            /posts-by-tags/monad
[no-exceptions]:     /posts-by-tags/no-exceptions
