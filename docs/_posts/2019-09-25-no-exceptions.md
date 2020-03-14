---
title:    'No Exceptions - o problemach z wyjątkami'
author:   TheKamilAdam
category: scala-jvm
tags:     no-exceptions monad tco linkchecker
langs:    haskell java ocaml racket scala scheme smalltalk
redirect_from:
  - no-exceptions
  - scala-jvm/no-exception
---

Wyjątki bywają problematyczne, 
ale przez swoich obrońców, są często przedstawiane jako jedna z fundamentalnych części programowania obiektowego.
Co ciekawe wyjątków nie ma w [podstawowych założeniach paradygmatu obiektowego].
Nie ma też nic o wyjątkach w definicji programowania obiektowego podanej przez Alana Kaya, 
lider zespołu tworzącego język **[Smalltalk]** uznawany za twórcę tego terminu.
Za to jest o komunikowaniu się obiektów za pomocą wiadomości.

Dlaczego wyjątki są problematyczne?
Prześledźmy to na przykładzie prostego skryptu do testowania linków w ramach domeny.

## Problem martwych linków

Mam na blogu wiele linków.
Wiem że część z nich jest martwa i prowadzi nigdzie, a ja chciałbym to naprawić.
Niestety nie wiem, które są to linki. 
Więc postanowiłem napisać skrypt, który je wszystkie zagreguje.

Mówiąc skrypt mam na myśli mały program do którego nie warto pisać testów jednostkowych.

## Algorytm działania skryptu

Algorytm działania skryptu jest prosty:
1. Budowanie stanu początkowego - zaczynamy od jednoelementowego zbioru zawierającego URL będący domeną
2. Komunikacja ze światem zewnętrznym - dla każdego URL ze zbioru pobieramy źródło strony. 
   W rezultacie mamy zbiór źródeł stron 
3. Budowa kolejnego stanu - Każde źródło ze zbioru parsujemy w poszukiwaniu linków wewnętrznych.
   W rezultacie mamy zbiór zbiorów linków wewnętrznych.
   Spłaszczamy zbiór zbiorów i zamieniamy linki wewnętrzne na URL
4. Iteracja - Jeśli zbiór jest niepusty skaczemy do kroku 2.

## Pierwsza wersja skryptu, ze standardowymi wyjątkami

> Każda dobra przygoda zaczyna się od `main`

@jarek000000

```scala
object StandardExceptionHyde {

  private val domain = "https://www.writeonly.pl"

  def main(args: Array[String]): Unit = apply().showResult()

  def apply(): AbstractOOState = StandardExceptionState(domain)
}
```
Obiekt singletonowy wydaje się w takiej postaci nie mieć sensu,
ale metoda `apply` przyda się do późniejszych testów wydajności.

### Punkt 1. Budowa stanu początkowego

```scala
trait AbstractOOStateObject {

  final def apply(domain: String): AbstractOOState = fromDomain(new Domain(domain)) |> AbstractOOState.run

  def fromDomain(implicit d: Domain): AbstractOOState
}

object StandardExceptionState extends AbstractOOStateObject {

  override def fromDomain(implicit d: Domain): AbstractOOState = new StandardExceptionState(Urls.fromDomain)
}
```
Na początku jest wywoływana metoda `apply` obiektu singletonowego `StandardExceptionState`.
Obiekt `StandardExceptionState` tworzy stan początkowy w metodzie `fromDomain`, który jest następnie przekazywany do metody `run`.

### Punkt 4. Iteracja czyli rekurencja

W programowaniu imperatywnym uczymy się,
że iteracja jest dobra (bo wydajna),
a rekurencja jest zła (bo niewydajna).
Niestety większość algorytmów jest rekurencyjna.
Dlatego programiści opanowali do perfekcji zamianę algorytmów rekurencyjnych na implementacje iteracyjne.

Matematycy byli sprytniejsi.
Stworzyli funkcyjne języki programowania,
takie jak **[Scheme]**, **[Ocaml]**, **[Haskell]**, **[Racket]**,
w których rekurencja jest tak samo wydajna jak iteracja (czyli jest dobra).

Jednak nie każdy rodzaj rekurencji jest dobry (wydajny).
Ten rodzaj, który jest dobry jest nazywany rekurencja ogonową.
Rekurencja ogonowa (ang. *tail call*) zwana też rekurencją prawostronną, 
jest to odmiana rekurencji,
gdzie ostatnią operacją w funkcji jest wywołanie samej siebie.
Dzięki czemu kompilator może w łatwy sposób przeprowadzić optymalizację (ang. *tail call optimization*, **[TCO]**)

Rekurencji jednak nie należy nadużywać.
Przez autora książki [Java. Programowanie funkcyjne] jest porównywana do instrukcji `goto`.
Jednak czasem rekurencja jest potrzebna bezpośrednio.
Są to te wypadki w których nie znamy ilości iteracji do wykonania,
a posiadamy tylko warunek stopu iteracji.

Tak właśnie jest w obiekcie `AbstractOOState`
```scala
object AbstractOOState {
  @tailrec
  def run(state: AbstractOOState): AbstractOOState = if (state.isEmptyNextInternalUrls) state else run(state.next)
}
```
Metoda `run` jest rekurencyjna, czyli wywołuje samą siebie.
Za każdym razem z nową wersję stanu.
Metoda `isEmptyNextInternalUrls` jest warunkiem stopu.
A adnotacja `tailrec` gwarantuje,
że kompilacja się nie powiedzie,
jeśli rekurencji nie będzie dało się zoptymalizować.

### Punkt 3. Budowa kolejnego stanu

```scala
abstract class AbstractOOState(urls: Urls)(implicit d: Domain) extends State {

  final def next: AbstractOOState = getWrappedUrlSet |> NewUrls.apply |> urls.next |> nextState

  final def getWrappedUrlSet: WrappedUrlSet =
    urls.nextInternalUrls
      .map(impureFunction)
      .flatMap(_.getWrappedUrlSet)

  override final def showResult(): Unit = urls.showResult()

  override final def showStep(): Unit = urls.showStep()

  override final def isEmptyNextInternalUrls: Boolean = urls.isEmptyNextInternalUrls

  def nextState(urls: Urls): AbstractOOState

  def impureFunction: InternalUrlToSourcePage
}

class StandardExceptionState(urls: Urls)(implicit d: Domain) extends AbstractOOState(urls) {

  override def nextState(urls: Urls): AbstractOOState = new StandardExceptionState(urls)

  override def map: InternalUrl => SourcePage = SourcePageFromInternalUrl.apply
}
```

Cały algorytm budowania kolejnego kroku znajduje się w metodzie `next`.
Z czego najważniejszy jest etap pierwszy,
czyli wywołanie metody `getWrappedUrlSet`.
`WrappedUrlSet` to alias dla `Set[WrappedUrl]`.
Na podstawie każdego linka ze zbioru jest pobierane źródło strony.
Następnie każde źródło strony jest parsowane i są wyodrębniane nowe linki.
Przy okazji jest wykorzystywane to że w Scali zbiory są monadami.

### Pubkt 2. Komunikacja ze światem zewnętrznym, czyli nieczysta funkcja (ang. impure function)

```scala
object SourcePageFromInternalUrl extends InternalUrlToSourcePage {

  def apply(internalUrl: InternalUrl): SourcePage = Source.fromURL(internalUrl.toURL).mkString |> SourcePage.apply
}

  type InternalUrlToSourcePage = InternalUrlTo[SourcePage]
  
  type InternalUrlTo[A] = InternalUrl => A
```

Funkcja `HtmlFromInternalRef` pobiera źródło strony na podstawie linku.
Jest jedynym miejscem,
gdzie łączymy się ze światem zewnętrznym.
Jest to też jedyne miejsce w kodzie,
gdzie spodziewamy się wyjątku.
A skoro coś złego może się wydarzyć to na pewno się wydarzy.

### Wynik

Po uruchomieniu obiektu singletonowego `StandardExceptionHyde` szybko w konsoli pojawi się Stacktrace:

```log
Exception in thread "main" java.nio.charset.MalformedInputException: Input length = 1
	at java.nio.charset.CoderResult.throwException(CoderResult.java:281)
	at sun.nio.cs.StreamDecoder.implRead(StreamDecoder.java:339)
	at sun.nio.cs.StreamDecoder.read(StreamDecoder.java:178)
	at java.io.InputStreamReader.read(InputStreamReader.java:184)
	at java.io.BufferedReader.read1(BufferedReader.java:210)
	at java.io.BufferedReader.read(BufferedReader.java:286)
	at java.io.Reader.read(Reader.java:140)
	at scala.io.BufferedSource.mkString(BufferedSource.scala:98)
	at pl.writeonly.scala.hyde.htmlpage.oo.SourcePageFromInternalUrl$.apply(SourcePageFromInternalUrl.scala:11)
	at pl.writeonly.scala.hyde.impl.oo.oo1.StandardExceptionState.$anonfun$impureFunction$1(StandardExceptionState.scala:12)
	at scala.collection.TraversableLike.$anonfun$map$1(TraversableLike.scala:238)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:111)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:110)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:110)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:110)
	at scala.collection.immutable.RedBlackTree$.foreachKey(RedBlackTree.scala:107)
	at scala.collection.immutable.TreeSet.foreach(TreeSet.scala:170)
	at scala.collection.TraversableLike.map(TraversableLike.scala:238)
	at scala.collection.TraversableLike.map$(TraversableLike.scala:231)
	at scala.collection.immutable.TreeSet.scala$collection$SetLike$$super$map(TreeSet.scala:53)
	at scala.collection.SetLike.map(SetLike.scala:104)
	at scala.collection.SetLike.map$(SetLike.scala:104)
	at scala.collection.immutable.TreeSet.map(TreeSet.scala:53)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOState.getWrappedUrlSet(AbstractOOState.scala:18)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOState.next(AbstractOOState.scala:14)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOState$.run(AbstractOOState.scala:34)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOStateObject.$anonfun$apply$1(AbstractOOStateObject.scala:8)
	at scalaz.syntax.IdOps$.$bar$greater$extension(IdOps.scala:13)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOStateObject.apply(AbstractOOStateObject.scala:8)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOStateObject.apply$(AbstractOOStateObject.scala:8)
	at pl.writeonly.scala.hyde.impl.oo.oo1.StandardExceptionState$.apply(StandardExceptionState.scala:15)
	at pl.writeonly.scala.hyde.impl.oo.oo1.StandardExceptionHyde$.apply(StandardExceptionHyde.scala:11)
	at pl.writeonly.scala.hyde.impl.oo.oo1.StandardExceptionHyde$.main(StandardExceptionHyde.scala:9)
	at pl.writeonly.scala.hyde.impl.oo.oo1.StandardExceptionHyde.main(StandardExceptionHyde.scala)
```

Niestety Stacktrace w żaden sposób nie mówi nam dla jakiego URLa wyjątek został rzucony.

### Wrapping Exceptions

Z powyższego Stacktrace'u wynika jedna prosta nauka.
Zwykle nie powinniśmy pozwalać na to by wyjątki rzucone przez zewnętrzny kod,
tj. bibliotekę standardową języka [Java],
przechodziły przez całą aplikację.
O wiele lepszym rozwiązaniem jest owinąć taki wyjątek wpisując do pola `message` parametry wejściowe pomagające rozpoznać powód wyjątku.

```scala
object SourcePageOrThrowExceptionFromInternalUrl extends InternalUrlToSourcePage {

  @SuppressWarnings(Array("org.wartremover.warts.Throw"))
  override def apply(internalUrl: InternalUrl): SourcePage =
    try {
      SourcePageFromInternalUrl(internalUrl)
    } catch {
      case e: RuntimeException   => throw internalUrl.toException(e)
      case e: IOException        => throw internalUrl.toException(e)
      case e: URISyntaxException => throw internalUrl.toException(e)
    }
}
``` 

Czemu ta lista zawiera aż trzy przypadki?
Otóż nie potrafiłem się zdecydować czy używam klasy `java.net.URL` czy `java.net.URI`, a żeby było trudniej:
* konstruktor klasy `java.net.URL` rzuca `MalformedURLException` dziedziczący po `IOException`
* metoda `openStream` klasy `java.net.URL` rzuca `IOException`
* konstruktor klasy `java.net.URI` rzuca `URISyntaxException`
* statyczna metoda  `create`  klasy `java.net.URI` rzuca wyjątek `IllegalArgumentException` dziedziczący po `RuntimeException`

Możnaby łapać zawsze `Exception` po którym dziedziczą wszystkie pozostałe wyjątki, ale w Javie nie jest to zalecane.
Do tego dziwnego zalecenia jeszcze wrócę.

Teraz po uruchomieniu klasy `WrappingExceptionHyde` zobaczymy:

```log
Exception in thread "main" pl.writeonly.scala.hyde.common.url.exception.UrlException: https://www.writeonly.pl/assets/favicon.ico
	at pl.writeonly.scala.hyde.common.url.WrappedUrl.toException(WrappedUrl.scala:20)
	at pl.writeonly.scala.hyde.common.url.typed.InternalUrl.toException(InternalUrl.scala:14)
	at pl.writeonly.scala.hyde.htmlpage.oo.SourcePageOrThrowExceptionFromInternalUrl$.apply(SourcePageOrThrowExceptionFromInternalUrl.scala:17)
	at pl.writeonly.scala.hyde.impl.oo.oo2.WrappingExceptionState.$anonfun$impureFunction$1(WrappingExceptionState.scala:12)
	at scala.collection.TraversableLike.$anonfun$map$1(TraversableLike.scala:238)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:111)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:110)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:110)
	at scala.collection.immutable.RedBlackTree$._foreachKey(RedBlackTree.scala:110)
	at scala.collection.immutable.RedBlackTree$.foreachKey(RedBlackTree.scala:107)
	at scala.collection.immutable.TreeSet.foreach(TreeSet.scala:170)
	at scala.collection.TraversableLike.map(TraversableLike.scala:238)
	at scala.collection.TraversableLike.map$(TraversableLike.scala:231)
	at scala.collection.immutable.TreeSet.scala$collection$SetLike$$super$map(TreeSet.scala:53)
	at scala.collection.SetLike.map(SetLike.scala:104)
	at scala.collection.SetLike.map$(SetLike.scala:104)
	at scala.collection.immutable.TreeSet.map(TreeSet.scala:53)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOState.getWrappedUrlSet(AbstractOOState.scala:18)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOState.next(AbstractOOState.scala:14)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOState$.run(AbstractOOState.scala:34)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOStateObject.$anonfun$apply$1(AbstractOOStateObject.scala:8)
	at scalaz.syntax.IdOps$.$bar$greater$extension(IdOps.scala:13)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOStateObject.apply(AbstractOOStateObject.scala:8)
	at pl.writeonly.scala.hyde.common.states.oo.AbstractOOStateObject.apply$(AbstractOOStateObject.scala:8)
	at pl.writeonly.scala.hyde.impl.oo.oo2.WrappingExceptionState$.apply(WrappingExceptionState.scala:15)
	at pl.writeonly.scala.hyde.impl.oo.oo2.WrappingExceptionHyde$.apply(WrappingExceptionHyde.scala:11)
	at pl.writeonly.scala.hyde.impl.oo.oo2.WrappingExceptionHyde$.main(WrappingExceptionHyde.scala:9)
	at pl.writeonly.scala.hyde.impl.oo.oo2.WrappingExceptionHyde.main(WrappingExceptionHyde.scala)
Caused by: java.nio.charset.MalformedInputException: Input length = 1
	at java.nio.charset.CoderResult.throwException(CoderResult.java:281)
	at sun.nio.cs.StreamDecoder.implRead(StreamDecoder.java:339)
	at sun.nio.cs.StreamDecoder.read(StreamDecoder.java:178)
	at java.io.InputStreamReader.read(InputStreamReader.java:184)
	at java.io.BufferedReader.read1(BufferedReader.java:210)
	at java.io.BufferedReader.read(BufferedReader.java:286)
	at java.io.Reader.read(Reader.java:140)
	at scala.io.BufferedSource.mkString(BufferedSource.scala:98)
	at pl.writeonly.scala.hyde.htmlpage.oo.SourcePageFromInternalUrl$.apply(SourcePageFromInternalUrl.scala:11)
	at pl.writeonly.scala.hyde.htmlpage.oo.SourcePageOrThrowExceptionFromInternalUrl$.apply(SourcePageOrThrowExceptionFromInternalUrl.scala:14)
	... 25 more
```

Dzięki dodatkowym informacjom zawartym w polu `message` możemy pracować w sposób interaktywny w pętli:
* Jedno uruchomienie programu
* Jeden złapany wyjątek
* Jeden poprawiony link

### Try No Exception

I wszystko byłoby dobrze gdyby nie to,
że często potrzebujemy raport ze wszystkimi błędami.
Chociażby dlatego, żeby oszacować ilość pracy do zrobienia.
W takim wypadku potrzebujemy konstrukcji,
która pozwoli nam zapisać wyjątek z niedziałania konkretnego linku i iść ze sprawdzeniem dalej, 
nie przerywając głównej pętli programu.

Rozwiązaniem jest tutaj [monada] `Try`. 
Nie powinniśmy się jednak przejmować tym brzydkim słowem na `M` ponieważ ta właściwość nie zostanie tutaj użyta. 

Obiekt singletonowy `Try` ma jedną metodę `apply` pozwalającą konstruować nowe instancje klasy `Try`:
```scala
object Try {
  def apply[T](r: => T): Try[T] =
    try Success(r) catch {
      case NonFatal(e) => Failure(e)
    }
}
```

W tym krótkim kodzie warto zwrócić uwagę na dwie rzeczy.
Po pierwsze metoda `apply` pobiera parametr przez nazwę ([by-name]) dzięki czemu wartość parametru zostanie wyliczona dopiero w konstrukcji `try`.
Po drugie są łapane wszystkie wyjątki za wyjątkiem tych *fatalnych*.
Które wyjątki są fatalne?
To można zobaczyć wewnątrz obiektu singletonowego `NonFatal`:
```scala
object NonFatal {
   def apply(t: Throwable): Boolean = t match {
     case _: VirtualMachineError | _: ThreadDeath | _: InterruptedException | _: LinkageError | _: ControlThrowable => false
     case _ => true
   }
// ...
}
```
Otóż łapane są nie tylko wszystkie wyjątki,
ale także spora część błędów,
czyli klas dziedziczących po klasie `Error`.
Zupełnie inaczej niż zwykle zleca się w świecie Javy.

Teraz gdy już wiemy jak działa monada `Try` możemy napisać nową wersję funkcji do pobierania dokumentu HTML:
```scala
object SourcePageTryFromInternalUrl extends InternalUrlTo[SourcePageTry] {

  def apply(internalUrl: InternalUrl): SourcePageTry = Try { internalUrl |> SourcePageFromInternalUrl.apply }
}

type SourcePageTry = Try[SourcePage]
```

Ten kod nigdy nie rzuci wyjątku, za to zamiast prostej wartości `SourcePageTry` dostaniemy `Try[SourcePage]`.

Teraz już możemy napisać algorytm przetwarzania zbioru `Try[SourcePage]` na zbiór nowych linków do odwiedzenia.

```scala
class TryState(data: UrlsWithThrowableList)(implicit d: Domain) extends AbstractAPIState(data) with AbstractFunctionState {

  override def nextState(data: UrlsWithThrowableList): AbstractNextState = new TryState(data)

  override def impureFunction: HPFromInternalUrl = SourcePageTryFromInternalUrl.apply

  override type HP = SourcePageTry

  def nextData(set: SourcePageTrySet): UrlsWithThrowableList = {

    val partitioned = set.partition(_.isSuccess)

    val newWrappedUrls: WrappedUrlSet = partitioned._1
      .flatMap(TryState.sourcePageTryToWrappedUrlSet)

    val newThrowableList: ThrowableList = partitioned._2.toList
      .flatMap(_.failed.toOption.toList)

    val newUrls = NewUrls(newWrappedUrls)

    data.next(newUrls, newThrowableList)
  }
}

object TryState extends AbstractNextStateObject {

  override def fromDomain(implicit d: Domain): AbstractNextState = new TryState(UrlsWithThrowableList.fromDomain)

  val sourcePageTryToWrappedUrlSet: SourcePageTry => WrappedUrlSet = _.map(_.getWrappedUrlSet).toOption.toSet.flatten
}

trait AbstractNextStateObject {

  final def apply(domain: String): AbstractNextState = fromDomain(new Domain(domain)) |> AbstractNextState.run

  def fromDomain(implicit d: Domain): AbstractNextState
}
```

Przy czym najważniejsza jest tutaj metoda `nextData`, która:
* Najpierw dzielimy zbiór pobranych dokumentów SourcePage na krotkę `partitioned` na wartości poprawne (`Success`) i niepoprawne (`Failure`)
* Następnie na podstawie poprawnych wartości budujemy zmienną `newWrappedUrls` zawierający nowe linki wewnętrzne 
* Z drugiej części krotki tworzymy zmienną `newThrowableList` będącą listą wszystkich niepoprawnych linków
* Na podstawie otrzymanych danych tworzymy nowy stan, który zwracamy

## Podsumowanie - trzy nauki o wyjątkach

1. No Three-Part Exceptions
2. No Checked Exceptions
3. No Exceptions

A na poważnie: 
* **Żadnych cudzych wyjątków - cudze wyjątki nie zawierają kontekstu**.
Każdy wyjątek należy opakować i dodać jak najwięcej informacji z kontekstu dlaczego został rzucony
* **Żadnych weryfikowalnych wyjątków - wyjątki niszczą interfejs**.
Należy rzucać tylko wyjątki dziedziczące po RuntimeException.
W Scali ten punkt nie jest problemem, ponieważ w Scali wszystkie wyjątki są `unchecked`.
* **Żadnych wyjątków - wyjątki nie są funkcyjne**.
Jeśli tylko to możliwe zamiast wyjątków należy używać klas
`Option`, `Validation`, `Either`, `Try`.

Kod jest dostępny na [Githubie](https://github.com/writeonly/linkchecker/tree/v1.0).

[haskell]:       /posts-by-langs/haskell
[java]:          /posts-by-langs/java
[ocaml]:         /posts-by-langs/ocaml
[racket]:        /posts-by-langs/racket
[scala]:         /posts-by-langs/scala
[scheme]:        /posts-by-langs/scheme
[smalltalk]:     /posts-by-langs/smalltalk

[linkchecker]:   /posts-by-tags/linkchecker
[no-exceptions]: /posts-by-tags/no-exceptions
[TCO]:           /posts-by-tags/tco

[Java. Programowanie funkcyjne]: /read-books/java-programowanie-funkcyjne

[podstawowych założeniach paradygmatu obiektowego]: https://pl.wikipedia.org/wiki/Programowanie_obiektowe#Podstawowe_za%C5%82o%C5%BCenia_paradygmatu_obiektowego

[by-name]: https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_name
