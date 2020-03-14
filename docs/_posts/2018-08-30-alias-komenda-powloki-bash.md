---
title:    "Alias - polecenie powłoki Bash"
author:   TheKamilAdam
category: cli
tags:     alias cli 
tools:    bash git
redirect_from:
  - alias-komenda-powloki-bash
  - cli/alias-komenda-powloki-bash
  - cli/2018/08/30/alias-komenda-powloki-bash.html
---

Jeśli:
* masz problemy z zapamiętywaniem skomplikowanych poleceń Basha lub innych programów wywoływanych przez wiersz poleceń
* nie lubisz wpisywać w terminalu długich poleceń z podkomendami i przełącznikami

istnieje rozwiązanie twoich problemów! Jest to polecenie powłoki Bash o nazwie `alias`.

Polecenie `alias` można wywołać bez żadnego parametru:
```bash
alias
```

wyświetli wtedy listę wszystkich zdefiniowanych aliasów dostępnych w danym terminalu.

## Tworzenie aliasów

Żeby utworzyć nowy alias należy wywołać:
```bash
alias NAME=VALUE
```

gdzie:
* `NAME` oznacza nazwę nowego "polecenia" do wywoływania w wierszu poleceń
* `VALUE` jest poleceniem, lub ciągiem poleceń, które zostanie wywołana naprawdę.
Jeśli chcemy, żeby `VALUE` zawierało spację należy wszystko umieścić w parze apostrofów (') lub cudzysłowów (")

Przykłady użycia:
```bash
alias rf='fm -rf'
alias ..='cd ..'
alias cwd='cd `pwd`'
```
Od teraz :
* polecenie `rf <ścieżka_do_folderu>` będzie usuwać foldery,
* polecenie `..` przechodzić do folderu wyżej w drzewie hierarchii folderów,
* polecenie `cwd` będzie odświeżać aktywny folder.

## Tworzenie permanentnych aliasów
Problem z aliasami jest tylko jeden. Działają tylko w ramach terminala w którym zostały zdefiniowane.
Można to rozwiązać w prosty sposób poprzez stworzenie wszystkich aliasów w pliku, np. pod nazwą `~/.bash_aliases`,
a następnie wczytywania go za pomocą polecenia `source`.
Teraz po otwarciu nowego terminala wystarczy wywołać:
```bash
source ~/.bash_aliases
```

by cieszyć się swoimi aliasami w każdym terminalu.

## Automatyczne wczytywanie aliasów
Można to jednak jeszcze bardziej uprościć.
Przy starcie każdego nowego terminala jest wczytywany plik `~/.bashrc`.
Wystarczy na końcu tego pliku dodać:
```bash
source ~/.bash_aliases
```
lub bezpieczniej:
```bash
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```
Dodatkowy `if` uchroni nas przed błędem, gdy plik `~/.bash_aliases` nie istnieje.
Kropka na początku drugiej linii jest aliasem na `source`.

Dodatkowo do pliku `~/.bash_aliases` warto dodać aliasy:
```bash
alias vish='vim ~/.bashrc'
alias srcsh='source ~/.bashrc'
```

## Niezniszczalne aliasy
Używanie aliasów nie jest niczym nowym.
Możliwe, że w waszej dystrybucji będzie już istnieć plik `~/.bash_aliases` czekający na uzupełnienie
lub nawet będzie już wczytywany w pliku `~/.bashrc`.
Także cała powyższa procedura jest opisana na wielu stronach i blogach.

Mój główny problem z aliasami polegał na tym,
że gdy już miałem uzbierany pokaźny zestaw aliasów ułatwiających mi życie padł mi dysk w służbowym laptopie.
Komputer poszedł do działu IT, wymienili mi dysk, ale ja straciłem wszystkie aliasy.

Stwierdziłem wtedy "Moja wina, bo wszystko, co tylko można, należy trzymać w chmurze".
Więc założyłem repozytorium na githubie [cli](https://github.com/writeonly/cli),
gdzie w pliku [bash_aliases](https://github.com/writeonly/cli/blob/master/bash_aliases) ponownie zbieram potrzebne mi aliasy.
Dodatkowo zrobiłem mały skrypt instalujący, tak by jedną linią
```bash
wget https://raw.githubusercontent.com/writeonly/cli/master/bash_aliases_install.sh | bash
```
móc odzyskać wszystko to, do czego przywykłem.

A polecenie:
```bash
update_aliases
```
można zaktualizować aliasy.