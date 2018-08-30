---
layout:   post
title:    "Alias - komenda powłoki Bash"
author:   "writeonly"
category: natatki
tag:      bash alias git
comments: true
toc:      true
---

Jeśli:
* masz problemy z zapamiętywaniem skomplikowanych komend Basha lub innych programów wywoływanych przez wiersz poleceń 
* nie lubisz wpisywać w terminalu długich poleceń z podkomendami i przełącznikami 

istnieje rozwiązanie twoich problemów! Jest to komenda powłoki Bash o nazwie `alias`.

Komendę `alias` można wywołać bez żadnego parametru:
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
* `NAME` oznacza nazwę nowej “komendy” do wywoływania w wierszu poleceń
* `VALUE` jest komendą, lub ciągiem komend, która zostanie wywołana naprawdę. Jeśli chcemy, żeby `VALUE` zawierało spację należy wszystko umieścić w parze apostrofów (‘) lub cudzysłowów (“)

Przykłady użycia:
```bash
alias rf=’fm -rf’
alias ..='cd ..'
```
Od teraz komenda `rf <ścieżka_do_folderu>` będzie usuwać foldery, a komenda `..` przechodzić do folderu wyżej w drzewie hierarchii folderów.

## Tworzenie permanentnych aliasów
Problem z aliasami jest tylko jeden. Działają tylko w ramach terminala w którym zostały zdefiniowane. Można to rozwiązać w prosty sposób poprzez stworzenie wszystkich aliasów w pliku, np. pod nazwą `~/bash_aliases.sh`, a następnie wczytywania go za pomocą komendy `source`. Teraz po otwarciu nowego terminala wystarczy wywołać:
```bash
source ~/.bash_aliases
```

by cieszyć się swoimi aliasami w każdym terminalu.

Automatyczne wczytywanie aliasów
Można to jednak jeszcze bardziej uprościć. Przy starcie każdego nowego terminala jest wczytywany plik `~/.bashrc`. Wystarczy na końcu tego pliku dodać:
```bash
source ~/.bash_aliases
```
lub bezpieczniej:
```bash
if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi
```
Dodatkowy `if` uchroni nas przed błędem, gdy plik ` ~/.bash_aliases` nie istnieje. Kropka na na początku drugiej linii jest aliasem na `source`.

## Niezniszczalne aliasy
Używanie aliasów nie jest niczym nowym. 
Możliwe, że w waszej dystrybucji będzie już istnieć plik `~/.bash_aliases` czekający na uzupełnienie 
lub nawet będzie już wczytywany w pliku `~/.bashrc`. Także cała powyższa procedura jest opisana na wielu stronach i blogach. 

Mój główny problem z aliasami polegał na tym, że gdy już miałem uzbierany pokaźny zestaw aliasów ułatwiających mi życie padł mi dysk w służbowym laptopie. 
Komputer poszedł do działu IT, wymienili mi dysk, ale ja straciłem wszystkie aliasy.

Stwierdziłem wtedy “Moja wina, bo wszystko, co tylko można, należy trzymać w chmurze”. 
Więc założyłem repozytorium na githubie [bash](https://github.com/kamil-adam/bash) , gdzie w pliku [aliases.sh](https://github.com/kamil-adam/bash/blob/master/aliases.sh) ponownie zbieram potrzebne mi aliasy. 
Dodatkowo zrobiłem mały skrypt instalujący, tak by jedną linią 
```bash
wget https://raw.githubusercontent.com/kamil-adam/bash/master/aliases_install.sh | bash
```
móc odzyskać wszystko to, do czego przywykłem.

