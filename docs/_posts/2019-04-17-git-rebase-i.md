---
title:    'Prosty sposób na zmianę historii Gita'
author:   TheKamilAdam
category: cli
tools:    git ubuntu
redirect_from:
  - git-rebase-i
  - cli/git-rebase-i
---

Każdy z nas czasem zatwierdza (ang. *commit*) coś brzydkiego do repozytorium.
Dlaczego tak robimy?
Czasem przypadkiem,
ale często dlatego, że trzeba przełączyć się na inną gałąź,
a posiadamy już jakieś zmiany na gałęzi aktualnej.
Co prawda można niezatwierdzone zmiany, tylko schować w schowku za pomocą polecenia `git stash`,
ale dane ze schowka strasznie łatwo stracić.
Poza tym schowek jest jeden wspólny dla wszystkich gałęzi.

Zatwierdzanie brzydkich rzeczy na osobną gałąź (ang. *feature branch*) nie jest niczym złym,
o ile posprzątamy wszystko przed złączeniem z główną gałęzią.

Sposobów na sprzątanie w historii gita jest kilka,
ale moim ulubiony,
bo nie wymagającym zewnętrznych narzędzi,
jest polecenie:
```bash
git rebase -i HEAD~LICZBA_ZATWIERDZEN_WSTECZ
```

## Usuwanie, łączenie i zmiana opisu rewizji za pomocą polecenia `git rebase -i`
Wyobraźmy sobie,
że mamy repozytorium w którym kilka ostatnich rewizji (ang. *commit*) było robionych w zbytnim pośpiechu i chcemy to teraz naprawić.
Wywołujemy:

```bash
git rebase -i HEAD~5
```

i zobaczymy edytor dla gita (domyślnie jest to vim) z następującą treścią:
```bash
pick 2222222 dobry commit
pick 3333333 dobry commit, ale ze złym opisem
pick 4444444 zły komit robiony na szybko
pick 5555555 commit poprawiający poprzedni
pick 6666666 błędny commit do skasowania

# Rebase 1111111..6666666 onto 1111111 (5 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Najpierw mamy listę rewizji w kolejności chronologicznej,
a następnie listę możliwych poleceń do użycia.

*Oczywiście hashe rewizji zostały zmyślone by łatwiej było się skupić na tym co ważne.*

W naszym przypadku użyjemy:
* `pick` - żeby pozostawić rewizje niezmienioną
* `reword` - żeby zmienić opis rewizji. Po użyciu tego polecenia pojawi nam się kolejny ekran edytora do wprowadzenia nowego opisu
* `squash` lub `fixup` - żeby połączyć to rewizję z poprzednim. Ja wolę `fixup`, bo nie zostawia żadnych śladów w historii
* `drop` - żeby pozbyć się niepotrzebnego rewizji

Po naszych zmianach lista wygląda następująco:
```bash
pick 2222222 dobry commit
r 3333333 dobry commit ze złym opisem
pick 4444444 zły comit robiony na szybko
f 5555555 commit poprawiający poprzedni
d 6666666 błędny commit do skasowania
```

Teraz wychodzimy z edytora (jeśli używamy vima jest to `:x`) i pokazuje nam się edytor do zmiany treści opisu:
```bash
dobry commit, ze z złym opisem

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      DATA_REWIZJI_Z_OPISEM
#
# OPIS AKTUALNEGO STANU
#
# Changes to be committed:

```
Kasujemy stary opis (*dobry commit ze złym opisem*) i wprowadzamy nowy np. *dobry commit z poprawionym opisem*.
Ponownie wychodzimy z edytora
i jeśli teraz wywołamy w konsoli:
```bash
git rebase -i HEAD~3
```
to zobaczymy:
```bash
pick 2222222 dobry commit
pick 3333333 dobry commit z poprawionym opisem
pick 4545454 zły komit robiony na szybko
```
i jeśli nie chcemy nic już zmieniać to wystarczy wyjść z edytora.
Nie spowoduje to żadnych zmian,
ponieważ dla każdego zatwierdzenia domyślnie jest ustawione polecenie `pick`,
które go nie zmienia.

### Zmienianie kolejności rewizji za pomocą polecenia `git rebase -i`

Polecenie `git rebase -i` pozwala także zmienić kolejność rewizji.

Może się zdarzyć, że pracując dłużej na osobnej gałęzi dokonamy więcej zmian w kodzie.
Takiej ilości, że dokonanie przeglądu kodu stanie się *niemożliwe*.
Co to znaczy *niemożliwe* zależy od definicji w zespole, ale przeglądy powyżej 500 linii są naprawdę trudne.

Często wystarczającym rozwiązaniem jest wydzielenie refaktoryzacji przygotowywującego kod pod dodanie nowej funkcjonalnosci do osobnej gałęzi.
Niestety zwykle moje zatwierdzenia wyglądają następująco:

```bash
pick 1111111 refaktoring i formatowanie klasy A
pick 2222222 dodanie funkcjonalności w klasie A
pick 3333333 refaktoring i formatowanie klasy B
pick 4444444 dodanie funkcjonalności w klasie B
pick 5555555 refaktoring i formatowanie klasy C
pick 6666666 dodanie funkcjonalności w klasie C
```

*Oczywiście są to tylko przykładowe opisy zatwierdzeń :)*

Gdybyśmy mogli łatwo doprowadzić historię rewizji do postaci:
```bash
pick 1111111 refaktoring i formatowanie klasy A
pick 3333333 refaktoring i formatowanie klasy B
pick 5555555 refaktoring i formatowanie klasy C
pick 2222222 dodanie funkcjonalności w klasie A
pick 4444444 dodanie funkcjonalności w klasie B
pick 6666666 dodanie funkcjonalności w klasie C
```
Czyli takiej, że najpierw znajdują się wszystkie rewizje zawierające refaktoryzacje,
a dopiero później całe dodawanie nowej funkcjonalności,
to łatwo moglibyśmy podzielić to na dwie gałęzie.

Na szczęście nie ma nic prostszego.
Wystarczy wpisać tylko w konsoli `git rebase -i HEAD~6` i zmienić kolejność rewizji na taką jak potrzebujemy!
Należy tylko uważać na to by nie skasować żadnej linii,
ponieważ skasowanie linii działa jak polecenie `drop`,
czyli usuwa rewizję.

Uwaga!
Zmiana kolejności rewizji może wymagać od nas użycia poleceń `git add` i `git rebase --continue`,
podobnie jak przy używaniu polecenia `git rebase NAZWA_GAŁĘZI`

### Widzieć więcej
Czasem by móc podjąć decyzję, które rewizje zmodyfikować, musimy widzieć ich zawartość.
Są do tego różne programy
ale ja polecam ***Tig**: text-mode interface for Git*,
które na **[Ubuntu]** można zainstalować za pomocą:
```bash
sudo apt-get install tig
```
Jego główną zaletą jest to,
że jest aplikacją konsolową z przyjaznym interfejsem tekstowym (ang. *text-based user interface*, *TUI*)

## Podsumowanie
Widać że `git rebase -i` to potężne narzędzie z wieloma możliwościami w rękach dobrego programisty.
Polecenie `edit` jest opisane w kolejnym [artykule](/git-rebase-i-edit).

[Ubuntu]: /posts-by-tools/ubuntu