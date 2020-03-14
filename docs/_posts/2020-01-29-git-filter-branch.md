---
title:    'Git - zmiana informacji o autorze'
author:   TheKamilAdam
category: cli
tags:     cli filter-branch script
tools:    bash git
redirect_from:
  - no-exceptions-io
  - scala-jvm/no-exceptions-io
---

System kontroli wersji **[git]** przechowuje informacje o autorach zatwierdzeń (ang. *commit*)
w każdym zatwierdzeniu osobno.
Tzn. nie istnieje żadne globalne miejsce w którym moglibyśmy zmienić te informacje,
jak np. nazwisko autora zatwierdzenia.
Zamiast tego musimy modyfikować historię wszystkich zatwierdzeń.
Na szczęście nie trzeba robić tego ręcznie dla każdego zatwierdzenia
tylko można napisać jednolinijkowy [skrypt] używający podpolecenia (ang. *subcommend*) `filter-branch`.

## Najprostszy przypadek

Najprostszy przypadek występuje,
gdy wszystkie zatwierdzenia w repozytorium chcemy przypisać sobie.
Wtedy wystarczy jednolinijkowe polecenie, które dla wygody wolę przechowywać jako [skrypt]:

```bash
!/bin/sh -x

git filter-branch --env-filter '
    GIT_AUTHOR_NAME="Newname"
    GIT_AUTHOR_EMAIL="new@email"
    GIT_COMMITTER_NAME="Newname"
    GIT_COMMITTER_EMAIL="new@email"
' --tag-name-filter cat -- --branches --tags
```
Polecenie to dla każdego zatwierdzenia ustawia nowe 
`GIT_AUTHOR_NAME`, `GIT_AUTHOR_EMAIL`, `GIT_COMMITTER_NAME` i `GIT_COMMITTER_EMAIL`.

Tutaj warto dodać,
że *committer* (nie mam pojęcia jak to będzie po polsku) jest to osoba,
która włącza zatwierdzenia z gałęzi tymczasowej do głównej. 

Na końcu należy jeszcze wypchnąć zmiany do repozytorium za pomocą polecenia 
`git push --force --tags origin 'refs/heads/*'`.

## Najpopularniejszy przypadek
Często jednak nie chcemy zmieniać wszystkich zatwierdzeń,
ale tylko te utworzone przez konkretnego autora.
Prawdopodobnie najpopularniejszym przypadkiem jest zmiana adresu autora zatwierdzeń. 
Można to osiągnąć za pomocą poniższego skryptu zawierającego dwie instrukcje `if`
```bash
#!/bin/sh -x

git filter-branch --env-filter '

WRONG_EMAIL="your-wrong-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```
W tym wypadku zmieniamy tylko zatwierdzenia zawierające konkretny, błędny adres email.

Także w tym wypadku musimy wypchnąć zmiany do repozytorium za pomocą polecenia
`git push --force --tags origin 'refs/heads/*'`.

## Mój przypadek

W moim przypadku chciałem jednak zmienić nie adres email, a nazwę użytkownika.
W rezultacie powyższy [skrypt] musiałem zmodyfikować do następującej postaci:
```bash
!/bin/sh -x

git filter-branch -f --env-filter '

WRONG_NAME="Kamil.Zabinski"
CORRECT_NAME="Kamil Adam"
CORRECT_EMAIL="kamil.adam.zabinski@gmail.com"
if [ "$GIT_COMMITTER_NAME" = "$WRONG_NAME" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_NAME" = "$WRONG_NAME" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

## Podsumowanie

Oryginalny klient systemu kontroli wersji **[git]** powstał jako polecenie do używania ze skryptów.
I chociaż obecnie nie trzeba umieć pisać skryptów by wykonać podstawowe operacje,
warto wiedzieć, że istnieje taka opcja.
Zwłaszcza biorąc pod uwagę,
że wiele zaawansowanych opcji systemu kontroli wersji **[git]** jest dostępnych tylko z [konsoli].

[bash]:          /posts-by-tools/bash 
[git]:           /posts-by-tools/git

[cli]:           /posts-by-tags/cli
[filter-branch]: /posts-by-tags/filter-branch
[konsoli]:       /posts-by-tags/cli
[script]:        /posts-by-tags/script
[skrypt]:        /posts-by-tags/script


