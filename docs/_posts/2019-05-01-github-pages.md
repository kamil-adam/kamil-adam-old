---
layout:   post
title:    'Lokalne uruchamianie strony hostowanej na GitHub Pages'
author:   kamil-adam
category: writeonlydoc
tags:     jekyll json alias github github-pages
lang:     go ruby
---

Jedną z największych zalet generator statycznych stron **[Jekyll](/posts-by-tags/jekyll)** jest to,
że jest wspierany przez portal *[Github](<https://github.com/>)*
za pomocą  **[Github Pages](/posts-by-tags/github-pages)**.
Gdyby nie *Github Pages* prawdopodobnie wybrałbym *[Hugo](<https://github.com/gohugoio/hugo>)*
napisane w języku **[Go](/posts-by-langs/go)**
do budowania tego bloga.
Największą wadą *Github Pages* jest to,
że posiada ograniczony zbiór dozwolonych wtyczek i nie wolno instalować własnych wtyczek.
Listę dozwolonych wtyczek (wraz z wersjami) można znaleźć na stronie [Dependency versions](https://pages.github.com/versions/)
lub pod postacią pliku **[json](/posts-by-tags/json)** na stronie [versions.json](<https://pages.github.com/versions.json>).

Chcąc budować i uruchamiać stronę lokalnie (poza *GitHub Pages*) za pomocą poleceń:
```bash
jekyll build
jekyll serve
```

należy posiadać w pliku `Gemfile.lock` dokładnie te same wersje wtyczek jakie są w pliku [versions.json](<https://pages.github.com/versions.json>).
Dlaczego dokładnie te same?
Ponieważ w przeciwnym wypadku możemy mieć trudne do odtworzenia błędy na produkcji,
a komunikaty przychodzące z *GitHub Pages* nie są zbyt wiele mówiące.

Wersje wtyczek można synchronizować ręcznie.
Można także napisać skrypt,
który będzie parsować plik [versions.json](<https://pages.github.com/versions.json>)
i na tej podstawie budował plik `Gemfile.lock`.
Brzmi strasznie.

Na szczęście żadne z tych rozwiązań nie jest potrzebne,
ponieważ *GitHub* udostępnia gem `github-pages` (bibliotekę języka **[Ruby](/posts-by-lang/ruby)**) zawierający wersję wszystkich wspieranych wtyczek dla Jekylla.
Także wtyczki są zwykłymi gemami (bibliotekami) języka **[Ruby](/posts-by-lang/ruby)**.
Więc jedyne co potrzebujemy to program `bundle` do zarządzania zależnościami w języku **[Ruby](/posts-by-tags/ruby)**.

## Ukryta strona dokumentacji

**[Jekyll](/posts-by-tags/jekyll)** posiada informację o integracji z *GitHub Pages*.
Niestety znajduje się to na [ukrytej stronie dokumentacji](<https://jekyllrb.com/docs/github-pages/>),
tzn. nie znajdującej się w menu nawigacyjnym dokumentacji.
Informuje ona jak zainstalować i używać gem `github-pages`.

## Instalacja `github-pages`

W pliku `Gemfile` umieszczamy:
```bash
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
```
Od teraz plik `Gemfile.lock` nigdy nie będzie nam potrzebny,
więc możemy dodać go do ignorowanych.

Do pliku `.gitignore` dodajemy:
```bash
Gemfile.lock
```

I budujemy oraz uruchamiamy stronę lokalnie:
```bash
jekyll build
jekyll serve
```

## Problemy Jekylla

niestety uruchomienie polecenia `jekyll build` powoduje błąd:
```bash
Traceback (most recent call last):
	10: from /home/kamil-adam/gems/bin/jekyll:23:in `<main>'
	 9: from /home/kamil-adam/gems/bin/jekyll:23:in `load'
	 8: from /var/lib/gems/2.5.0/gems/jekyll-3.8.5/exe/jekyll:11:in `<top (required)>'
	 7: from /var/lib/gems/2.5.0/gems/jekyll-3.8.5/lib/jekyll/plugin_manager.rb:50:in `require_from_bundler'
	 6: from /var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler.rb:107:in `setup'
	 5: from /var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler/runtime.rb:26:in `setup'
	 4: from /var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler/runtime.rb:26:in `map'
	 3: from /var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler/spec_set.rb:148:in `each'
	 2: from /var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler/spec_set.rb:148:in `each'
	 1: from /var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler/runtime.rb:31:in `block in setup'
/var/lib/gems/2.5.0/gems/bundler-2.0.1/lib/bundler/runtime.rb:319:in `check_for_activated_spec!': You have already activated addressable 2.6.0, but your Gemfile requires addressable 2.5.2. Prepending `bundle exec` to your command may solve this. (Gem::LoadError)
```

Z niewiadomych dla mnie powodów Jekyll ma problem,
ale zasugerowane przez niego rozwiązanie działa.
Od teraz budujemy i uruchamiamy generator Jekyll za pomocą poleceń:
```bash
bundle exec jekyll build
bundle exec jekyll serve
```

lub krócej:

```bash
bundle exec jekyll b
bundle exec jekyll s
```

## Aliasy

Polecenie `bundle exec jekyll` aż prosi się zastąpienie jakimś **[aliasem](/posts-by-tags/alias)**,
np. `bejekyll`.

W konsoli wpisujemy:
```bash
echo  "alias bejekyll='bundle exec jekyll'" >> ~/.bashrc
```

lub
```bash
echo  "alias bejekyll='bundle exec jekyll'" >> ~/.bash_aliases
```
jeśli używamy pliku `~/.bash_aliases`.


Następnie w konsolę wpisujemy:
```bash
. ~/.bashrc
```

lub
```bash
srcsh
```
jeśli używamy [niezniszczalnych aliasów](/cli/2018/08/30/alias-komenda-powloki-bash).

I od teraz możemy budować i uruchamiać naszą stronę lokalnie za pomocą:

```bash
bejekyll b
bejekyll s
```

## Podsumowanie
*GitHub Pages* z generatorem stron **[Jekyll](/posts-by-tags/jekyll)** 
są ciekawą i darmową alternatywą dla klasycznych sposobów prowadzenia bloga lub strony.
Możliwość uruchamiania strony w takiej samej konfiguracji lokalnie jak na produkcji
czyni z tego połączenia rozwiązanie skierowane nie tylko do hobbystów,
ale także dla rozwiązań biznesowych.