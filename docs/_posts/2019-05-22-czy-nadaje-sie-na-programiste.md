---
title:    'Czy nadaję się na programistę? Inne możliwości w IT'
author:   TheKamilAdam
category: thoughts
tags:     blog api gui
langs:    perl python ruby
tools:    bash
redirect_from:
  - czy-nadaje-sie-na-programiste
  - thoughts/czy-nadaje-sie-na-programiste
  - thoughts/2019/05/22/czy-nadaje-sie-na-programiste.html
---

Wiele osób pyta "Czy nadaję się na programistę?".
Złośliwi mówią,
że jeśli się pytacie, 
zamiast siedzieć w piwnicy i rozwiązywać tutoriale z programowania,
ewentualnie dopytywać się co jeszcze się nauczyć,
to niestety się nie nadajecie.
Niezłośliwi podają [Test na programistę](<https://www.youtube.com/watch?v=3bul8Z7SZlg>).

Ale niezależnie od wyniku testu nie przejmujcie się!
W IT istnieje wiele innych dobrze płatnych stanowisk,
na które często o wiele łatwiej się dostać,
więc nic straconego.

Zanim omówimy pozostałe często występujące stanowiska w typowej firmie IT jeszcze jedno ważne wprowadzenie. 
Czyli fałszywi przyjaciele języka angielskiego `engineer != inżynier`:
* angielskie *engineer* oznacza po polsku *technika*
* najbliższym odpowiednikiem polskiego 
*inżynier (w znaczeniu tytułu zawodowego)* 
jest 
*[Bachelor of Science](<https://pl.wikipedia.org/wiki/Bachelor_of_Science>)*
czyli dosłownie *licencjat techniczny*.
Tak przynajmniej mam w angielskojęzycznym odpisie dyplomu.

Podsumowując, żeby pracować na stanowisku *cośtam engineer* nie trzeba mieć skończonych studiów technicznych,
ani jakichkolwiek innych.

### Zespół do spraw rozwoju produktu

**Zespoł ds. rozwoju** (ang. *Developer Team*) jest rdzeniem firmy wytwarzającej oprogramowanie.
Bywa nazywany *Zespołem deweloperski* chociaż nie wszystkie osoby wewnątrz tego zespołu to *deweloperzy* 
oraz *zespołem technicznym* chociaż nie wszystkie osoby wewnątrz tego zespołu są techniczne.

Zespół ten jest odpowiedzialny za wytworzenie produktu, 
czyli oprogramowania,
które zostanie sprzedane klientowi.
Klasyczny zespoł ds. rozwoju składa się z trzech rodzajów stanowisk:
* Analityk biznesowy
* Tester
* Programista

#### Analityk biznesowy 

**Analityk biznesowy** (ang. *Business Analyst*, *BA*) 
jest to osoba która zamienia *słowno-muzyczny* opis dostarczony przez klienta *jak ma działać aplikacja* na **Historyjki** (ang. *Stories*).
Historyjki te są zwykle umieszczane w Jirze lub innym narzędziu do zarządzania zadaniami oraz są podstawą do dalszych prac pozostałej części zespołu.


#### Tester

**Tester** na podstawie historyjek opracowanych przez *Analityka biznesowego* przygotowuje **Przypadki testowe** (ang. *Test Cases*).
Różnica między *historyjką* a *przypadkiem testowym* polega na tym, że *historyjka* opisuje funkcjonalność ogólnie bez podania poszczególnych parametrów, 
a *przypadek testowy* zawiera konkretne parametry (przypadki brzegowe, klasy równoważności).
Tak więc jedna *historyjka* może wygenerować wiele *przypadków testowych*.

Ogólnie *testerzy* dzielą się na dwie grupy:
* *Software Quality Control Engineer* - szuka błędów w istniejącym oprogramowaniu,
zwykle *manualnie*,
czyli klikając po aplikacji. 
Dlatego często nazywani są *testerami manualnymi* lub *klikaczami*.
Z racji tego,
że umiejętność klikania posiada prawie każdy stanowisko testera manualnego jest często polecane dla osób które chcą rozpocząć pracę w IT.
* *Software Quality Assurance Engineer* (w skrócie *QA Engineer*) - osoba zapewniająca jakość oprogramowania, 
zwykle poprzez pisanie **automatycznych testów akceptacyjnych** na podstawie *przypadków testowych*.
Dlatego często nazywani są *testerami automatycznymi*

Oczywiście istnieją stanowiska łączące obie funkcje. 
Np. najważniejsze funkcjonalności systemu posiadają testy automatyczne, 
a reszta systemu jest przeklikiwana ręcznie.

Co ciekawe umiejętność pisania dobrych przypadków testowych potrafi być wyżej ceniona niż umiejętność pisania testów akceptacyjnych.

Czasem w ofertach pracy pojawia się stanowisko **Programista testów automatycznych/akceptacyjnych**,
które *de facto* oznacza *QA Engineer*.
Skąd taka nazwa?
Otóż jest to optymalizacja podatkowa polegająca na tym,
że bycie programistą pozwala na stosowanie podwyższonego kosztu uzyskania przychodu, a testerem - nie.


#### Programista

**Programista** (ang. *Software Developer* lub żargonowo *deweloper*) tworzy kod oprogramowania na podstawie *historyjek* dostarczonych przez analityków biznesowych.

*Programista* bywa nazywany w różny sposób:
* **Programista** - taki zwykły
* **Koder** - można powiedzieć, że pojęcie to jest już archaiczne i przestarzałe. 
Prawdopodobnie pochodzi z czasów,
gdy program trzeba było najpierw napisać na kartce,
a potem zakodować na kartach perforowanych.
Obecnie jest używane też jako określenie obraźliwe na *klepacza kodu*, 
programistę, który tylko koduje, a nie myśli. 
* **Inżynier oprogramowania** (ang. *Software Engineer*) - lepszy programista.
Wręcz *programista++*.
Od zwykłego programisty różni się tym, że zna się także na inżynierii wytwarzania oprogramowania, 
co w wielu wypadkach oznaczało,
że wykuł UMLa i umie rozmawiać z klientem. 
Jak pisałem wcześniej, nie trzeba być inżynierem, żeby być *engineer*. 
* **Architekt oprogramowania** (ang. *Software Architect*) - lepszy inżynier oprogramowania,
zna się także na architekturze.
W realnym życiu można spotkać dwa typy architektów.
  * programujący architekt - programista tak dobry, że nie można mu było dać więcej pieniędzy, 
więc dano mu tytuł,
dzięki czemu ma szacun na dzielni.
  * nie programujący architekt - dziwny osobnik, który kiedyś był programistą,
a dziś prawdopodobnie odleciał wysoko i daleko od kodu. Rysuje dzidy w UMLu i programiści go nienawidzą.

#### Mistrz młyna

**Mistrz młyna** (ang. *Scrum Master*, *SM*) nie jest osobą należącą do *zespołu ds. rozwoju*,
ale odpowiadającą za poprawny przepływ pracy w zespole i uczestniczy we wszystkich spotkaniach tego zespołu.
Stanowisko to jest prawdopodobnie najlepiej płatne z nietechnicznych i niekierowniczych stanowisk.
Jednocześnie *SM* jest najbardziej znienawidzoną osobą w zespole/firmie 
i bywa nazywany **B**ardzo **D**zielnym **S**crum **M**asterem. 

Na *Scrum Mastera* są robione szkolenia.

### Właściciel produktu, Kierownik projektu

**Właściciel produktu** (ang. *Product Owner*, *PO*) jest to osoba spoza teamu developerskiego, 
która jest adwokatem klienta.
To ona dostarcza opisów *słowno-muzycznych* jak powinna działać aplikacja, 
które później starają się zrozumieć analitycy biznesowi.
Powinna bardzo dobrze znać dziedzinę biznesu dla której powstaje oprogramowanie, 
żeby móc wyjaśnić *co klient miał na myśli*.
W przeciwnym wypadku staje się tylko niepotrzebnym pośrednikiem między klientem a *zespołem ds. rozwoju produktu*.


Czasem zamiast lub obok *PO* jest jeszcze **Kierownik projektu** (ang. *Project Manager*, *PM*).
Zwykle w firmach typu korpo o niepłaskiej hierarchii.
Jako że jest to stanowisko kierownicze, zwykle trzeba na niego awansować z stanowiska analityka, testera lub programisty.
O takiej osobie mówi się później 
"10 lat pracował jako programista i nie nauczył się programować, więc został awansowany na PM".
 
### Wdrożenie aplikacji
Gdy aplikacja zostanie już napisana trzeba wdrożyć ją u klienta.

Najmniej techniczną osobą pracującą przy wdrożeniu jest *Wdrożeniowiec* lub *Konsultant-Wdrożeniowiec*. 
Jego zadaniem jest jechać do klienta na delegację 
i wdrażać przyszłych użytkowników w działanie aplikacji prowadząc im szkolenia.
Powinna być to osoba która ma dobry kontakt z ludźmi i umie przekazywać wiedzę.    

Wdrożeniem samej aplikacji zajmują się dwa kolejne stanowiska:
* **SysOps Engineer** (ang. *Systems Operations Engineer*) kiedyś nazywany *SysAdmin* (ang. *Systems Administration*) - 
wdraża *manualnie*, albo klikając po aplikacjach, albo wpisując polecenia w terminalu, czasem pisząc skrypty w **[Bashu](/posts-by-tools/bash )**.
* **DevOps Engineer** (ang. *Development and Operations*) często zwany także *Cloud Engineer* jeśli pracuje z chmurą - 
wdraża automatycznie za pomocą skryptów w **[Bashu]**, **[Perlu]**, **[Pythonie]**, **[Ruby]** lub innym języku skryptowym.

W uproszczeniu różnica między *SysOps Engineer* a *DevOps Engineer* jest taka jak między *Testerem manualnym* a *Testerem automatycznym*.
W ostatnim czasie spada zapotrzebowanie na *SysOps Engineerów* a rośnie na *DevOps Engineerów*,
ponieważ z jednej strony aplikacje składają się z coraz większej liczby modułów, 
a z drugiej coraz częściej są wydawane nowe wersja. 


Samo pojęcie *DevOps* nawiązuje do tego że dział wdrażający oprogramowanie (*Operations*) 
powinien ściśle współpracować z działem rozwoju oprogramowania (*Development*).
Co jednak nie zawsze jest możliwe, np. dlatego że klient posiada swój własny dział wdrożeniowy.

### Dokumentalista, Dokumentalista techniczny
Gdy aplikacja jest już wdrożona, 
prawdopodobnie będzie przekazywana z jakąś **dokumentacją**.
Dokumentację tę ktoś musi napisać i często w tym celu zatrudnia się osobne osoby, 
czyli **dokumentalistów**.

Osobną kategorią jest **dokumentacja techniczna**, pisana przez **dokumentalistów technicznych**.
Pod tą nazwą kryją się co najmniej dwa rodzaje dokumentacji:
* Dokumentacja kierowana do *SysOpsów* i *DevOpsów* opisująca jak zainstalować aplikację.
* Dokumentacja opisująca zewnętrzne **[API]** aplikacji skierowana do Testerów i Programistów

Co ciekawe, często w ramach oszczędności, jest ona pisana także przez osoby nietechniczne.

### UI Designer i UX Designer

W teorii **UI Designer** rysuje jak ma wyglącać graficzny interfejs użytkownika (ang. *graphical user interface*, **[GUI]**),
a *UX Designer* - jak ma się zachowywać.
W praktyce wiele zależy od firmy.
Często jest to stanowisko łączone, czyli *UI/UX Designer*.
Czasem *UI/UX Designer* pracuje tylko w programach graficznych, 
a w innych firmach dostarcza też pliki *.CSS oraz przykłady plików *.HTML
Trudno powiedzieć, ale na pewno żeby pracować na tym stanowisku trzeba wiedzieć co jest ładne a co brzydkie. 

### Sprzedawca i Marketingowiec
Sprzedawcy i Marketingowcy będą potrzebni zawsze. 
Wiele startupów informatycznych upadło ponieważ ich prezesi uważali,
że wystarczy stworzyć świetny produkt, 
ale nie umieli go sprzedać, 
bo nie mieli sprzedawców.
Dokładnie nie wiadomo ile,
bo nie mieli też marketingowców i nikt się o nich nie dowiedział.

## Podsumowanie

Podsumowując nietechniczne stanowiska w typowej firmie IT na które najłatwiej aplikować to:
* Analityk biznesowy - w zasadzie nie wiem co trzeba umieć żeby zostać BA
* Tester - ale często chcą studia techniczne na to stanowisko
* Scrum Master - potrzebne jest szkolenie i twarda psychika
* Product Owner - ale trzeba znać dziedzinę biznesową oprogramowania
* Dokumentalista - umiejętność Worda
* UI/UX Designer - trzeba mieć zmysł artystyczny
* Sprzedawca i Marketingowiec - tak samo jak wszędzie, IT nie jest tu w żaden sposób wyjątkowe.

[Perlu]:    /posts-by-langs/perl
[Pythonie]: /posts-by-langs/python
[Ruby]:     /posts-by-langs/ruby

[Bashu]:    /posts-by-tools/bash 

[API]:      /posts-by-tags/api
[GUI]:      /posts-by-tags/gui