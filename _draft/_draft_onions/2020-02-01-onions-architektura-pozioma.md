

# Architektura trójwarstwowa

A czemu trójwarstwowa a nie dwu lub cztero?
Niestety mogę tylko zgadywać, 
jednak spojrzenie na historię oprogramowania może trochę pomóc.
Spójrzmy na historię firmy JavaWay.


## Architektura hardware'u
### Architektura dwuwarstwowa

Miejsce na rysunek

### Architektura trójwarstwowa

Miejsce na rysunek

## Architektura software'u
* architektura odwrotnej Lasagne'i - warstwy leżą na sobie jak farsz i ciekną
  * magiczna istota - Latający Potwór Spaggetti, bo też absurdalny
* architektura cebulowa - warstwy układają się wogół rdzenia, ale coś śmierdzi
  * magiczna istota - Ogr, bo też śmierdzi
* Architektura czysta - warstwy ukłaają się wokół rdzenia i rdzeń jest czysty 
  * magiczna istota - Jednorożec
  
### Architektura dwuwarstwowa Lasagne'i -Java Enterprise


* Serwer aplikacyjny z EJB np JBoss
* Serwer webowy - JSF np Tomcat

Jak do tego doszło?

Możemy zgadywać, że istniał już wcześniej serwer aplikacyjny i był totalnie przeładowany.
Utylizacja cpu na poziomie 90% itd.
Łączyły się z nim grube klienty po RMI lub innej binarnej technologii o której chcemy zapomnieć.

Nagle do zespołu deweloperów wpada Product Manager (wtedy nie istnieli jeszcze Product Ownerzy)
i mówi:
- Przenosimy aplikację kliencką do weba. Ile wam to zajmie
- Trzy miesiące - odpowiedział Lider Techniczny, była to jego standardowa odpowiedź gdy proszono go o estymatę z siedzenia. - 
Ale jest problem - kontynuował. - Serwer nie uciągnie generowania HTMLa, już jest dojechany. Potrzebujemy mocniejszą maszynę.
- Nie mamy tyle pieniędzy- odpowiedział PM - damy wam drugą maszynę, o połowę słabszą i musicie sobie z tym poradzić.

Miejsce na rysunek  


### Architektura trójwarstwowa Lasagne'i - Spring

Za namowami AntMaga w firmie JavaWay zrezygnowali z EJB przeszli na lrzejszego Springa.



* kontrolery - prezentery
* serwisy - logika
* repozytoria -  persystencja i zdalny dostęp

Wszystko ma interfejsy i nikt nie wie dlaczego.
Niektórzy mówią że dlatego, bo spring potrzebuje.

Miejsce na rysunek

### Architektura cebulow (porty i adaptery)
problem  logika zależy od implementacji repozytorów
przenosimy interfejs repozytoriów do domeny


* porty - interfejsy 
* adaptery 
  * wejściowe - mediatory
  * wyjściowe - fasady 
 



### Architektura czterowarstwowa czysta
problem domena zależy od frameworka autoryzacji i tranzakcyjności
wydzielamy z serwisów warstwę z serwisów aplikacyjnych
rozdzielamy serwisy na:
* serwisy aplikacyjne, zwane przezemnie dalej serwisami - tu znajduje się logika aplikacyjna, często oparta na aspektach
  * Autoryzacja
  * Zarządzanie tranzakcjami
* serwisy domenowe, zwane przezemnie dalej komponentami - tu znajduje się czysta logika domenowa niezależna od frameworków

### Architektura trójwarstwowa czysta
Jeśli korzystamy z nierelacyjnych baz dany lub implementujemy taktyczne DDD to problem zarządzania tranzakcjami znika.
Jesli 
* Korzystaj z funkcji!
* Funkcyjne dekoratory

