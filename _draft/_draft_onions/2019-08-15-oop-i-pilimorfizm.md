---
title:    'oop i polimorfizm'
author:   TheKamilAdam
category: onions
tags:     node-js clang native llvm monad bytecode
labels:
langs:    
redirect_from:
  - oop-i-polimorfizm

tags: bullshit 

---



## Programowanie Obiektowe, Programowanie Czysto Obiektowe oraz model/system aktorów

### Mainsteamowe Programowanie zorientowane obiektowe
3. [Object-oriented programming](<https://en.wikipedia.org/wiki/Object-oriented_programming>)

  próba roziązania probmemu 
* Abstrakcja
* Hermetyzacja
* Polimorfizm (ad hoc)
* Dziedziczenie


Istnieje pewna różnica zdań co do tego, jakie cechy języków programowania czynią je obiektowymi. Powszechnie uważa się, że najważniejsze są następujące cechy:

Abstrakcja
Każdy obiekt w systemie służy jako model abstrakcyjnego „wykonawcy”, który może wykonywać pracę, opisywać i zmieniać swój stan oraz komunikować się z innymi obiektami w systemie bez ujawniania, w jaki sposób zaimplementowano dane cechy. Procesy, funkcje lub metody mogą być również abstrahowane, a kiedy tak się dzieje, konieczne są rozmaite techniki rozszerzania abstrakcji.

Hermetyzacja
Czyli ukrywanie implementacji, enkapsulacja. Zapewnia, że obiekt nie może zmieniać stanu wewnętrznego innych obiektów w nieoczekiwany sposób. Tylko własne metody obiektu są uprawnione do zmiany jego stanu. Każdy typ obiektu prezentuje innym obiektom swój interfejs, który określa dopuszczalne metody współpracy. Pewne języki osłabiają to założenie, dopuszczając pewien poziom bezpośredniego (kontrolowanego) dostępu do „wnętrzności” obiektu. Ograniczają w ten sposób poziom abstrakcji. Przykładowo w niektórych kompilatorach języka C++ istnieje możliwość tymczasowego wyłączenia mechanizmu enkapsulacji; otwiera to dostęp do wszystkich pól i metod prywatnych, ułatwiając programistom pracę nad pośrednimi etapami tworzenia kodu i znajdowaniem błędów.

Polimorfizm
Referencje i kolekcje obiektów mogą dotyczyć obiektów różnego typu, a wywołanie metody dla referencji spowoduje zachowanie odpowiednie dla pełnego typu obiektu wywoływanego. Jeśli dzieje się to w czasie działania programu, to nazywa się to późnym wiązaniem lub wiązaniem dynamicznym. Niektóre języki udostępniają bardziej statyczne (w trakcie kompilacji) rozwiązania polimorfizmu – na przykład szablony i przeciążanie operatorów w C++.

Dziedziczenie
Porządkuje i wspomaga polimorfizm i enkapsulację dzięki umożliwieniu definiowania i tworzenia specjalizowanych obiektów na podstawie bardziej ogólnych. Dla obiektów specjalizowanych nie trzeba redefiniować całej funkcjonalności, lecz tylko tę, której nie ma obiekt ogólniejszy. W typowym przypadku powstają grupy obiektów zwane klasami, oraz grupy klas zwane drzewami. Odzwierciedlają one wspólne cechy obiektów.







#### Programowanie obiektowe vs programowanie zorientowene obiektowo


#### Mity

Klasy
alternatywy
* Prototypy
* Aktorzy

#### Problemy
* Serwisy i Encje 
* Anemiczny model dziedziny
* Niszczenie hermetyzacji 



### Programowanie czysto obiektowe


 z czego tylko polimorfizm jest wartością dodaną a reszta to bulsheet

prawdziwa obiektowość to smalltalk (wolny) i Ryby (też wolny)


### Abstrakcja

funkcja, moduł pakiet, fasada, API



### Inne sposoby Polimorfizmu ad hoc

* Overriding with single dispatch
  * Dynamiczny
  * Statyczny
* Strukturalny (*Ducktyping*) - typy są zgodne jeśli mają taki sam zestaw metod
Dla języków: 
  * dynamicznie typowane jak **[Perl]**, **[Python]**, **[TypeScript]** - jako główny sposób polimorfizmu
  * statycznie typowane jak **[Scala]** lub **[Pony]**  - jako pomocniczny sposób polimorfizmu
* type classy - 
Dla:
  * języka Haskell - jedyny główny sposób polimorfizmu
  * Scala Kotlin, za pomocą bibliotek Scalaz, Cats, Kt-Arrow - proponowany jako dodatkowy (ad hoc) sposób polimorfizmu
* Przeciązanie metod i operatorów oraz multimetody
  * Przeciążanie metod i operatorów 
  * multimetody - **[Lisp]**, common lisp, clojure
* Polimorfizm parametryczny
  * Szablony
  * klasy, typy, funkcje i metody generyczne

Parametric polymorphism