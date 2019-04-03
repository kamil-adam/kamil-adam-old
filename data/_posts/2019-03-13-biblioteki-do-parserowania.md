---
layout:   post
title:    "Biblioteki do parsowania dla języka Scala"
author:   "writeonly"
category: resentiment
tags:     resentiment scala library utest
labels:   dsl parser lexer parboiled2 fastparse
comments: true
toc:      true
---

## Co to jest parser?

Parser to program dokonujący procesu analizy składniowej na ciągu leksemów (tokenach z typami),
czyli sprawdzeniu ich zgodności z określoną gramatyką formalną.
Wynikiem pracy parsera jest drzewo składniowe (ang. *abstract syntax tree*, *AST*),
na którym są przeprowadzane dalsze operacje.

Programem pomocniczym, często działającym równolegle do parsera, jest lekser. 
Dokonuje on procesu analizy leksykalnej,
czyli dzieli wejściowy tekst na leksemy.

## Po co nam parser?
Parsery są używane do różnych celów:

### Parsowanie danych strukturalnych
* Parsowanie języka programowania - 
jest to pierwsza rzecz jaka nasuwa się na myśl, przynajmniej mi. 
Parsery są pierwszą (wejściową) częścią kompilatora. 
Oczywiście mało prawdopodobne, że będziesz tworzył nowy język programowania. 
Czasem jednak istnieje potrzeba napisania parsera już istniejącego języka, 
gdy np. piszesz własny tool do formatowania kodu.
* Parsowanie z serializowanych danych - 
z serializowane dane można przesyłać i przechowywać w formatach tekstowych takich jak 
JSON, CSV, JSON Lines (połączenie zalet formatów JSON i CSV), XML i wielu innych. 
Ale możliwe, że chciałbyś napisać parser własnego formatu zoptymalizowany pod pewne konkretne wymagania.
Jak np. [Rison](https://github.com/Hronom/jackson-dataformat-rison),
JSON zmodyfikowany w taki sposób by móc go przesyłać bezpośrednio w adresie url.
* Parsowanie konfiguracji - 
teoretycznie każdą konfigurację można zapisać w Javowych plikach Properties lub Jsonie, ewentualnie Yamlu (nadzbiorze Jsona) albo XMLu.
Powstają jednak cały czas nowe formaty dedykowane do przechowywania konfiguracji jak 
[Hocon](<https://github.com/lightbend/config>) ([Shocon](<https://github.com/jvican/stoml>)) 
lub
[Toml](<https://github.com/toml-lang/toml>) ([Stoml](<https://github.com/jvican/stoml>)).
* Parsowanie języka domenowego (ang. *domain-specific language*, *DSL*) -
czasem prosta konfiguracja nie wystarcza i potrzebujemy czegoś więcej.
Jeśli potrzebujesz prostych wyrażeń (np. relacji) wczytywanych z pliku możesz spróbować zaadoptować jeden z języków wyrażeń (ang. *Expression Language*, *EL*) jak 
SpEL,
[MVFLEX Expression Language (MVEL)](<https://github.com/mvel/mvel>), 
[Object-Graph Navigation Language (OGNL)](<https://github.com/apache/commons-ognl>).
Jeśli potrzeba czegoś więcej można użyć jednego z istniejących silników reguł biznesowych.
Problemem jest to że są to wielkie kobyły. 
Jeśli potrzebujemy prostego DSL możliwe że najlepiej będzie zaimplementować go samodzielnie.
 

### Parsowanie danych niestrukturalnych

Tutaj najbardziej znanym zastosowaniem jest przetwarzanie języków naturalnych, 
ale proste parsery mogą być używane do przeszukiwania dowolnych danych tekstowych w celu odnalezienia 
wszystkich adresów mailowych, numerów telefonów i tak dalej. 

## Biblioteki 

W pradawnych czasach parsery pisało się całkowicie ręcznie, były to zwykle parsery zejść rekurencyjnych. 
Zużywały mało pamięci, co było ważne w czasach procesorów ośmiobitowych, ale działały wolno.
Dodatkowo, ponieważ drzewo AST było na bierząco konsumowane, 
utrodniona była wieloetapowa optymalizacja wynikowego kodu
i wynikowy kod także był wolny. 

W ciemnych wiekach średnich parsery generowało się za pomocą narzędzi Yacc i Lex lub podobnych ze zbliżonym interfejsem.
Były one konfigurowane we własnym języku,
podobnym do notacja Backusa-Naura (ang. **Backus-Naur Form**, **BNF**)
oraz generowane przed właściwą kompilacją.

Dziś istnieją biblioteki przy pomocy których można napisać parser o akceptowalnej wydajności.
Dla języka **[Scala](/tags/scala)** są to:

* [Scala Parser Combinators](<https://github.com/scala/scala-parser-combinators>) -
Wspiera Scala.js w wersji 0.6.x.
Biblioteka należała do Scala Standard Library (Standardowa Biblioteka Scali), ale wyleciała do modułów.
Podobno za to, że jest powolna
* [parboiled2](<https://github.com/sirthias/parboiled2>) -
*A macro-based PEG parser generator for Scala 2.10+*
Wspiera Scala.js w wersji 0.6.x.
Podobno najszybszy z parserów w działaniu, ale ma trudną składnię i zgłasza niezrozumiałe błędy
* [FastParse](<http://www.lihaoyi.com/fastparse/>) - 
*Fast to write, Fast running Parsers in Scala*.
Wspiera Scala.js w wersji 0.6.x. 
Wersja FastParse 1.0.0 wspierała Scala Native.

## FastParse w akcji

Prosty parser wyrażeń arytmetycznych zaimplementowany przy pomocy FastParse
```scala
package pl.writeonly.re.shared.calculator

class CalculatorParser {
  def eval(tree: (Int, Seq[(String, Int)])): Int = {
    val (base, ops) = tree
    ops.foldLeft(base) {
      case (left, (op, right)) => evalOp(op, left, right)
    }
  }

  private def evalOp(op: String, left: Int, right: Int): Int = op match {
    case "+" => left + right
    case "-" => left - right
    case "*" => left * right
    case "/" => left / right
  }

  import fastparse.all._

  val number: P[Int] = P(CharIn('0' to '9').rep(1).!.map(_.toInt))
  val parens: P[Int] = P("(" ~/ addSub ~ ")")
  val factor: P[Int] = P(number | parens)

  val divMul: P[Int] = P(factor ~ (CharIn("*/").! ~/ factor).rep).map(eval)
  val addSub: P[Int] = P(divMul ~ (CharIn("+-").! ~/ divMul).rep).map(eval)
  val expr: P[Int] = P(addSub ~ End)
}
```
I proste testy do tego w frameworku **[utest](/tags/utest)**:
```scala
package pl.writeonly.re.shared.calculator

import fastparse.core.Parsed
import utest._

@SuppressWarnings(Array("org.wartremover.warts.Any"))
object CalculatorParserTest extends TestSuite {
  override val tests: Tests = Tests {
    val parser = new CalculatorParser()
    val expr = parser.expr
    "1+1" - {
      val result = expr.parse("1+1")

      assertMatch(result) {
        case Parsed.Success(2, _) =>
      }
    }
    "1+1*" - {
      val result = expr.parse("1+1*")

      assertMatch(result) {
        case _: Parsed.Failure[_, _] =>
      }
    }
  }
}
```

## Podsumowanie

Dzięki bibliotekom do parsowania możliwe jest pisanie parserów w językach ogólnego przeznaczenia jak **[Scala](/tags/scala)**.
Nie są potrzebne dodatkowe narzędzia, ani dodatkowe fazy kompilacji.
Dodatkowo dzięki możliwości dodawania operatorów do składni języka **[Scala](/tags/scala)**,
możliwe jest używanie notacji podobnej do BNF.
