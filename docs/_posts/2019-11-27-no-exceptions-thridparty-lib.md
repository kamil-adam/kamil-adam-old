---
title:    'No Exceptions - problemy z biblioteką standardową i biblioteki zewnętrzne'
author:   TheKamilAdam
category: scala-jvm
tags:     api applicative for-comprehension monad no-exceptions
langs:    scala haskell
tools:    clang
libs:     scalaz
redirect_from:
  - no-exceptions-thridparty-lib
  - scala-jvm/no-exceptions-thridparty-lib
---

To jest trzecia część cyklu o walce z wyjątkami w Scali.
Zobacz część [pierwszą](/no-exceptions) i [drugą](/no-exceptions-std-lib).

## Problemy bibliotek standardowych

Biblioteka standardowa Scali nie jest idealna.
Ma swoje problemy.
Ale **[Scala]** jako język programowania nie jest tu wyjątkiem.

Biblioteki standardowe często mają błędy i niedoskonałości.
Twórcy języków mają mało chęci by łamać istniejące **[API]**.
Przykładem może być funkcja [gets](https://pl.wikibooks.org/wiki/C/gets) z języka **[C]** o sygnaturze:
```c
char *gets(char *str);
```
Funkcja nie sprawdza, czy jest miejsce do zapisu w tablicy `str`.
Z tego powodu funkcja ta jest niebezpieczna.
A mogłaby mieć zmienioną sygnaturę na:
```c
char *gets(char *str, int size);
``` 
Co rozwiązałoby problem.
Jednak po wielu latach twórcy standardu **[C]** zamiast poprawić funkcję `gets` stwierdzili,
że wolą ją usunąć.

Co to ma wspólnego ze Scalą?
Otóż niektórzy programiści, 
wiedząc że są marne szanse na naprawę błędów projektowych ze standardowej biblioteki Scali,
napisali własne, poprawione wersje.

Jedną z takich poprawionych wersji biblioteki standardowej Scali jest biblioteka  **[Scalaz]**.
Biblioteka ta jest inspirowana językiem **[Haskell]**.
Język **[Haskell]** jest w pełni funkcyjny.
Ale co ważniejsze jest też, według mnie, w pełni funkcjonalnym językiem.
Co to oznacza?
Że posiada te wszystkie rzeczy,
które są potrzebne,
żeby używać go jako język produkcyjny w korpoaplikacjach,
takie jak statyczne typowanie, polimorfizm i obsługa błędów.
Jednak w języku **[Haskell]** obsługa błędów jest zrobiona za pomocą konstrukcji takich jak **[monady]** i **[aplikatywy]**.

## Disjunction vs Either

Monada `Disjunction` z biblioteki **[Scalaz]** jest lepszą wersję `Either` ze standardowej biblioteki Scali.
I tak jak `Either` posiada dwie podklasy:
```scala
/** A left disjunction
 *
 * Often used to represent the failure case of a result
 */
final case class -\/[+A](a: A) extends (A \/ Nothing)

/** A right disjunction
 *
 * Often used to represent the success case of a result
 */
final case class \/-[+B](b: B) extends (Nothing \/ B)
```
Powyższy kod może wydawać się dziwny,
do momentu gdy nie uświadomimy sobie, 
że klasa `Disjunction` nawet nie istnieje w kodzie biblioteki Scalaz.
`Disjunction` jest tylko aliasem na klasę `\/` 
(czytane jako "Wściekły Zając", ale ja wymawiam to jako "Hail Hydra"):
```scala
  type Disjunction[+A, +B] = \/[A, B]
  val Disjunction = \/
```
No dobrze, po tej informacji dalej jest to dziwne.
Osobiście nie przepadam za nazwami klas składającymi się z samych symboli jak `\/`, `\/-` i `-\/`.

W czym monada `Disjunction` jest lepsza od monady `Either`?
W przypadku monady `Either` rozróżnienie między wartościami `right` i `left` było tylko konwencją.
Powodowało to,
że musieliśmy `explicit` wybierać,
którą wartość chcemy użyć.
W przypadku monady `Disjunction` wartość poprawna jest używana domyślnie.
Jest to przydatne zwłaszcza w konstrukcji [For Comprehensions]

Co do kodu skryptu nie ma tu Rocket Science.
Użycie monady `Disjunction` jest prostsze od `Either` ponieważ domyślnie dla metod `map` i `flatMap` jest używana strona z poprawnym wynikiem.
```scala
abstract class DisjunctionAPIState(data: UrlsWithThrowableList)(implicit d: Domain) extends AbstractAPIState(data) {
  override type HP = SourcePageDisjunction

  def nextData(set: SourcePageDisjunctionSet): UrlsWithThrowableList = {

    val partitioned = set.partition(_.isRight)

    val newWrappedUrls: WrappedUrlSet = partitioned._1
      .flatMap(DisjunctionAPIState.sourcePageDisjunctionToWrappedUrlSet)

    val newThrowableList: ThrowableList = partitioned._2.toList
      .flatMap(_.swap.toOption.toList)

    val newUrls = NewUrls(newWrappedUrls)

    data.next(newUrls, newThrowableList)
  }

}

object DisjunctionAPIState {
  val sourcePageDisjunctionToWrappedUrlSet: SourcePageDisjunction => WrappedUrlSet =
    _.map(_.getWrappedUrlSet).toOption.toSet.flatten
}
```

## Validation vs Disjunction

Klasa `Validation` także posiada dwie podklasy, 
ale w tym przypadku nie mamy dziwnych symboli, 
tylko intuicyjne nazwy:

```scala
final case class Success[A](a: A) extends Validation[Nothing, A]
final case class Failure[E](e: E) extends Validation[E, Nothing]
```

Jaka jest różnica pomiędzy `Disjunction` a `Validation`?
Z technicznego punktu widzenia `Disjunction` jest **[monadą]**, a `Validation` jest tylko **[aplikatywem]**.
Tak, też mi to za dużo nie mówi.
Z logicznego punktu widzenia `Disjunction` przerywa działanie na pierwszym błędzie,
a `Validation` używa się, gdy chce się kumulować błędy np. podczas walidacji danych.
Stąd nazwa klasy.

```scala
abstract class ValidationAPIState(data: UrlsWithThrowableList)(implicit d: Domain) extends AbstractAPIState(data) {
  override type HP = SourcePageValidation

  def nextData(set: SourcePageValidationSet): UrlsWithThrowableList = {

    val partitioned = set.partition(_.isSuccess)

    val newWrappedUrls: WrappedUrlSet = partitioned._1
      .flatMap(ValidationAPIState.sourcePageValidationToWrappedUrlSet)

    val newThrowableList: ThrowableList = partitioned._2.toList
      .flatMap(_.swap.toOption.toList)

    val newUrls = NewUrls(newWrappedUrls)

    data.next(newUrls, newThrowableList)
  }

}

object ValidationAPIState {
  val sourcePageValidationToWrappedUrlSet: SourcePageValidation => WrappedUrlSet =
    _.map(_.getWrappedUrlSet).toOption.toSet.flatten
}
```

Niestety w kodzie tym nie widać przewagi `Validation` nad `Disjunction`,
ponieważ agregację błędów oraz poprawnych wyników robię ręcznie w kodzie.
Myślę że po prostu nie lubię monady `\/` z powodu jej niewymawialnej nazwy.

## Task vs Future

Co jest złego w `Future`?
Po pierwsze nie jest monadą - z tym oczywiście można żyć.
Większość swojego zawodowe życia piszę kod bez monad i on działa i zarabia na siebie i ja zarabiam na siebie.
Więc bez monad na produkcji można żyć.
O wiele większym problemem jest to,
że parametr `implicit ec: ExecutionContext` jest potrzebny do tworzenia i przekształcania konstrukcji `Future`.

Tego problemu nie ma w przypadku monady `Task`.

Monadzie `Task` można łatwo przekazać fragment kodu do wykonania w przyszłości:
```scala
object SourcePageTaskFromInternalUrl {

  def apply(internalUrl: InternalUrl): SourcePageTask =
    Task { internalUrl |> SourcePageValidationFromInternalUrl.apply }
}
```

Także wykonywanie obliczeń i przekształceń na monadzie `Task` nie sprawia problemów:
```scala
object TaskState {

  def apply(domain: String): ParallelStateTask = fromDomain(new Domain(domain)) |> TaskState.run

  def fromDomain(implicit d: Domain): TaskState = new TaskState(UrlsWithThrowableList.fromDomain)

  def run(state: TaskState): Task[ValidationAPIState] =
    if (state.isEmptyNextInternalUrls) Task.now(state) else state.nextMonad.flatMap(run)
}

class TaskState(refsWithThrowable: UrlsWithThrowableList)(implicit d: Domain) extends ValidationAPIState(refsWithThrowable) {

  override type NextState = TaskState

  override def nextState(data: UrlsWithThrowableList): TaskState = new TaskState(data)

  def nextMonad: Task[TaskState] = {

    val set: Set[Task[SourcePageValidation]] = refsWithThrowable.nextUrls
      .map(SourcePageTaskFromInternalUrl.apply)

    val monad: Task[SourcePageValidationSet] = Task
      .gatherUnordered(set.toSeq)
      .map(_.toSet)

    monad.map(newState)
  }

}
```

A kod nie posiada nadmiarowych parametrów `implicit` jest o wiele czystszy i łatwiejszy w utrzymaniu.

## Podsumowanie

Język **[Scala]** posiada rozbudowaną bibliotekę standardową,
ale nie wszystko wewnątrz niej jest idealne.
Dlatego dobrze jest znać alternatywy.
Zwłaszcza,
gdy chodzi o tak trudny temat jak przejrzysta obsługa błędów i programowanie równoległe.
Warto więc na bieżąco obserwować zmiany w ekosystemie Scali.

Kod jest oczywiście dostępny na [Githubie](https://github.com/writeonly/linkchecker/tree/v3.0).

[haskell]:           /posts-by-langs/haskell
[scala]:             /posts-by-langs/scala

[scalaz]:            /posts-by-libs/scalaz

[c]:                 /posts-by-tools/clang

[api]:               /posts-by-tags/api
[aplikatywem]:       /posts-by-tags/applicative
[aplikatywy]:        /posts-by-tags/applicative
[linkchecker]:       /posts-by-tags/linkchecker
[for comprehension]: /posts-by-tags/for-comprehension
[monad]:             /posts-by-tags/monad
[monada]:            /posts-by-tags/monad
[monad]:             /posts-by-tags/monad
[monady]:            /posts-by-tags/monad
[no-exceptions]:     /posts-by-tags/no-exceptions
