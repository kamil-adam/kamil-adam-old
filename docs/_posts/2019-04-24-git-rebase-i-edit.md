---
title:    'Prosty sposób na zmianę historii Gita - polecenie edit'
author:   TheKamilAdam
category: cli
tools:    git ubuntu
redirect_from:
  - git-rebase-i-edit
  - cli/git-rebase-i-edit
  - cli/2019/04/24/git-rebase-i.html
---

Jest to kontynuacja artykuły na temat możliwości polecenia `get rebase`.
Tym razem skupie się na podziele istniejących rewizji (ang. *commits).

### Podział rewizji
O ile łączenie rewizji omówione w poprzednim [artykule](/git-rebase-i) jest banalnie proste
i wymaga tylko użycia polecenia `fixup` lub `squash`
o tyle podział rewizji (ang. *split commit*) jest już trudniejszy.

Najpierw musimy ustalić jak daleko w historii znajduje się rewizja do podziału,
której szukamy,
a następnie wywołać polecenie `git rebase -i HEAD~` z odpowiednią liczbą, np.:
```bash
git rebase -i HEAD~8
```

I zobaczymy:
```bash
pick 2222222 gigantyczne coś, z tydzień pracy z nadgodzinami
pick 3333333 dobre zatwierdzenie, bo małe
pick 4444444 dobre zatwierdzenie, bo małe
pick 5555555 dobre zatwierdzenie, bo małe
pick 6666666 dobre zatwierdzenie, bo małe
pick 7777777 dobre zatwierdzenie, bo małe
pick 8888888 dobre zatwierdzenie, bo małe
pick 9999999 dobre zatwierdzenie, bo małe
```

Następnie interesującą nas rewizję oznaczamy poleceniem `edit`
```bash
e 2222222 gigantyczne coś, z tydzień pracy z nadgodzinami
pick 3333333 dobre zatwierdzenie, bo małe
pick 4444444 dobre zatwierdzenie, bo małe
pick 5555555 dobre zatwierdzenie, bo małe
pick 6666666 dobre zatwierdzenie, bo małe
pick 7777777 dobre zatwierdzenie, bo małe
pick 8888888 dobre zatwierdzenie, bo małe
pick 9999999 dobre zatwierdzenie, bo małe
```
i zamykamy edytor.

Teraz jesteśmy w historii rewizji zaraz po zatwierdzeniu dużej rewizji, która nas interesuje.
Dlatego trzeba jeszcze zresetować gita do poprzedniej rewizji za pomocą polecenia:
```bash
git reset HEAD^
```
Teraz za pomocą pary poleceń `git add ...` i `git commit -m OPIS_REWIZJI` dzielimy pliki na atomowe części, np.:

```bash
git add *.elm
git commit -m 'dodanie frontendu w języku Elm, dialekcie języka Haskell transpilowanym do JS'
git add *.ps
git commit -m 'dodanie backend-for-frontend w języku PureScript, dialekcie języka Haskell transpilowanym do JS'
git add *.fr
git commit -m 'dodanie backendu w języku Frege, dialekcie języka Haskell na JVM'
git add *.eta
git commit -m 'dodanie backendu w języku Eta, dialekcie języka Haskell na JVM'
```
Następnie zatwierdzamy wszystko za pomocą polecenia:
```bash
git rebase --continue
```
I za pomocą polecenia `git rebase -i HEAD~9` możemy zobaczyć wynik:
```bash
pick 1234567 dodanie frontendu w języku Elm, dialekcie języka Haskell transpilowanym do JS
pick 2345678 dodanie backendu w języku PureScript, dialekcie języka Haskell transpilowanym do JS
pick 3456789 dodanie backendu w języku Frege, dialekcie języka Haskell na JVM
pick 4567891 dodanie backendu w języku Eta, dialekcie języka Haskell na JVM
pick 3333333 dobre zatwierdzenie, bo małe
pick 4444444 dobre zatwierdzenie, bo małe
pick 5555555 dobre zatwierdzenie, bo małe
pick 6666666 dobre zatwierdzenie, bo małe
pick 7777777 dobre zatwierdzenie, bo małe
pick 8888888 dobre zatwierdzenie, bo małe
pick 9999999 dobre zatwierdzenie, bo małe
```

## Podsumowanie
Nic nie napisałem na temat działania polecenia `exec`, ponieważ nigdy nie miałem potrzeby go użyć.
