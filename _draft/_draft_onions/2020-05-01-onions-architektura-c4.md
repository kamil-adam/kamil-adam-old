---
layout:   post
title:    "Architektura oprogramowania"
author:   "writeonly"
category: przemyslenia
tags:     przemyslenia architektura asciidoctor cleancode
comments: true
toc:      true
---

https://asciidoctor.org


poziomy
* pakiet ->  unit komponent
* moduł
* kontekst  
* mikroservice
* boundle context

TopDown


onion bez DI
guice/cdi
https://github.com/arteam/simple-json-rpc


bool-bool-bool


apatyczny, introwertyczny i samolubny

C4
* context    -> system
* containers -> kontenery wdrożeniowe -> jary?  -> testy integracyjne
* components -> jakaś wspólna logika  -> moduł? -> testy jednostkowe
* classes







| Warstwy JEE       | Warstwy DDD          | Model            | Spring     | Opis                                             |
| ----------------- | -------------------- | ---------------- | ---------- | ------------------------------------------------ |
| UI                | User Interface Layer | ViewModel        | Controller | adaptery wejściowe - reprezentacja i prezentacja |
| brakująca         | Application Layer    | ApplicationModel | Component* | autoryzacja, transakcyjność                      |
| Business Logic    | Domain Layer         | DomainModel      | Service    | reguły biznesowe - testy jednostkowe na 100%     |
| Data Access Layer | Infrastructure Layer | DataModel        | Repository | adaptery wyjściowe - klienty i persystancja      |




| Warstwy     | Warstwa  1.          | Warstwa 2.        | Warstwa 3.     | Warstwa 4.           |
| ----------- | -------------------- | ----------------- | -------------- | -------------------- |
| Warstwy JEE | UI                   | brakująca-warstwa | Business Logic | Data Access Layer    |
| Spring      | Controller           | Service           | Component      | Repository           |
| Warstwy DDD | User Interface Layer | Application Layer | Domain Layer   | Infrastructure Layer |
| Model       | ViewModel            | ApplicationModel  | DomainModel    | DataModel            |
| Shallot     | view                 | auth              | core           | impl                 |
|             | Dummy                | Proxy             | Mediator       | Facade               |

|  |






dozer

soa na reście

message
* command -> zrób coś
* event   -> stało się

kernel <-> ports <-> adapters


testy integracyjne
* pojedynczy powinien działąć szybko
* bez zależności zewnętrznych
* zależności uruchamiane w teście

testy jednostkowe
* są jak dokumentacja, po pół roku są do wyrzucenia
* testują tylko core