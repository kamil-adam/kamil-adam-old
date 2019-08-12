---
layout:   post
title: "Shallot"
author:   "writeonly"
category: shallot
tags:     shallot java dropwizard
comments: true
toc:      true
---


W pewnej firmie, nazwijmy ją writeonly, brakowało programistów scala


Więc dano ogłoszenie
I nikt się nie zgłosił

Więc dano nowe ogłoszenie

Poszukiwany święty graal

Full stack JVM developer 
mile widziana znajomość Javy w wersji Script



Zjawił się jeden programista
Przedstawiał się jako antymag.

Jak się później okazało został wyrzucony z poprzedniej firmy za powiedzenie że spring jest Javą Enterprise

Został wyrzucony z




* https://modules.dropwizard.io/official/
  * https://github.com/dropwizard/dropwizard-java8
  * https://github.com/dropwizard/dropwizard-vavr
* https://modules.dropwizard.io/thirdparty/
  * https://github.com/smoketurner/dropwizard-swagger
  * https://github.com/smoketurner/dropwizard-graphql


Shallot

moduł?
komponent?

* command.api 
  * JsonInput/IncomingEvent
  * JsonOutput/OutgoingEvent
  * JsonInterface
* command.impl
  * JsonCreator -> buduje fasade 
  * JsonFacade -> "interfejs" pakietu, aktor 
  * JsonModule -> konfiguruje guice
  * JsonFactory -> tworzy agregat, tylko tu są dozwolone swiche
  * JsonAgregat -> obiekt procedure/proces/biznesowy -> unit -> docelowo aktor
    * zawiera encję JsonInput
  * JsonResource -> kontroler? prezenter?
* repo.api
  * JsonRepository
* repo.impl - implementacje repozytoriów są fasadami
  * InMemory
  * Hibernate
  * JDBI
* query.api 
  * JsonDto
* query.impl
  * encja na twarz i pchasz
  * widoki jako query


* database
  * PostgreSQL
  * SQLite



json formatter
json converter
json path
json processor

axon


https://modules.dropwizard.io/thirdparty/