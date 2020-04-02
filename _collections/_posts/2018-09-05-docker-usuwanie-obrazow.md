---
title:    "Docker - usuwanie obrazów"
author:   TheKamilAdam
category: cli
tags:     alias cli
tools:    docker
redirect_from:
  - docker-usuwanie-obrazow
  - cli/docker-usuwanie-obrazow
  - cli/2018/09/05/docker-usuwanie-obrazow.html
---

Dziesięć lat pracy na Linuksie nauczyło mnie,
że jeśli Linuks zaczyna magicznie i bez ostrzeżenia sam z siebie nie działać
to najprawdopodobniej skończyło się miejsce na dysku.
Identycznie jest z Dockerem.
Jeśli lokalnie stawiamy chmurę mikroserwisów,
które często pojawiają się w nowych wersjach,
to prędzej czy później zabraknie nam miejsca na dysku.
W skrajnym wypadku, na laptopie zastępczym, musiałem dwa razy w tygodniu usuwać obrazy Dockerowe.

## Procedura usuwania obrazów Dockerowych
Szczęśliwie procedura usuwania obrazów Dockerowcyh nie jest czynnością skomplikowaną i składa się z trzech kroków.
Na początek włączamy terminal i teraz kolejno wykonujemy kroki:

Krok 1. Zatrzymujemy wszystkie kontenery:
```bash
docker kill $(docker ps -q)
```

Krok 2. Usuwamy wszystkie kontenery:
```bash
docker rm $(docker ps -a -q)
```

Krok 3. Usuwamy wszystkie obrazy:
```bash
docker rmi $(docker images -q)
```

## Wszystko razem
Można także wykonać wszystko razem jako jedno, połączone polecenie w terminalu:

```bash
docker kill $(docker ps -q); docker rm $(docker ps -a -q); docker rmi $(docker images -q)
```

Lepiej jest jednak dodać wpis do pliku `~/.bash_aliases` :
```bash
alias docker_rmi_all='docker kill $(docker ps -q); docker rm $(docker ps -a -q); docker rmi $(docker images -q)'
```

I wtedy wystarczy z wywołać w terminalu:
```bash
docker_rmi_all
```
