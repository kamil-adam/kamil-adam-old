---
title:    'Krótka historia informatyki na przykładzie serializacji danych'
author:   TheKamilAdam
category: programming
tags:     ajax assembler di hocon json json-merge-patch json-patch json-pointer json-schema microservice rest rison rpc soap toml webservice xml yaml 
labels:   jsf json-rpc jsp orm xml-rpc
langs:    coffeescript java javascript python rust scala
libs:     akka akka-http jsonpath jsonsurfer
tools:    bash jvm seed swagger
redirect_from:
  - serializacja
  - programming/serializacja
---

Najpierw odpowiedzmy sobie na dodatkowe pytanie `kto to jest informatyk`?
Odpowiedź jest oczywista `jest to człowiek znający się na informatyce`.
I tu dochodzimy do głównego pytania `a co to jest informatyka`?
Można pomyśleć,
że informatyka to nauka o komputerach. 
Przecież codziennie informatycy używają komputerów.
Ale

> Informatyka ma tyle samo wspólnego z komputerami, co astronomia ma z teleskopami.

Tak przynajmniej powiedział *Edsger Wybe Dijkstra*, jeden z pierwszych informatyków w Europie.

Informatyka to nauka o informacji, 
a dokładniej informatyka jest to nauka o PPPP informacji,
czyli:
* **P**obieraniu informacji.
* **P**rzetwarzaniu informacji.
* **P**rzesyłaniu informacji.
* **P**rzechowywaniu informacji.

Jest to co prawda definicja bardzo nieścisła,
ponieważ np. analiza danych jest to nauka o PPP informacji,
czyli:
* **P**obieraniu informacji.
* **P**rzetwarzaniu informacji.
* **P**rzesyłaniu informacji.

A co ma z tym wspólnego serializacja?
Serializacja danych jest to zamiana hierarchicznej struktury danych na liniową.
Serializacja jest najbardziej związana z przesyłaniem informacji.
Ale także z pozostałymi aspektami informatyki jak przetwarzanie i przechowywanie.
Chyba najmniej z pobieraniem.
Więc serializacja danych dość mocno przenika *naukę o informacji*.

Ze względu na sposób serializacji danych można bardzo prosto podzielić historię informatyki i programowania na kilka etapów:
* Komunikacja tekstowa bez struktury
* Serializacja binarna powiązana z językiem 
* Serializacja do formatu **[XML]** (ang. *Extensible Markup Language*)
* Serializacja do formatu **[JSON]** (ang. *JavaScript Object Notation*)
* Serializacja binarna ortogonalna dla języka programowania

## Komunikacja tekstowa bez struktury

Była używana w starych i prostych systemach.
Często pod postacią prostych poleceń tekstowych podobnych do języka asemblerowego lub rozkazów basha.
W zasadzie to nie ma co za dużo o niej mówić.

## Serializacja binarna

Szybko pierwszą komunikację tekstową bez struktury zastąpiła serializacja binarna.
Posiadała ona wiele zalet między innymi pozwalała przekazywać dane strukturalne.
Ale posiadała ona także wiele wad.
* Pierwszą wadą jaką dziś bym wymienił było to,
że serializacja binarna jest nieczytelna dla człowieka i trudne jest debugowanie takiej komunikacji.
Ten problem oczywiście można rozwiaząć za pomocą odpowiednich narzędzi do debugowania i przeglądania logów.
* Drugą wadą było to,
że różne języki programowania rozwinęły niezależnie swoje własne formaty serializacji binarnej.
W rezultacie było niemożliwe zdalne wywoływanie procedur/metod (ang. *Remote Procedure Call*, **[[RPC]]**)
napisanych w Javie za pomocą innego języka programowania niż Java.
Ten problem oczywiście można rozwiązać za pomocą ustandaryzowanego formatu binarnego.
Ten jednak nie powstał, a przyczyną była trzecia wada
* Trzecim i największym problemem serializacji binarnej było to,
że podejrzany ruch w tamtych czasach był blokowany na routerach.
Przy czym podejrzanym ruchem była komunikacja binarna.
Dopuszczalna była tylko komunikacja testowa.
Dziś jest to już problem historyczny ponieważ i tak całą komunikacja jest kopresowana i szyfrowana,
więc dziś nawet komunikacja tekstowa wygląda jak binarna.
Rozwiązaniem tego problemu było zastąpienie binarnej serializacji na testową serializację ze strukturą,
a binarnego **[RPC]** przez tekstowy **[RPC]**.
Na format kodowania struktur wybrano **[XML]**.

## XML - Extensible Markup Language

Dzięki Roższeżalnemu Językowi Znaczników można było wymienić binarne **[RPC]** na XML-RPC.
Szybko pojawił się kolejny problem.
Każdy język programowania posiadał swoją własną,
niekompatybilną wersję XML-RPC. 

Rozwiązaniem było to,
że największe firmy tamtych czasów siadły razem do stołu i opracowały standard **[SOAP]** (ang. *Simple Object Access Protocol*).
Stał on się zalecanym protokołem do komunikacji między Webserwisami w miejsce problematycznego **XML-RPC**.
Później, i wcześniej,
stworzono mnóstwo innych standardów jak XML Schema Definition (XSD), XPointer, XPath, XQuery i wiele innych.
W rezultacie **[XML]** jest dziś najbardziej ustandaryzowanym formatem wymiany danych.
Powstawały całe ksiażki o XMLu.
Niektórzy widząc,
że programy stają się tylko procesorami XMLa zaproponowali stworzenie XMLowych baz danych,
które się jednak nie przyjęły.
Nawet X w słowie **[AJAX]** pochodzi od XMLa.

Panował zachwyt nad XMLem.
I szybko zaczęto go wykorzystywać także do pisania konfiguracji.
W tamtych czasach śmiano się z programistów Javy,
że piszą więcej kodu **[XML]** niż Javy.
XMLa używano do konfiguracji:
* Frameworków Mapowania Obiektowo-Relacyjnego (ang. *Object-Relational Mapping*, **ORM**).
* Frameworków Wstrzykiwania Zależności (ang. *Dependency Injection*, **[DI]**).
* Frameworków generowania **[HTMLa]** za pomocą **JSP** i **JSF**.

Ogólnie w tamtych strasznych czasach królowały frameworki, XML, Webserwisy i SOAP.

Czas XMLa i X-menów jednak przeminą.
Na format **[XML]** narzekano długo, za jego rozwlekłość i nadmiarowość.
Oskarżano o nieczytelność.
Ale prawdopodobnie gwoździem do trumny był sam **[AJAX]**.
A dokładniej **[JavaScript]**.
Wiele formatów walczyło o to by zastąpić **[XML]**,
ale wygrał ten który jest najłatwiejszy do sparsowania w **[JavaScripcie]**,
czyli **[JSON]**.


## JSON - JavaScript Object Notation

**[JSON]** posiada zwięźlejszy zapis niż **[XML]**.

Dla formatu **[JSON]** powstało oczywiście mnóstwo standardów RFC jak np. **[JSON Pointer]**, **[JSON Patch]**, **[JSON Merge Patch]**
Powstało też wiele standardów nie RFC jak np. **[JSON Schema]**, **[JsonPath]**/**[JsonSurfer]**, **[OpenApi]**/**[Swagger]**

Szeroko przyjęły się dokumentowe bazy danych używające JSONa jak np. **Couchbase**, **CouchDB** i **MongoDB**,
ale także klasyczne relacyjne bazy danych jak **[PostgreSQL]** i **[SQLite]** zyskały narzędzia do przetwarzania JSONa.
Także silniki wyszukiwania (ang. Search Engine) **Elastic Search** lub **[Solr]** używają JSONa do wymiany danych.

Jedynie tylko **Json-RPC** się nie przyjął j zamiast niego jest używany **[REST]**
Co ciekawe **[REST]** nie musi używać JSONa, ale nie widziałem XRESTa,
czyli RESTa używającego JSONa.

Informatyka 2.0,
czyli JSONika to nauka o JSONie, 
a dokładniej nauka o:
* Pobieraniu JSONa 
* Przetwarzania JSONa
* Przesyłaniu JSONa
* Przechowywaniu JSONa

**[JSON]** ma oczywiście kilka wad:
* obsługuje tylko tablice i obiekty
* jest formatem tekstowym przez co zajmuje więcej niż formaty binarne
* jest często mało czytelny

## Nowa serializacja binarna

Mimo że JSON jest o wiele bardziej spakowany niż XML dalej zawiera wiele nadmiarowości.
Jest to o tyle istotne,
że dziś w czasach mikroserwisów i nanoserwisów

Nowe formaty binarne można podzielić na kilka kategorii,
ale to co je wyróżnia to to,
że nie są tworzone dla jednego języka,
ale dla wielu jednocześnie i dostarczane jaki biblioteki.

* **[BSON]** i **[Smile]** - binarne formaty JSONa.
* **[Ion]** - binarny nadzbiór JSONa.
* **[CBOR]** i **[MessagePack]** - binarne formaty luźno oparte o JSONa.
* **[Avro]**, **[Protocol Buffers]** i **[Thrift]** - binarne formaty nie oparte o JSONa, do zastosowań uniwersalnych.
* **[FlatBuffers]** - binarny format nieoparty o JSONa dedykowany do gier.

## Konfiguracja

Sukces formatu **[JSON]** spowodował,
że zaczął on by używany do innych celów niż tylko jako format serializacji danych.
Jednym z takich innych celów jest wszelkiego rodzaju konfiguracja zapisywana w plikach tekstowych.
Wybór JSONa do tego zadania nie powinien dziwić biorąc pod uwagę,
że posiadamy bardzo dobre narzędzia do przetwarzania go.
Są jednak formaty dedykowane do przechowywania konfiguracji,
które warto rozważyć.
Są to:
* pliki **[INI]** - używane przez Windowsa i **[Python]**.
* [TOML] - prosty format konfiguracji inspirowany formatem **[INI]]* używany w języku **[Rust]** i narzędziu **[Seed]**.
* pliki properties, nazywane formatem **[Java Properties]** używane w Javie.
* **[HOCON]** - nadzbiór formatów JSON oraz Java Properties.
Używany przez biblioteki **[akka]** i **[akka-http]**.
Oryginalna biblioteka jest napisana w czystej Javie bez zależności i jest proponowana jako uniwersalny sposób konfigurowania aplikacji na **[JVM]**.
Za to wersja **[SHOCON]** jest napisana w czystej **[Scali]**.
* **[YAML]** - nadzbiór JSONa, nastawiony na maksymalną czytelność dla człowieka.
Niestety z powodu używania wcięć zapisanie poprawnego YAMLa jest o wiele trudniejsze.

## Inne
Kilka ciekawych formatów nie można zaliczyć do żadnej z powyższych definicji:
* **[Rison]** - Skrócony JSON, który można przesyłać w URLu.
* **[CSON]** - JSON zgodny z składnią języka **[CoffeeScript]**.
* **[Kryo]** - Serializacja binarna w starym stylu.
Czyli związana z jednym konkretnym językiem.
A dokładniej z językiem Java.
Po co taka serializacja?
Czasem mamy pewność że zserializowane obiekty będą czytane tylko przez jedną technologię,
np. podczas zapisywania zserializowanych danych w Cache.
Zaletą Kryo jest to, że jest 10 razy szybsza od standardowej serializacji z Javy.

[CoffeeScript]:     /langs/coffeescript
[Java]:             /langs/java
[JavaScript]:       /langs/javascript
[Python]:           /langs/python
[Rust]:             /langs/rust
[Scala]:            /langs/scala

[Jolt]:             /libs/jolt
[JsonPath]:         /libs/jsonpath
[JsonSurfer]:       /libs/jsonsurfer
[SHOCON]:           /libs/shocon

[Bash]:             /tools/bash
[Seed]:             /tools/seed
[Swagger]:          /tools/swagger

[AJAX]:             /tags/ajax
[Assembler]:        /tags/assembler
[CSON]:             /tags/cson
[DI]:               /tags/di
[HOCON]:            /tags/hocon
[INI]:              /tags/ini
[Java Properties]:  /tags/java-properties
[JSON]:             /tags/json
[JSON Merge Patch]: /tags/json-merge-patch
[JSON Patch]:       /tags/json-patch
[JSON Pointer]:     /tags/json-pointer
[JSON Schema]:      /tags/json-schema
[OpenApi]:          /tags/openapi
[Rison]:            /tags/rison
[REST]:             /tags/rest
[RPC]:              /tags/rpc
[SOAP]:             /tags/soap
[TOML]:             /tags/toml
[YAML]:             /tags/yaml
[XML]:              /tags/xml

[Avro]:             http://avro.apache.org
[BSON]:             http://bsonspec.org
[CBOR]:             https://www.rfc-editor.org/info/rfc7049
[FlatBuffers]:      https://google.github.io/flatbuffers/
[Ion]:              https://amzn.github.io/ion-docs/index.html
[Kryo]:             https://github.com/EsotericSoftware/kryo#projects-using-kryo
[MessagePack]:      https://msgpack.org
[Protocol Buffers]: https://github.com/protocolbuffers/protobuf
[Smile]:            https://github.com/FasterXML/smile-format-specification  
[Thrift]:           https://thrift.apache.org
