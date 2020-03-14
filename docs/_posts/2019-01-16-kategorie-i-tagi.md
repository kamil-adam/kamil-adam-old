---
title:    "Jekyll - kategorie i tagi"
author:   TheKamilAdam
category: jekyll
tags:     blog
tools:    jekyll  
redirect_from:
  - kategorie-i-tagi
  - jekyll/kategorie-i-tagi
  - writeonlydoc/kategorie-i-tagi
  - writeonlydoc/2019/01/16/kategorie-i-tagi.html
---


Opublikowałem już kilka artykułów na blogu i chciałem je w jakiś sposób pogrupować.
Najlepiej za pomocą kategorii i tagów.

## Metadane

Dla każdego postu oprócz zawartości zapisywałem także metadane,
w tym kategorie i tagi.
W przypadku tego artykułu są to:

{%raw%}
```yaml
---
layout:   post
title:    "Jekyll - kategorie i tagi"
author:   TheKamilAdam
category: jekyll
tags:     jekyll blog
---
```
{%endraw%}

Artykuł może zawierać wiele tagów, ale musi mieć dokładnie jedną kategorię.

## Strony pomocnicze

Jest to najprawdopodobniej największa wada Jekylla.
Dla każdej kategorii i dla każdego taga trzeba utworzyć stronę pomocniczą.
Strony pomocnicze kategorii muszą znajdować się w folderze `_categories`,
a strony pomocnicze tagów w folderze `_tags`.

Przykładowy strona pomocnicza dla kategorii:

{%raw%}
```yaml
---
permalink: /categories/resentiment
layout: page-category
category: "resentiment"
---
Opis powstawania projektu <a href="https://github.com/writeonly/resentiment">resentiment</a>.
```
{%endraw%}

Przykładowy strona pomocnicza dla tagu:

{%raw%}
```yaml
---
permalink: /posts-by-tools/scala-native
layout: page-tag
tag: "scala-native"
---
```
{%endraw%}

## Kolekcje

Ponieważ stron pomocniczych jest dużo,
dlatego źle jest je trzymać w przestrzeni głównej projektu.
Problem ten można rozwiązać za pomocą kolekcji.
W pliku `_config.yml` dodajemy:

```yaml
collections:
  categories:
    output: true
  tags:
    output: true
```
Od tej pory strony dla kategorii będą znajdować się w katalogu `_categories`,
a strony dla tagów w katalogu `_tags`.


Ale dla mnie nawet to było za dużo.
Dlatego kolekcje przeniosłem do folderu `data`.
W pliku `_config.yml` dodajemy:
```yaml
collections_dir: data
```

Od tej pory:
* w katalogu `data/_categories` znajdują się kategorie artykułów
* w katalogu `data/_posts` znajdują się artykuły
* w katalogu `data/_tags` znajdują się tagi

## Layouts - układy stron

W stronach pomocniczych użyliśmy layoutów `page-categories` i `page-tags`.
Teraz trzeba je zdefiniować.

Układ strony `_layout/page-category.html` zawierający wszystkie artykuły z danej kategorii:

{%raw%}
```yaml
---
layout: default
title: {{ page.category }}
---
<div class="posts">
  {% include breadcrumbs.html %}
  <h1 class="posts-title">Kategoria: {{ page.title }}</h1>

  {{ posts.content }}

  <dl class="posts-nav">
    {% for post in site.posts %}
    {% if post.category == page.category %}
    <dt>
      <a class="posts-nav-item" href="{{ post.url | relative_url }}">
        {{ post.title }}
        <span class="posts-nav-item-date">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="date">
            {{ post.date | date: "%Y-%m-%d" }}
          </time>
        </span>
      </a>
    </dt>
    <dd>
      {% assign tags = post.tags | sort %}
      Tagi:
      {% for tag in tags %}
      <a href="{{ site.baseurl }}/posts-by-tags/{{ tag }}">{{ tag }}</a>
      {% endfor %}
    </dd>
    {% endif %}
    {% endfor %}
  </dl>
</div>
```
{%endraw%}

Układ strony `_layout/page-tag.html` zawierający wszystkie artykuły z danym tagiem:
{%raw%}
```yaml
---
layout: default
title: {{ page.tag }}
---
<div class="posts">
  {% include breadcrumbs.html %}
  <h1 class="posts-title">Tag: {{ page.tag | capitalize }}</h1>

  <dl class="posts-nav">
    {% for post in site.posts %}
    {% if post.tags contains page.tag %}
    <dt>
      <a class="posts-nav-item" href="{{ post.url | relative_url }}">
        {{ post.title }}
        <span class="posts-nav-item-date">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="date">
            {{ post.date | date: "%Y-%m-%d" }}
          </time>
        </span>
      </a>
    </dt>
    <dd>
      Kategoria :
      <a href="{{ site.baseurl }}/categories/{{ post.category }}">{{ post.category | capitalize }}</a>
    </dd>

    {% endif %}
    {% endfor %}
  </dl>
</div>
```
{%endraw%}

W obu przypadkach iterujemy po liście wszystkich artykułów i prostym `if`em wybieramy te które nas interesują.

## Pages - strony specjalne

Potrzebujemy jeszcze jednej rzeczy.

Strona `pages/categories.html` zawierająca listę wszystkich kategorii:
{%raw%}
```yaml
---
layout: posts
title: Kategorie
permalink: /categories/
description: Kategorie artykułów
---
<div class="posts">
  {% assign categories = site.categories | sort: "title" %}
  <dl class="posts-nav">
    {% for node in categories %}
    {% if node.title != null and node.layout == "page-category"  %}
    <dt>
      <a class="posts-nav-item" href="{{ node.url | relative_url }}">{{ node.title }}</a>
    </dt>
    <dd>
      {{ node.content }}
    </dd>
    {% endif %}
    {% endfor %}
  </dl>
</div>
```
{%endraw%}

Strona `pages/tags.html` zawierająca listę wszystkich tagów:
{%raw%}
```yaml
---
layout: posts
title: Tagi
permalink: /posts-by-tags/
description: Tagi artykułów
---
<div class="posts">
  <ul class="posts-nav">
    {% assign tags = site.tags | sort: "title" %}
    {% for node in tags %}
    {% if node.title != null and node.layout == "page-tag" %}
    <li>
      <a class="posts-nav-item" href="{{ node.url | relative_url }}">{{ node.title }}</a>
    </li>
    {% endif %}
    {% endfor %}
  </ul>
</div>
```
{%endraw%}

W obu przypadkach pobieramy listę wszystkich kategorii/tagów i sortujemy po tytułach.
A następnie odrzucamy te które nie są poprawne do wyświetlenia,
czyli zawierają błędny `layout` lub nie posiadają tytułu.


## Podsumowanie

Żeby wszystko działało trzeba było napisać trochę kodu.
Łącznie 17 stron pomocniczych dla tagów, 3 - dla kategorii,
dwa układy stron i dwie strony specjalne do agregacji kategorii i tagów.
Ale oczywiście nie to zajeło najwięcej czasu.
Największym problemem była wolność jaką daje jekyll,
czyli możliwość zbudowania układów stron w dowolny sposób.
