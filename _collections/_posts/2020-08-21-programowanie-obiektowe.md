---
title:    'Programowanie obiektowe'
author:   TheKamilAdam
category: programming
tags:     bullshit
labels:
langs:    
redirect_from:
  - programowanie-obiektowe
  - programming/programowanie-obiektowe
---

**Programowanie obiektowe** paradygmat 
* Abstrakcja
* Hermetyzacja
* Polimorfizm
* Dziedziczenie


Istnieje pewna różnica zdań co do tego, jakie cechy języków programowania czynią je obiektowymi. 
Powszechnie uważa się, że najważniejsze są następujące cechy:

[Abstrakcja]
> Każdy obiekt w systemie służy jako model abstrakcyjnego „wykonawcy”,
który może wykonywać pracę, opisywać i zmieniać swój stan oraz komunikować się z innymi obiektami w systemie bez ujawniania, 
w jaki sposób zaimplementowano dane cechy. 
Procesy, funkcje lub metody mogą być również abstrahowane,
a kiedy tak się dzieje, konieczne są rozmaite techniki rozszerzania abstrakcji.

[Hermetyzacja]
> Czyli ukrywanie implementacji, enkapsulacja. 
Zapewnia, że obiekt nie może zmieniać stanu wewnętrznego innych obiektów w nieoczekiwany sposób. 
Tylko własne metody obiektu są uprawnione do zmiany jego stanu. 
Każdy typ obiektu prezentuje innym obiektom swój interfejs, 
który określa dopuszczalne metody współpracy. 
Pewne języki osłabiają to założenie, dopuszczając pewien poziom bezpośredniego (kontrolowanego) dostępu do „wnętrzności” obiektu. 
Ograniczają w ten sposób poziom abstrakcji. 
Przykładowo w niektórych kompilatorach języka C++ istnieje możliwość tymczasowego wyłączenia mechanizmu enkapsulacji; 
otwiera to dostęp do wszystkich pól i metod prywatnych, ułatwiając programistom pracę nad pośrednimi etapami tworzenia kodu i znajdowaniem błędów.

[Polimorfizm]
> Referencje i kolekcje obiektów mogą dotyczyć obiektów różnego typu, 
a wywołanie metody dla referencji spowoduje zachowanie odpowiednie dla pełnego typu obiektu wywoływanego. 
Jeśli dzieje się to w czasie działania programu, 
to nazywa się to późnym wiązaniem lub wiązaniem dynamicznym. 
Niektóre języki udostępniają bardziej statyczne (w trakcie kompilacji) rozwiązania polimorfizmu – na przykład szablony i przeciążanie operatorów w C++.

[Dziedziczenie]
> Porządkuje i wspomaga polimorfizm i enkapsulację dzięki umożliwieniu definiowania i tworzenia specjalizowanych obiektów na podstawie bardziej ogólnych. 
Dla obiektów specjalizowanych nie trzeba redefiniować całej funkcjonalności, 
lecz tylko tę, której nie ma obiekt ogólniejszy. 
W typowym przypadku powstają grupy obiektów zwane klasami, oraz grupy klas zwane drzewami. 
Odzwierciedlają one wspólne cechy obiektów.







## Abstrakcja





funkcja, moduł pakiet, fasada, API


Klasy
alternatywy
* Prototypy
* Aktorzy

## Hermetyzacja


### Hermetyzacja problemy
* Serwisy i Encje - Anemiczny model dziedziny (ang. [Anemic domain model])
* [Odwiedzający] (ang. [Visitor pattern]) - próba implementacji podwójnego wywoływania
* [Pamiątka] (ang. [Memento pattern])







## Polimorfizm 

Za anglojęzyczną wikipedią <https://en.wikipedia.org/wiki/Polymorphism_(computer_science)>

### Polimorfizm parametryczny [Parametric polymorphism]

> Parametric polymorphism: when one or more types are not specified by name but by abstract symbols that can represent any type.

Tylko języków statycznie typowanych.

Wymyślony w 1975 roku dla języka programowania **[Meta Language]**,
który miał być statycznie typowaną wersją jezyka **[LISP]**. 

Rozróżnia się dla rodzaj polimorfizmu parametrycznego
* opartego na szablonach w C++ i D - kod jest generowany
* opartego na typach uogólnionych  (ang. generic types) - 

Higher-kinded polymorphism

### [Polimorfizm ad hoc] (ang. [Ad hoc polymorphism])

> Ad hoc polymorphism: defines a common interface for an arbitrary set of individually specified types.

Wymyślony w roku 1968 dla jezyka programowania **Algol 68**.

W językach statycznie typowanych jest rozwiązywany podczas kompilacji i dzieli się na:
* [przeciążanie funkcji] (ang. [function overloading]) 
* [przeciązanie operatorów] (ang. [operator overloading])

W językach dynamicznie typowanych jest rozwiązywany podczas działania aplikacji.
Dzięki czemu jest o wiele potężniejszym mechanizmem.
W rodzinie języków **[LISP]** jest nazywany multimetodą

 multimetody (ang. multimethods) lub  (ang. multiple dispatch) **[Lisp]**, **[Common Lisp]**, **[Clojure]**, **[Scheme]**


### [Row polymorphism] Ducktyping
* Strukturalny (*Ducktyping*) - typy są zgodne jeśli mają taki sam zestaw metod
Dla języków: 
  * dynamicznie typowane jak **[Perl]**, **[Python]**, jako główny sposób polimorfizmu
  
  
### [Row polymorphism] Strukturalny
  * **[TypeScript]**, **[Go]** - 
  * statycznie typowane jak **[Scala]** lub **[Pony]**  - jako pomocniczny sposób polimorfizmu



### [Podtypowanie] (ang. [Subtyping])

> Subtyping (also called subtype polymorphism or inclusion polymorphism): when a name denotes instances of many different classes related by some common superclass.[3]

protokoły, interfejsy, klasy czysto absrtrakcyjne

polimorfizm inkluzyjny

### [Polytypism]

* type classy - 
Dla:
  * języka **[Haskell]** - jedyny główny sposób polimorfizmu
  * **[Scala]**, **[Kotlin]**, za pomocą bibliotek **[Scalaz]**, **[Cats]**, **[ARROW]** - proponowany jako dodatkowy (ad hoc) sposób polimorfizmu


* Overriding with single dispatch
  * Dynamiczny
  * Statyczny
  
## Dziedziczenie

* Kompizycja 
* Interfejsy - zbiór sygnatur metod bez implementacji
* [Domieszki] (ang. [mixin]) i [Cechy]  (ang. [trait])- interfejsy z implementacją

Czym różnią się domieszki od cech?
Trudno powiedzieć.
i różni się to od języka.


Ogólnie w językach programowania jest 
  
[Clojure]: /posts-by-langs/clojure
[Common Lisp]: /posts-by-langs/common-lisp
[Erlang]: /posts-by-langs/erlang  
[Go]: /posts-by-langs/go  
[Haskell]: /posts-by-langs/haskell
[Kotlin]: /posts-by-langs/kotlin
[LISP]: /posts-by-langs/lisp
[Meta Language]: /posts-by-langs/meta-language
[OCaml]: /posts-by-langs/ocaml
[Perl]: /posts-by-langs/perl
[Pony]: /posts-by-langs/pony
[Python]: /posts-by-langs/python
[Scala]: /posts-by-langs/scala
[Typescript]: /posts-by-langs/typescript  
  
[ARROW]: /posts-by-libs/arrow
[Cats]: /posts-by-libs/cats
[Scalaz]: /posts-by-libs/scalaz

[Ad hoc polymorphism]: https://en.wikipedia.org/wiki/Ad_hoc_polymorphism
[Anemic domain model]: https://en.wikipedia.org/wiki/Anemic_domain_model
[Duck typing]: https://en.wikipedia.org/wiki/Duck_typing
[Function overloading]: https://en.wikipedia.org/wiki/Function_overloading
[Generic function]: https://en.wikipedia.org/wiki/Generic_function
[Higher-kinded polymorphism]: https://en.wikipedia.org/wiki/Type_class#Higher-kinded_polymorphism
[Memento pattern]: https://en.wikipedia.org/wiki/Memento_pattern
[mixin]: https://en.wikipedia.org/wiki/Mixin
[Operator overloading]: https://en.wikipedia.org/wiki/Operator_overloading
[Parametric polymorphism]:https://en.wikipedia.org/wiki/Parametric_polymorphism
[Polytypism]: https://en.wikipedia.org/wiki/Generic_programming#Functional_languages
[Structural type system]: https://en.wikipedia.org/wiki/Structural_type_system
[Subtyping]: https://en.wikipedia.org/wiki/Subtyping
[Trait]: https://en.wikipedia.org/wiki/Trait_(computer_programming)

[Abstrakcja]: https://pl.wikipedia.org/wiki/Abstrakcja_(programowanie)
[Checha]: https://pl.wikipedia.org/wiki/Cecha_(programowanie_obiektowe)
[Domieszka]: https://pl.wikipedia.org/wiki/Domieszka_(programowanie_obiektowe)
[Interfejs]: https://pl.wikipedia.org/wiki/Interfejs_(programowanie_obiektowe)
[Kompozycja]: https://pl.wikipedia.org/wiki/Agregacja_(programowanie_obiektowe)#Kompozycja

[Odwiedzający]: https://pl.wikipedia.org/wiki/Odwiedzaj%C4%85cy
[Pamiątka]: https://pl.wikipedia.org/wiki/Pami%C4%85tka_(wzorzec_projektowy)
[Przeciążanie funkcji]: https://pl.wikipedia.org/wiki/Przeci%C4%85%C5%BCanie_funkcji
[Przeciążanie operatorów]: https://pl.wikipedia.org/wiki/Przeci%C4%85%C5%BCanie_operator%C3%B3w



[Multimetody]: https://randomseed.pl/pub/poczytaj-mi-clojure/21-polimorfizm/#multimetody