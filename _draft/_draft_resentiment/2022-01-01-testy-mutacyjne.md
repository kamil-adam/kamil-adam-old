---
layout:   post
title:    "Bardziej dynamiczna analiza kodu dla języka Scala - Property-based testing"
author:   "writeonly"
category: resentiment
tags:     resentiment scalatest specs2
labels:   property-based testing scalacheck scalaprops nyaya scalaz
comments: true
toc:      true
---




## Testy mutacyjne

### PITest - Real world mutation testing
* [PITest](<https://github.com/pitest/sbt-pit>)

Niestety działa tylko dla javy i sbt o wersji niższej niż 1.0.0

```bash
sbt clean pitest
```

### Scalamu - mutation testing engine for Scala.
* [Scalamu](<https://github.com/sugakandrey/scalamu>)



### Stryker4s - Mutation testing for Scala. Work in progress...
* [Stryker4s](<https://github.com/stryker-mutator/stryker4s>)
Wtyczka jeszcze nie jest gotowa 


## Testy mutacyjne w Scalamu


```bash
sbt mutationTest
```