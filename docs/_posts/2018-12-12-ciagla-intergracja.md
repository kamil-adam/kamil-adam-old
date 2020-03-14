---
title:    "Ciągła integracja, ciągła kontrola, ciągła Scala"
author:   TheKamilAdam
category: scala-native
labels:   coveralls continuous-integration travis-ci
langs:    scala java rust
tools:    clang sbt scala-native ubuntu
libs:
redirect_from:
  - ciagla-intergracja
  - scala-native/ciagla-intergracja
  - resentiment/ciagla-intergracja
  - resentiment/2018/12/12/ciagla-intergracja.html
---

W poprzednich wpisach zbudowaliśmy ogromne polecenie
do analizy statycznej i dynamicznej kodu projektu oraz generacji raportów.
Jednak wykonanie tego polecenia trwa.
A programiści nie lubią czekać.

Istnieje podejrzenie graniczące z pewnością,
że programiści pracujący przy projekcie będą wywoływać polecenie fragmentarycznie,
a całe polecenie tylko przed wysłaniem kodu do repozytorium.
O ile i tego nie zapomną lub zignorują.

W scentralizowanych systemach kontroli wersji takich jak SVN lub CVS
problem ten rozwiązywano za pomocą *hooków* po stronie klienta (tj programisty).
Np. nie można było zrobić *commita*, jeśli kod nie był sformatowany,
a pokrycie kodu testami na odpowiednio wysokim poziomie.
Nie było to jednak dobre rozwiązanie ponieważ każdą walidację po stronie klienta można oszukać, obejść i/lub wyłączyć.

Dziś istnieją zdecentralizowane systemy kontroli wersji jak Git czy Mercurial.
Pozwalają one w łatwy sposób tworzyć *feature branche*,
dzięki czemu kod nie jest wysyłany bezpośrednio do głównej gałęzi repozytorium.
*Feature branche* nie muszą zawierać sformatowanego kodu, nie muszą się nawet kompilować.

Jednocześnie chcielibyśmy mieć pewność, że w momencie łączenia *feature branch* z główną gałęzią repozytorium,
kod zawarty w *feature branchy* działa poprawnie i spełnia standardy zdefiniowane w projekcie.
Rozwiązaniem jest tutaj serwer ciągłej integracji.


## Serwer ciągłej integracji i zamieszanie ze słownictwem

Serwer ciągłej integracji jest to serwer konfigurowany skryptem, zwanym także *pipeline*.
Większość serwerów, w zależności od konfiguracji jest wstanie robić trzy rzeczy:
* ciągłą integrację
* ciągłe dostarczanie
* ciągłe wdrażanie

**Ciągła integracja** (ang. *Continuous Integration*, *CI*) jest to proces,
który powinien wykonać się po każdym *commicie* wysłanym do zdalnego repozytorium kodu źródłowego.
W jego skład wchodzą:
* sprawdzenie poprawności formatowania
* analiza statyczna
* kompilacja
* analiza dynamiczna (testy jednostkowe i integracyjne)
* generowanie raportów

i wszystko inne co zostanie uznane za słuszne dla pojedynczego *commitu*.

**Ciągłe dostarczanie** (ang. *Continuous Delivery*, *CD*) jest to proces,
który powinien wykonać się po każdym *commicie* (zwykle *merge'u*) do gałęzi głównej (np. master/develop).
Składa się ze wszystkich etapów ciągłej integracji plus dodatkowo:
* nadania numeru wersji (głównie w przypadku bibliotek)
* zbudowaniu paczki wykonywalnej (biblioteki, mikroserwisu, aplikacji)
* wdrożeniu na serwer developerski (w przypadku mikroserwisów i aplikacji)
i uruchomieniu testów systemowych oraz akceptacyjnych, a następnie wdrożeniu na serwer testowy/demonstracyjny
* opublikowaniu w repozytorium artefaktów (głównie w przypadku bibliotek)

Oczywiście jest to tylko jedna z wielu wersji procesu.
Możliwe punkty zmiany to np.:
* polityka firmy może zakładać, że numery wersji bibliotek powinny być nadawane ręcznie
* aplikacja jest na tyle duża, że niemożliwością jest uruchamianie wszystkich testów po każdej zmianie

**Ciągłe wdrażanie** (ang. *Continuous Deployment*) jest rozszerzeniem procesu ciągłego dostarczania dla aplikacji
i zawiera tylko jeden dodatkowy punkt, zaufanie. Zaufanie, że:
* aplikacja została odpowiednio przetestowana
* jeśli włączy się alarm, sygnalizujący błąd w aplikacji, to ktoś się nim zajmie

Dodatkowy krok polega na automatycznym wdrażaniu wydanej aplikacji na serwer produkcyjny.

Teoretycznie możnaby wprowadzać podział na serwery CI i serwery CD.
Jednak jeśli z poziomu konfiguracji serwera CI mamy dostęp do basha,
lub możemy pisać wtyczki w innych językach programowania,
to z łatwością możemy zamienić serwer CI w serwer CD.
Łatwo więc zauważyć że granica jest tutaj bardzo płynna.


## Wybór serwera CI/CD

W świecie Javy jeśli ktoś mówi o serwerze CI zwykle ma na myśli Jenkinsa.
Dostępnych jest jednak wiele serwerów ciągłej integracji.
Chcąc jednak jak najszybciej (najprościej) pokazać zalety ciągłej integracji należy wybrać oprogramowanie darmowe
i dodatkowo dostępne jako usługa (ang. *Software as a Service*, *SaaS*).
Dobrze także, aby *po wyjęciu z pudełka* wspierało używane przez nas języki programowania.
Przy takich założeniach wybór padł na dwa serwisy:
* popularniejszy [Travis CI](<https://travis-ci.org/writeonly/resentiment>) używający kontenerów z **[Ubuntu]**
* młodszy [CircleCI](<https://circleci.com/gh/writeonly/resentiment>) używający kontenerów z Debianem

Niestety nie udało mi się skonfigurować CircleCI dla języka **[ScalaNative]**.
Problemem były zależności dla Debiana.

Dodatkowo przydatne są także serwisy agregujące raporty z pokrycia kodu testami.
Ja znalazłem dwa działające jako serwis:
* [Code Coverage Done Right | Codecov](<https://codecov.io/gh/writeonly/resentiment>)
* [Coveralls - Test Coverage History & Statistics](<https://coveralls.io/github/writeonly/resentiment>)

oba są darmowe dla projektów opensource.

## Konfiguracja generowania raportów

Do pliku `project/plugins.sbt` dodajemy dwie wtyczki:
```yaml
addSbtPlugin("org.scoverage" % "sbt-scoverage" % "1.5.1")
addSbtPlugin("org.scoverage" % "sbt-coveralls" % "1.2.7")
```
* [sbt-scoverage](<https://github.com/scoverage/>) umożliwia generowanie raportów z pokrycia kodu testami,
* [sbt-coveralls](<https://github.com/scoverage/sbt-coveralls>) umożliwia wysłanie raportu
do [Coveralls](<https://coveralls.io/>)

## Konfiguracja projektu dla Travis Ci

TravisCi jest konfigurowany za pomocą pliku `.travis.yml`.

Najpierw wybieramy język programowania, jego wersję, wersję Ubuntu oraz wersję maszyny wirtualnej Javy:
```yaml
language: scala
scala: 2.11.12
dist: xenial
jdk: openjdk8
```

Niestety `openjdk-8-jdk` nie jest domyślnie zainstalowane na Ubuntu w wersji `xenial`.
Na szczęście możemy doinstalować potrzebną nam wersję Javy z pakietów Ubuntu.
Pozostałe pakiety są dla ScalaNative
```yaml
addons:
  apt:
    packages:
      - openjdk-8-jdk
      - libunwind-dev
      - libgc-dev
      - libre2-dev
      - clang-6.0
```


Niestety to nie wystarcza i musimy podmienić wersję Javy w zmiennej środowiskowej `PATH`:
```yaml
env:
  global:
    - JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
    - PATH=$JAVA_HOME/bin:$PATH
```

Włączamy cache dla folderów zawierających zależności:
```yaml
cache:
  directories:
    - $HOME/.sbt
    - $HOME/.ivy2/cache
```


Uruchamiamy analizę statyczną i analizę dynamiczną kodu oraz generujemy raport z testów:
```yaml
script:
  - sbt 'scalafix --check' 'test:scalafix --check' 'it:scalafix --check' &&
    sbt scalafmtSbtCheck scalafmtCheck test:scalafmtCheck it:scalafmtCheck &&
    sbt clean re/compile re/test:compile re/it:compile &&
    sbt coverage reJS/test reJVM/test reJS/it:test reJVM/it:test coverageReport &&
    sbt coverageAggregate &&
    sbt scalastyle test:scalastyle it:scalastyle &&
    sbt scapegoat cpd stats
```


Przesyłamy raport do usług agregujących wyniki testów:
```yaml
after_success:
  - sbt coveralls
  - bash <(curl -s https://codecov.io/bash)
```

Pełny plik konfiguracyjny `.travis.yml`:
```yaml
language: scala
scala: 2.11.12
dist: xenial
jdk: openjdk8

addons:
  apt:
    packages:
      - openjdk-8-jdk
      - libunwind-dev
      - libgc-dev
      - libre2-dev
      - clang-6.0

env:
  global:
    - JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
    - PATH=$JAVA_HOME/bin:$PATH

cache:
  directories:
    - $HOME/.ivy2/cache
    - $HOME/.sbt

script:
  - sbt 'scalafix --check' 'test:scalafix --check' 'it:scalafix --check' &&
    sbt scalafmtSbtCheck scalafmtCheck test:scalafmtCheck it:scalafmtCheck &&
    sbt clean re/compile re/test:compile re/it:compile &&
    sbt coverage reJS/test reJVM/test reJS/it:test reJVM/it:test coverageReport &&
    sbt coverageAggregate &&
    sbt scalastyle test:scalastyle it:scalastyle &&
    sbt scapegoat cpd stats

after_success:
  - sbt coveralls
  - bash <(curl -s https://codecov.io/bash)
```

## Podsumowanie

Uważny czytelnik może zauważyć, że nie wywołuje testów dla **[ScalaNative]**.
Mimo zainstalowania wszystkich pakietów wywołanie testów dla ScalaNative kończy się błędem:
```bash
[error] /usr/bin/ld: warning: libunwind.so.8, needed by /usr/bin/../lib/gcc/x86_64-linux-gnu/5.4.0/../../../x86_64-linux-gnu/libunwind-x86_64.so, may conflict with libunwind.so.1
[error] /usr/bin/ld: /home/travis/build/writeonly/resentiment/re/native/target/scala-2.11/native/lib/gc/immix/Heap.c.o: undefined reference to symbol '_Ux86_64_getcontext'
[error] //usr/lib/x86_64-linux-gnu/libunwind.so.8: error adding symbols: DSO missing from command line
[error] clang: error: linker command failed with exit code 1 (use -v to see invocation)
[info] Linking native code (immix gc) (184 ms)
[info] Starting process '/home/travis/build/writeonly/resentiment/re/native/target/scala-2.11/re-out' on port '32951'.
Exception in thread "Thread-386" java.io.IOException: Cannot run program "/home/travis/build/writeonly/resentiment/re/native/target/scala-2.11/re-out": error=2, No such file or directory
	at java.lang.ProcessBuilder.start(ProcessBuilder.java:1048)
	at scala.sys.process.ProcessBuilderImpl$Simple.run(ProcessBuilderImpl.scala:71)
	at scala.sys.process.ProcessBuilderImpl$AbstractBuilder.run(ProcessBuilderImpl.scala:102)
	at scala.sys.process.ProcessBuilderImpl$AbstractBuilder.$anonfun$runBuffered$1(ProcessBuilderImpl.scala:150)
	at scala.runtime.java8.JFunction0$mcI$sp.apply(JFunction0$mcI$sp.java:12)
	at scala.sys.process.ProcessLogger$$anon$1.buffer(ProcessLogger.scala:99)
	at scala.sys.process.ProcessBuilderImpl$AbstractBuilder.runBuffered(ProcessBuilderImpl.scala:150)
	at scala.sys.process.ProcessBuilderImpl$AbstractBuilder.$bang(ProcessBuilderImpl.scala:116)
	at scala.scalanative.testinterface.ComRunner$$anon$1.run(ComRunner.scala:31)
Caused by: java.io.IOException: error=2, No such file or directory
	at java.lang.UNIXProcess.forkAndExec(Native Method)
	at java.lang.UNIXProcess.<init>(UNIXProcess.java:247)
	at java.lang.ProcessImpl.start(ProcessImpl.java:134)
	at java.lang.ProcessBuilder.start(ProcessBuilder.java:1029)
	... 8 more
```

Jest to kolejny problem **[ScalaNative])**. po braku możliwości wygenerowania pokrycia kodu
oraz braku możliwości uruchomienia testów integracyjnych.
Dowodzi to że ScalaNative niestety dalej jest zabawką
i jeśli chce się pisać monady w języku kompilowanym natywnie należy wybrać **[Rust]**.

## Postscriptum

Poszukując serwisów CI natrafiłem na jeszcze jeden termin z kategorii *Continuous cośtam*.

**Ciągła analiza statyczna** (ang. *Continuous static analysis*) jest to proces podobny do ciągłej integracji, ale ograniczony tylko do jednego kroku,
analizy statycznej.
Cechą charakterystyczną serwerów ciągłej analizy statycznej jest posiadanie ogromnej ilości reguł według których sprawdzany jest kod.
Klasycznym przykładem oprogramowania w świecie Javy jest tutaj [SonarQube](<https://www.sonarqube.org/>).
Ja oczywiście poszukiwałem oprogramowania działającego jako darmowa usługa dla projektów opensorsowych i znalazłem:
* [Codacy: Automated code reviews & code analytics](<https://app.codacy.com/project/kamil-adam/resentiment/dashboard>)
* [Rocro INSPECODE - Code review without the hassle.](<https://inspecode.rocro.com/reports/github.com/writeonly/resentiment/branch/master/summary>)

## Postscriptum 2

Termin **ciągła analiza statyczna** ułożyłem sam,
jednak występujący w jego miejscu termin **ciągła kontrola jakości kodu** (ang. *Continuous Inspection of Code Quality*)
jest według mnie zbyt ogólny.

[Rust]:        /posts-by-langs/rust

[Ubuntu]:      /posts-by-tools/ubuntu
[ScalaNative]: /posts-by-tools/scala-native
