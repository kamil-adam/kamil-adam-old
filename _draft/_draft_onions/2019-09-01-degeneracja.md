
### Programowanie  



Functional Programming vs. Object Oriented Programming - Andrzej Kopeć (FM #13 - 26.06.2018)



1. ALGOL 58 (1958) - pierwszy proceduralny język programowania.
Język bardzo złożony w swojej składni co utrudnia budowę kompilatora
Jego następcy stają się coraz mają coraz bardziejs komplikowaną skłądnię.
2. Simula (1962) - rozszerzenie ALGOLa o obiektowość, potrzebną do symulacji,
Niestety obiektowość była wtedy zbyt wolna by móc jej używać 
3. Pascal (1970) - Poprawiony, uproszczony i strukturalny ALGOL 
[Edsger Dijkstra] skrytykował goto.
[Niklaus Wirth] rozpoczął walkę z goto przy okazji tworząc wiele języków programowania z czego napjpopularniejszy był Pascal.
Mający goto jak najbardziej.
4. **[Smalltalk]** (1972) - czysto obiektowy (ang. *pure object-oriented*),  
wszystko jest obiektem, niestety wolny i powolny
5. C (1972) - brzydki i prosty język, niestrukturalny, ale szybki.
Czyli język na miarę możliwości tamtych komputerów
6. Objective-C (1984) - próba skrzyżowania czystej obiektowości z SmallTalka z prostą skłądnią i szybkością z C
7. C z Klasami czyli C++ (1985) - dodanie obiektowości do C
8. **[Erlang]** (1986)
   * wiadomości z języka SmallTalk
   * pierwsza implementacja w języku prolog (późniejsze w C z powodów wydajnościowych])
   * składnia z języka prolog
   * zamiast obiektów mamy nietypowanych aktorów którzy udostępniają zachowania (ang. *behavior*) i ukrywają stan.  
9. **[Java]** (1995)
10.**[Ruby]** (1995) - czysto obiektowy.
Według Ruby FAQ składnia jest podobna do Perla, 
a semantyka jest podobna do **[Smalltalk]** i tak jak Smalltalk powolny.
11. **[Scala]** (2004) - język obiektowo funkcyjny -
2007 **[ScalaZ]** - biblioteka dla Scali która robi z tego języka Haskell-Scalę
*z biblioteką **[Akka]** (2009), możliwi generyczni aktorzy i typowani aktorzy 
12. Kotlin (2011) - natywni aktorzy operci na korutynach


Jak widać nie ma tu pięknego rozwoju o którym mówił Uncle Bob.
Raczej okresy rozwoju i upadku 


Za każdym raze gdy naukowcy wymyślą coś dobrego przychodzą praktycy i to degenerują
1. Pascal -> C - Język strukturalny został zdegenorawy do szybkiej nakładki na język asemblerowy
2. Smalltalk -> C++ - Język czysto obiektowy został zdegenerowany do  nakładki na język asemblerowy z klasami,
gdzie klasy nie są nawet obiektami
3. Scala -> Kotlin  - rozszeżalny worek na featchery został przycięty do małego szybkokompilującego się worka
