---
title:    'Kolejny jezyk programowania - języki funkcyjne?'
author:   TheKamilAdam
category: onions
tags:     node-js clang native llvm monad bytecode
labels:
langs:    
redirect_from:
  - jezyki-funkcyjne

tags: bullshit 

---

## Programowanie blokowe
Programowanie blokowe (ang. *[Block](<https://en.wikipedia.org/wiki/Block_(programming)>) programing*):
1. można organizować kod w bloki, 
2. bloki posiadają zasięg leksykalny


## Programowanie proceduralne
Cztery poziomy programowania proceduralnego.
Każdy kolejny zawiera poprzednie w sobie.
1. Można wywoływać nazwane blogi, czyli podprogramy. 
Posiada to np. Basic.
2. Możnwa wywoływać podprogramy z parametrami, czyli procedury. 
Posiadały to już pierwsze wersje języka Fortran.
Parametry procedur i zmienne lokalne w procedurach były alokowane jak normalne zmienne globalne.
Czyli tak jakby wszystkie zmienne miały domyślne słowo `static` z języka C.
3. Można wywoływać nazwane procedury rekurencyjnie. 
Posiada to np. Algol, Pascal, C i prawie wszystkie nowsze języki programowania.
Parametry procedur i zmienne lokalne są alokowane na stosie,
dzięki czemu wartości zmiennych nie nadpisują się podczas rekurencyjnegomwywoływania.
4. Można wywoływać nazwane procedury rekurencyjnie i nie przepełni to stosu.
Prawdopodobnie pierwszy język programowania który to umożliwiał to **[Lisp]**



## Programowanie strukturalne
Programowanie strukturalne (ang. [Structured programming](https://en.wikipedia.org/wiki/Structured_programming)) -
Cztery zasady programowania strukturalnego.
Każdy kolejny zawiera poprzednie w sobie.
1. Nie używanie `goto` - program powinien skłądać się z tylko trzech struktur
   * sekwencji czyli bloku kodu, który ma jedno wejście i jedno wyjście
   * selekcji czyli  kontrukcji - `if`/`else`, `swich`,`match`,`case`.
   * iteracji czyli pętli - `for`, `while`, `until`
2. Nie używanie `conrunie`/`break` - które są ukrytymi `goto`. 
Każda pętla powinna mieć jedno wejście i jedno wyjście.
3. Nie używanie `return` - który także jest ukrytą instrukcją `goto`. 
Każda procedura powinna mieć jedno wejście i jedno wyjście.
Ostatnia wyliczona wartość powinna być zwracana jako wartość podprogramu. 
4. Nie używanie wyjatków - ponieważ niszczą one naturalny sposób przeprływu sterowania
i są tak naprawde nielokalnymi `goto` i ukrytymi wyjściami. 

Prawdopodobnie pierwszym językiem programowania,
który spełniał te trzy zasady jest **[Lisp]** (ponownie). 

### Programowanie funkcyjne



Z definicją funkcyjnego języka programowania jest problem.
Programowanie funkcyjne jest odmianą programowania deklaratywnego.
Może dlatego. że wiele języków niefunkcyjnych się pod nie podszyta.
Dlatego coraz częściejnie imperatywne języki funkcyjne określa się 
czysto funkcyjnymi językami programowania lub deklaratywne 

[Programowanie funkcjne krok po kroku]

* Function as a First class Citizen - możliwość przyjmowania jako argument do funkcji i zwracania z funkcji innych funkcji.
Ma już to większość języków programowania (języki funkcyjno-obiektowe).
Np. w językach programowania Java, Scala, i Kotlin funkcje są obiektami implementującymi interfejs z jedną metodą.  
Miał to już Pascal jako typ proceduralny.
Ma to od początku język C jako wskażniki na *funkcje*. 
Dlatego często dodaje się że funkcja musi być 
Dlatego często dodaje się że musi być możliwość deklaracji funkcji w innej funkcji od razu z możliwości przypisania do zmiennej,
co wyklucza języki Pascal i C.
* Patern Maching - uleprzona i o wiele precyzyjniejsza konstrukcja `switch`.
Z nieznanych dla mnie powodów łączona z programowaniem funkcyjnym,
Faktem jest że posiadają są niektóre języki funkcyjne jak [Erlang] i [Haskell], 
ale są też języki funkcyjne które jej nie posiadają.
* Macros - prawdziwe makra, takie jak są w jęzukach [Lisp], [Rust] lub [Erlang].
Języki obiektowe często ich nie posiadają ponieważ twórcy tych języków uważają że obiektowość rozwiązuje wszystkie problemy.
Z niefunkcyjnych przykłądów prawdopodobnie najbardziej znany jest makra preprocesor z języka C oraz makra z różnego rodzaju asemblerów. 
* Correctness
  * Immutability - niezmienność. 
  Możliwa do używania w niefunkcyjnych językach programowania jeśli posiadają one konstrukcje `const`/`final`. 
  Jednak w językach funkcyjnych niezmienność jest domyślna i trzeba stosować specjalne konstrukcje żeby ją wyłączyć.
  W języch nie funkcyjnych zmienność jest domyślna i trzeba stosować specjalne konstrukcje żeby ją włączyć.
  * Referential Transparency - 
  * Advanced Type Systems - zaawansowane systemy typów 

Correctness pomaga w Concurrency 

Prawdziwa definicja paradygmatu programowanie zorientowane obiektowo (ang. *object-oriented programming*, *OOP*).
* wszystko jest obiektem
* obiekty komunikują się za pomocą wiadomości
* obiekty posiadają włąsną pamięć
* każdy obiekt jest instanjcą klasy, któ©a też jest obiektem
* program jest listą obiektów
* przekazujemy sterowanie do pierwszego obiektu i dalej obeikty komunikują się między sobą za pomocą obiektów
l
Języki które spełniają te warunki to smalltalk, **[Ruby](/posts-by-langs/ruby)**. 
Co ciekawe definicję te w dużej części spełnaiją 
* aktorowe języki programowania jak erlang, elixir
* biblioteki operte o aktory :
  * Akka (dla Scali i Javy)
  * Quazar (dla Kotlina i Javy)
* Agregat w DDD

### Dlaczego uczyć się języków funkcyjnych


Bo [Pragmatyczny programista Od czeladnika do mistrza](<https://helion.pl/ksiazki/pragmatyczny-programista-od-czeladnika-do-mistrza-andrew-hunt-david-thomas,pragpv.htm#format/d>).

Pragmatyczny programista - nauka innych paradykmatów rozwija myślenie

### Jak uczyć się nowych języków programowania?
Warto mieć jeden mały programik, trochę większy niż *Hello Wolrd* i implementować go w wieli językach. 
Np interpreter ezoterycznego języka Brainfuck


## Programowanie funkcyjne i czysto funkcyjne (deklaratywne) 

Rachunek lambda

Początkowo wydawało się że matematycy są wstanie programować komputery.
Jednak komputery są maszynami imperatywnymi, a matematycy myslą w sposób deklaratywny

1. **[Lisp]** (1958) - zaimplementowano rekurencję nierozwalającą stosu, czyli Rekurencja ogonowa
  * CLOS - **[CommonLisp]** (1984) Object System
  * Scheme (1975)
  * Protokoły i meta - **[Clojure]** (2007)
   
2. MetaLanguage (1973)- **[OCaml]** - zaiplementowano Rekurencja ogonowa z typami
3. **[Haskell]** (1990) - zaiplementowano Rekurencja ogonowa z typami i leniwe wyliczanie wyrażeń.
Osiągnięto paradygramt którym myślą matematycy.
4. Idris Agda https://en.wikipedia.org/wiki/Total_functional_programming

Programowanie równoległę
* Pamięć tranzakcyjna
* [programowanie agentowe](https://pl.wikipedia.org/wiki/Programowanie_agentowe)
* Atomy

## imperatywne vs deskryptywne

## semi-Poliglot

* Język obiektowy z funkcjami
* Język funkcyjny z obiektami
* Język funkcyjno-obiektowy który może się stać obiektowo-funkcyjny



[jezyki korporacyjne]: /jezyk-korporacyjny
[jezyki natywne]: /jezyk-natywny
[jezyki skryptowe]: /jezyk-skryptowy

[Smalltalk]: /posts-by-langs/smalltalk
[Squeak]: https://pl.wikipedia.org/wiki/Squeak
[Eiffel]: https://pl.wikipedia.org/wiki/Eiffel_(j%C4%99zyk_programowania)
[Sather]: https://pl.wikipedia.org/wiki/Sather


[Erlang]
[Ruby]
[Scala]
[Kotlin]
[Elixir]
[Crystal] 

[Lisp]: /posts-by-langs/lisp
[CommonLisp]: /posts-by-langs/commonlisp
[Clojure]: /posts-by-langs/clojure
[OCaml]: /posts-by-langs/ocaml
[Haskell]: /posts-by-langs/haskell

[CLOS]: https://pl.wikipedia.org/wiki/Common_Lisp_Object_Systeml
