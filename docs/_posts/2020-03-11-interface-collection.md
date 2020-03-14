---
title:    'java.util vs vavr - problem z typami generycznymi w metodzie Collection::remove'
author:   TheKamilAdam
category: java
tags:     collection interface immutable fp
langs:    java kotlin scala
libs:     vavr vavr-kotlin
redirect_from:
  - java-util-vs-vavr
  - java/java-util-vs-vavr
---

## Problem
Niedawno na [4programers.net](https://4programmers.net/Forum/Java/337090-spring_dao) pojawiło się pytanie,
gdzie ostatecznie problemem była niedoskonałość metody `Collection<E>::remove(Object)` ze standardowej biblioteki Javy.

Cały problem można sprowadzić do przykładu:

```java
import java.util.*;

public class ImmutableLists {
    public static void main(String[] args) {
      
      final var immutableList = List.of("java", "util", "sucks");

      final var result0 = immutableList.remove(0);
      System.out.println(result0);

      final var result1 = immutableList.remove(Integer.valueOf(0));
      System.out.println(result1);
    }
}
```

Ok, nie można.
Jeśli spróbujecie uruchomić powyższy kod to walnie was w twarz wyjątek `UnsupportedOperationException`, 
ponieważ **[Java]** ma upośledzone kolekcje niemutowalne:

```bash
Exception in thread "main" java.lang.UnsupportedOperationException
	at java.base/java.util.ImmutableCollections.uoe(ImmutableCollections.java:71)
	at java.base/java.util.ImmutableCollections$AbstractImmutableList.remove(ImmutableCollections.java:107)
	at WriteOnly.main(WriteOnly.java:9)
```

Dlatego trzeba ten przykład przepisać na kod:
```java
import java.util.*;

public class MutableLists {
    public static void main(String[] args) {
      
      final var immutableList = List.of("java", "util", "sucks");

      final var mutableList0 = new ArrayList(immutableList);
      final var result0 = mutableList0.remove(0);
      System.out.println(result0);

      final var mutableList1 = new ArrayList(immutableList);
      final var result1 = mutableList1.remove(Integer.valueOf(0));
      System.out.println(result1);
    }
}
```

## Analiza 

Dawno temu,
w odległej przeszłości,
w **[Java]** nie było typów parametrycznych zwanych w Javie typami generycznymi lub skrótowo generykami.
Smród tego ciągnie się po dziś dzień.
W rezultacie metoda `Object::equals(Object)` nie jest generyczna.
Co jest totalnie bez sensu,
bo to że `"1"` nie będzie równe `Integer.valueOf(1)` widać już na etapie kompilacji i nie ma sensu w tym celu włączać w ogóle JVMa.
Pisałem już o tym w [no universal equality]

Także w  interface `Collection`, który jest rozszerzany np. przez interface `List`,
istnieją niegeneryczne metody jak `Collection<E>::remove(Object)` i `Collection<E>::contains(Object)`.
Ale już np. metoda `Collection<E>::add(E)` jest generyczna.
Wydaje się to pełną losówką,
ale stał za tym sprytny marketing kompatybilności wstecznej próbujący przekonać jak najwięcej ludzi do nowej wtedy Javy 5.
Z tych samych powodów marketingowych zwanych kompatybilnością wsteczną nie poprawiono tego do czasów współczesnych.
Dodatkowo dochodzi do tego to,
że metoda usuwająca element z listy po wartości elementu (`Collection<E>::remove(Object)`)
nazywa się dokładnie tak samo jak metoda usuwająca element z listy po indeksie (`Collection<E>::remove(int)`)
Razem prowadzi to do powyższych patologii,
czyli że metoda działa w zupełnie inny sposób dla typu `Integer`, a w innny dla `int`. 

## Rozwiązanie

Rozwiązaniem jest porzucenie bezsensownych kolekcji z standardowej biblioteki Javy i użycie biblioteki [vavr].

Przy użyciu biblioteki [vavr] kod wygląda następująco:
```java
import java.io.vavr.collection.*;

public class VavrLists {
    public static void main(String[] args) {
      
      final var immutableList = List.of("Vavr", "is", "awesome");

      final var result0 = immutableList.removeAt(0);
      System.out.println(result0);

      final var result1 = immutableList.remove(Integer.valueOf(0));
      System.out.println(result1);
    }
}
```
Jego największą zaletą jest to,
że się nawet nie skompiluje.
A to wszystko dlatego,
że kolekcje z biblioteki [vavr] używają typów generycznych wszędzie gdzie jest to potrzebne,
a nie tylko tam gdzie pozwolili ludzie od marketingu.

Teraz przepiszmy kod na następujący:

```java
import java.io.vavr.collection.*;

public class VavrLists {
    public static void main(String[] args) {
      
      final var immutableList = List.of("Vavr", "is", "awesome");

      final var result0 = immutableList.removeAt(0);
      System.out.println(result0);

      final var result1 = immutableList.remove("is");
      System.out.println(result1);
    }
}
```
I wszystko działa tak jak należy.

## Podsumowanie

Zalety bibliotek [vavr] jest mnóstwo i aż trudno je zliczyć.
Są to między innymi:
* metoda `List<E>::remove(E)` służąca do usuwania elementu na podstawie wartości elementu jest generyczna 
* istnieje osobna metoda do usuwania elementu po indeksie o nazwie `List<E>::removeAt(int)`
* jest pełne wsparcie dla niemutowalności
* kolekcje z [vavr] są wzorowane na bibliotece standardowej Scali, więc jeśli będziesz kiedyś chcieć nauczyć się Scali będzie Ci łatwiej
* [vavr] wspiera Kotlina za pomocą biblioteki [vavr-kotlin]! (Kotlin nie posiada własnej biblioteki kolekcji co jest moim skromnym zdaniem największą porażką tego języka)

[no universal equality]: /no-universal-equality

[Java]:                  /posts-by-langs/java
[Kotlin]:                /posts-by-langs/kotlin
[Scala]:                 /posts-by-langs/scala

[vavr]:                  /posts-by-libs/vavr
[vavr-kotlin]:           /posts-by-libs/vavr-kotlin

[collection]:            /posts-by-tags/collection
[immutable]:             /posts-by-tags/immutable
[interface]:             /posts-by-tags/interface
