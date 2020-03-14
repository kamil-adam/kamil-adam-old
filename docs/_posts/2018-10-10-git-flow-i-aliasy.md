---
title: "Git-flow i aliasy"
author:   TheKamilAdam
category: cli
tags:     alias cli 
labels:   flow
tools:    git
redirect_from:
  - git-flow-i-aliasy
  - cli/git-flow-i-aliasy
  - cli/2018/10/10/git-flow-i-aliasy.html
---

Gitflow jest wspaniałą koncepcją pracy z gałęziami w repozytorium Git.
Strategia ta jest świetnie opisana na
[A successful Git branching model](<https://nvie.com/posts/a-successful-git-branching-model/>).

Jednak początkowo może wydawać się zbyt skomplikowana.
Straszy zwłaszcza ilością poleceń, które trzeba wykonać, żeby scalić gałąź z nową funkcjonalnością:
```bash
$ git checkout develop
$ git merge --no-ff myfeature
$ git branch -d myfeature
$ git push origin develop
```

Ilość poleceń, parametrów i przełączników może powodować niekończące się problemy i dyskusje
 "czy na pewno potrzebujemy czegoś tak skomplikowanego?".

Na szczęście istnieje 'git-flow'.

## Narzędzie git-flow

> git-flow jest zbiorem rozszerzeń gita dostarczającym wysokopoziomowe operacje na repozytorium,
 wspierającym strategię rozgałęziania opracowaną przez Vincenta Driessena.
Za [ściągawka do git-flow](<https://danielkummer.github.io/git-flow-cheatsheet/index.pl_PL.html>)

Tutaj już nie mogą toczyć się dyskusje czy powinniśmy scalać z przełącznikiem `--no-ff` czy bez niego.
Możemy wziąć całe narzędzie ustandaryzowane i przetestowane przez społeczność i nie kroimy niczego własnego.

Zalety tego są oczywiste:
* programista, tester i/lub wdrożeniowiec,
który raz nauczył się pracować z Gitflow ma jedną rzecz mniej do nauki przy przenoszeniu się do innego zespołu,
gdzie będą stosować dokładnie ten sam Gitflow bez żadnych lokalnych modyfikacji
* zamiast wpisywania długich wielolinijkowców w konsoli możemy używać pojedynczych poleceń.


## Moje aliasy

Jednak nawet te polecenia są dla mnie za długie.
Dlatego przygotowałem [plik](<https://github.com/writeonly/cli/blob/master/git_config.sh>) z [aliasami Basha](/git-submoduly-i-aliasy)

```bash
# git flow
git config --global alias.fi 'flow init'
# git flow feature
git config --global alias.ffstart 'flow feature start'
git config --global alias.fffinish 'flow feature finish '
git config --global alias.ffpublish 'flow feature publish'
git config --global alias.ffpull 'flow feature pull origin'
git config --global alias.fftrack 'git flow feature track'
# git flow release
git config --global alias.frstart 'flow release start'
git config --global alias.frpusblish 'flow release publish'
git config --global alias.frfinish 'flow release finish'
# git flow hotfix
git config --global alias.fhstart 'flow hotfix start'
git config --global alias.fhfinish 'flow hotfix finish'
```

Można go zastosować poleceniem
```bash
curl -s https://raw.githubusercontent.com/writeonly/cli/master/git_config.sh | bash
```

i cieszyć się krótkimi poleceniami jak:
```bash
git ffstart myfeature
git fffinish myfeature
```
