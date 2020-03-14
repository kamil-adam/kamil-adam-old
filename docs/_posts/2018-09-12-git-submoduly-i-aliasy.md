---
title: "Git - submoduły i aliasy"
author:   TheKamilAdam
category: cli
tags:     cli alias interpreter
labels:   submodule
langs:    java javascript
tools:    git
redirect_from:
  - git-submoduly-i-aliasy
  - cli/git-submoduly-i-aliasy
  - cli/2018/09/12/git-submoduly-i-aliasy.html
---

*Post oparty na prawdziwych wydarzeniach i traumach*

## Submoduły

Zrobili to!
Mimo że protestowałem.
Do projektu przy którym pracowałem dodali submoduły.

- Jak mogli to zrobić - zadaje pytanie oburzony.
- Prosto - pada odpowiedź - za pomocą polecenia o składni:
```bash
git submodule add link-do-repozytorium opcjonalna-nazwa-folderu
```
A w tym wypadku było to dokładnie:
```bash
git submodule add https://github.com/paulp/sbt-extras.git sbtx
```
wykonane w folderze projektu.

- Ale po co? - drążę dalej temat.
- Żeby współdzielić kod.
- Przecież do tego służą biblioteki! - moje oburzenie sięga zenitu.
- Ale nie zawsze jest to łatwe i możliwe:
  1. Biblioteki trzeba wydawać i trzymać je w menedżerze repozytoriów binarnych (ang. *Binary Repository Manager*),
a takiego menedżera trzeba gdzieś zainstalować.
  2. Menedżer repozytorium binarnych może kosztować, np. dla języka **[Java]** jest za darmo, a dla języka **[JavaScript]** już niekoniecznie.
  3. W językach skryptowych biblioteki są często instalowane do **[interpretera]**
  co może utrudniać instalację programu klientowi
(przykład z pierwszej wersji [Git-Tools-Submodules](<https://git-scm.com/book/en/v1/Git-Tools-Submodules>)).
  4. Nie wszystko da się umieścić w bibliotece, w tym wypadku jest to skrypt do budowania projektu.

## Dodatkowe polecenia
Tak przekonany przestałem marudzić
 i przejrzałem [Git-Tools-Submodules](<https://git-scm.com/book/en/v2/Git-Tools-Submodules>),
 [git-submodule](<https://git-scm.com/docs/git-submodule>)
 oraz [git-clone](<https://git-scm.com/docs/git-clone>).
 Okazało się, że praca z submodułami nie jest taka straszna i sprowadza się głównie do dwóch poleceń:

```bash
git clone --recurse-submodules
git submodule update --init --recursive
```
Pierwsze polecenie ściąga repozytorium ze wszystkimi submodułami.
Drugie - aktualizuje submoduły po przełączeniu się na inną rewizję (ang. *commit*), gałąź lub po aktualizacji gałęzi.

Niestety polecenia te wydłużają i tak długie już polecenia gita.

## Aliasy Basha

Szczęśliwie umiem rozwiązywać problem długich poleceń,
bo znam [aliasy basha](/alias-komenda-powloki-bash).

Pierwsza wersja moich aliasów wyglądała następująco:
```bash
alias g='git'
alias gcl='git clone'
alias gclr='gcl --recurse-submodules'
alias gupdate='git submodule update --init --recursive'
alias gpr='git pull --rebase'
alias gpru='gpr && gupdate'
alias master='git checkout master && gupdate'
alias develop='git checkout develop && gupdate'
```

## Aliasy Gita

Byłem bardzo zadowolony ze swoich aliasów, więc postanowiłem się nimi pochwalić koledze:
- To bez sensu - odpowiedział zdziwiony -
przecież git ma swój system [aliasów](<https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases>).

Po przeczytaniu [Git-Basics-Git-Aliases](<https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases>)
i [git-config](<https://git-scm.com/docs/git-config>)
mój zbiór aliasów zamienił się w zestaw poleceń gita do wykonania:

```bash
git config --global alias.cl 'clone'
git config --global alias.clr 'cl --recurse-submodules'
git config --global alias.update 'submodule update --init --recursive'
git config --global alias.pr 'pull --rebase'
git config --global alias.pru '!git pr && git update'
git config --global alias.master '!git checkout master && git update'
git config --global alias.develop '!git checkout develop && git update'
git config --global alias.tig '!tig'
```
Widać tutaj, że podkomenda `alias` ma dwie składnie:
```bash
git config --global alias.nowa_komenda_gita 'stara_komenda_gita_z_parametrami'
git config --global alias.nowa_komenda_gita '!dowolna_komenda_basha'
```

I od teraz:
* `git cl` - klonuje repozytorium;
* `git clr` - klonuje repozytorium razem z submodułami;
* `git update` - aktualizuje submoduły;
* `git pr` - pobiera zmiany ze zdalnego repozytorium;
* `git pru` - pobiera zmiany ze zdalnego repozytorium i aktualizuje submoduły;
* `git master` - przełącza na gałąź master i aktualizuje submoduły;
* `git develop` - przełącza na gałąź develop i aktualizuje submoduły;
* `git tig` - uruchamia program `tig` (o ile mamy go zainstalowany).

Polecenia te zapisałem w pliku [git_config.sh](<https://github.com/writeonly/cli/blob/master/git_config.sh>)
i można je wykonać poleceniem:
```bash
curl -s https://raw.githubusercontent.com/writeonly/cli/master/git_config.sh | bash
```

[Java]:         /langs/java
[JavaScript]:   /langs/javascript

[interpretera]: /tags/interpreter
