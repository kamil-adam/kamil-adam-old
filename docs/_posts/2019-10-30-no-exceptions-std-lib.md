---
title:    'No Exceptions - problemy z wyjątkami i biblioteka standardowa'
author:   TheKamilAdam
category: scala-jvm
tags:     no-exceptions monad io linkchecker
langs:    haskell java rust scala
libs:     vavr
redirect_from:
  - no-exceptions-std-lib
  - scala-jvm/no-exception-std-lib
---

To jest druga część cyklu o walce z wyjątkami w Scali. Zobacz [część pierwszą](/no-exceptions).

## Try vs Either
`Try` nie jest jedynym sposobem w bibliotece standardowej Scali na radzenie sobie z wyjątkami w kodzie.
W ostatnim przykładzie poprzedniej części użyliśmy monady `Try`.
Ogólnie `Try` nie jest zalecane w nowym kodzie.
Chociażby dlatego, że nie możemy zamiast `Throwable` używać bardziej specyficznego błędu.
W naszym przypadku `UrlException`.

Rozwiązaniem jest [monada] `Either`. 
[Monada] `Either` podobnie jak [monada] `Try` posiada dwie wartości.
Jednak w jego przypadku nazywają się one `right` i `left`:
* `right` jest prawa - czyli poprawny
* `left` jest lewa - czyli niepoprawny

Chociaż w przypadku monady `Either` ze standardowej biblioteki Scali jest to głównie tylko konwencja.

```scala
object SourcePageEitherFromInternalUrl extends InternalUrlTo[SourcePageEither] {

  override def apply(internalUrl: InternalUrl): SourcePageEither = applyWithThrowable(internalUrl).left.map(internalUrl.toException)

  private def applyWithThrowable(internalUrl: InternalUrl) = nonFatalCatch either { internalUrl |> SourcePageFromInternalUrl.apply }
}

type SourcePageEither = Either[UrlException, SourcePage]
```

Metoda `nonFatalCatch` z obiektu singletonowego `scala.util.control.Exception` jest ładnym wrapperem na obiekt singletonowy `NonFatal` użyty w poprzedniej części cyklu.

Jaka jest wyższość monady `Either` nad monadą `Try`?
W monadzie `Try` możemy sparametryzować tylko warość poprawną.
W monadzie `Eiher` - także błąd. 

Ogólnie to szkoda, że [monada] `Try` nie jest zdefiniowany jako:
```scala
type Try[A] = Either[Throwable, A]
```
Bo taką funkcję właśnie pełni w kodzie

Reszta kodu po przeróbkach:
```scala
object EitherState extends AbstractNextStateObject {

  override protected def fromDomain(implicit d: Domain): AbstractNextState = new EitherState(UrlsWithThrowableList.fromDomain)
}

class EitherState(data: UrlsWithThrowableList)(implicit d: Domain) extends EitherAPIState(data) with AbstractFunctionState {

  override protected def nextState(data: UrlsWithThrowableList): AbstractNextState = new EitherState(data)

  override protected def impureFunction: HPFromInternalUrl = SourcePageEitherFromInternalUrl.apply
}
```

```scala
abstract class EitherAPIState(data: UrlsWithThrowableList)(implicit d: Domain) extends AbstractAPIState(data) {
  override protected type HP = SourcePageEither

  protected def nextData(set: SourcePageEitherSet): UrlsWithThrowableList = {

    val partitioned = set.partition(_.isRight)

    val newWrappedUrls: WrappedUrlSet = partitioned._1
      .flatMap(EitherAPIState.sourcePageEitherToWrappedUrlSet)

    val newThrowableList: ThrowableList = partitioned._2.toList
      .flatMap(_.left.toOption.toList)

    val newUrls = NewUrls(newWrappedUrls)

    data.next(newUrls, newThrowableList)
  }
}

object EitherAPIState {
  val sourcePageEitherToWrappedUrlSet: SourcePageEither => WrappedUrlSet =
    _.right.map(_.getWrappedUrlSet).right.toOption.toSet.flatten
}
```
Podobnie jak w przypadku `Try` dzielimy listę pobranych źródeł na elementy dobre lub nie,
jednak teraz są to elementy `right` lub `left`.

## Future

Poprzednie wersje skryptu miały jedną bardzo ważną wadę.
Interakcje ze światem zewnętrznym były wykonywane po kolej (sekwencyjnie).
Pobieranie źródła strony jest akcją angażującą urządzenia wejścia-wyjścia (**[IO]**) jest to akcja powolna.
Procesor w tym czasie czeka i nic nie robi.

Można to rozwiązać za pomocą (prawie) monady `Future`.
Jej nazwa pochodzi od tego że wynik dostaniemy w przyszłości, a w międzyczasie procesor może wykonywać inne rzeczy jak:
* budować kolejne monady `Future`
* przeliczać wartości które już otrzymał z monady `Future`

Konstrukcje podobne to `Future` w różnych bibliotekach i językach są zwane także zadaniami (ang. `Task`),
obietnicami (ang. `Promise`) lub po prostu **[IO]**. 

```scala
object SourcePageFutureFromInternalUrl {

  def apply(internalUrl: InternalUrl)(implicit ec: ExecutionContext): SourcePageFuture =
    Future { internalUrl |> SourcePageEitherFromInternalUrl.apply }
}
```

`implicit ec: ExecutionContext` jest potrzebny do tworzenia i przekształcania monady `Future`.

## Short Future

Reszta kodu po dostosowaniu do monady `Future`:

```scala
object EitherBeginState {

  def apply(domain: String)(implicit ec: ExecutionContext): AbstractNextState = fromDomain(new Domain(domain)) |> AbstractNextState.run

  private def fromDomain(domain: Domain)(implicit ec: ExecutionContext): AbstractNextState = fromDomainAllImplicit(domain, ec)

  private def fromDomainAllImplicit(implicit d: Domain, ec: ExecutionContext): AbstractNextState =
    new EitherBeginState(UrlsWithThrowableList.fromDomain)
}

class EitherBeginState(data: UrlsWithThrowableList)(implicit d: Domain, ec: ExecutionContext) extends EitherAPIState(data) with AbstractNewSetState {

  override protected def nextState(data: UrlsWithThrowableList): AbstractNextState = new EitherBeginState(data)

  override protected def newSet: SourcePageEitherSet = {

    val set: Set[Future[SourcePageEither]] = nextUrls
      .map(SourcePageFutureFromInternalUrl.apply)

    val future: Future[SourcePageEitherSet] = Future.sequence(set)

    Await.result(future, 1.minute)
}
```

Metoda `Future.sequence` trawersuje zbiór, 
czyli zbiór monad `Future` zamienia na jedną monadę `Future` zawierającą zbiór.
Następnie metoda `Await.result(future, 1.minute)` wypakowywuje zawartość monady,
czyli oczekuje blokująco maksymalnie jedną minutę aż wszystkie zadania zostaną zakończone.

## Long Future

Ponieważ wypakowywanie monady `Future` jest operacją blokującą powinniśmy odwlec ten moment maksymalnie w czasie.
Niestety tutaj bez zmiany interfejsu można przesunąć tylko jedno mapowanie wyniku:

```scala
object EitherEndState {

  def apply(domain: String)(implicit ec: ExecutionContext): AbstractNextState = fromDomain(new Domain(domain)) |> AbstractNextState.run

  private def fromDomain(domain: Domain)(implicit ec: ExecutionContext): AbstractNextState = fromDomainAllImplicit(domain, ec)

  private def fromDomainAllImplicit(implicit d: Domain, ec: ExecutionContext): AbstractNextState =
    new EitherEndState(UrlsWithThrowableList.fromDomain)
}

class EitherEndState(data: UrlsWithThrowableList)(implicit d: Domain, ec: ExecutionContext) extends EitherAPIState(data) with AbstractNextState {

  override protected def nextState(data: UrlsWithThrowableList): AbstractNextState = new EitherEndState(data)

  override def next: AbstractNextState = {

    val set: Set[Future[SourcePageEither]] = nextUrls
      .map(SourcePageFutureFromInternalUrl.apply)

    val monad: Future[NextState] = Future
      .sequence(set)
      .map(newState)

    Await.result(monad, 1.minute)
  }
}
```

## Future forever

Jak już pisałem monadę `Future` należy wypakowywać jak najpóźniej,
a w idealnym świecie nigdy nie powinniśmy wypakowywać monady `Future`.

Niestety w tym celu musimy porzucić wywołania ogonowe i zadowolić się zwykłą rekurencją
```scala
object FutureState {

  def apply(domain: String)(implicit ec: ExecutionContext): ParallelStateFuture = fromDomain(new Domain(domain)) |> run

  private def fromDomain(domain: Domain)(implicit ec: ExecutionContext): FutureState = fromDomainAllImplicit(domain, ec)

  private def fromDomainAllImplicit(implicit d: Domain, ec: ExecutionContext): FutureState =
    new FutureState(UrlsWithThrowableList.fromDomain)

  private def run(state: FutureState)(implicit executor: ExecutionContext): Future[EitherAPIState] =
    if (state.isEmptyNextInternalUrls) Future.successful(state) else state.nextMonad.flatMap(run)
}

class FutureState(data: UrlsWithThrowableList)(implicit d: Domain, ec: ExecutionContext) extends EitherAPIState(data) {

  override protected def nextState(data: UrlsWithThrowableList): NextState = new FutureState(data)

  override type NextState = FutureState

  def nextMonad: Future[FutureState] = {

    val set: Set[Future[SourcePageEither]] = nextUrls
      .map(SourcePageFutureFromInternalUrl.apply)

    val monad: Future[SourcePageEitherSet] = Future
      .sequence(set)

    monad.map(newState)
  }
}
```

## Podsumowanie

Monady pozwalają nie tylko rozwiązywać problem wyjątków w kodzie,
ale także ułatwiają programowanie asynchroniczne oraz równoległe.

Skąd pewność,
że cokolwiek z tego co tu opisałem ma sens i jest przydatne w codziennej pracy programisty,
a nie jest tylko wymysłem twórców języka **[Haskell]**?
Ponieważ nowoczesny i wysokowydajny natywny język programowania **[Rust]**,
zwany przez twórców językiem systemowym, nie posiada wyjątków.
Dla błędów naprawialnych posiada klasę `Result` będącą odpowiednikiem klasy `Either` ze Scali.
A dla błędów nie naprawialnych posiada makro `panic!` będące odpowiednikiem klasy `Error`,
ale niemożliwej do złapania.
Każde makro `panic!` zabija wątek w którym zostało zastosowane.
Mimo tego **[Rust]** jest szybki jak C i C++.

Monad `Option`, `Either`, `Try` oraz `Future` można używać także w języku programowania **[Java]** za pomocą biblioteki **[vavr]**.

Kod jest oczywiście dostępny na [Githubie](https://github.com/writeonly/linkchecker/tree/v2.0).

[haskell]:       /posts-by-langs/haskell
[java]:          /posts-by-langs/java
[rust]:          /posts-by-langs/rust
[scala]:         /posts-by-langs/scala

[vavr]:          /posts-by-libs/vavr

[io]:            /posts-by-tags/io
[linkchecker]:   /posts-by-tags/linkchecker
[monada]:        /posts-by-tags/monad
[no-exceptions]: /posts-by-tags/no-exceptions
