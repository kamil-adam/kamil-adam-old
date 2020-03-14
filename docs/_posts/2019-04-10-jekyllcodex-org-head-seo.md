---
title:    "jekyllcodex.org - problem ze skryptem seo"
author:   TheKamilAdam
category: jekyll
tags:     blog jekyllcodex seo
tools:    jekyll
redirect_from:
  - jekyllcodex-org-head-seo
  - jekyll/jekyllcodex-org-head-seo
  - writeonlydoc/jekyllcodex-org-head-seo
  - writeonlydoc/2019/04/10/jekyllcodex-org-head-seo.html
---

Wyszukiwując swój blog w google trafiłem na brzydki opis w rodzaju:
{%raw%}
```html
for post in paginator. posts %} {{ post. title }} {{ post. date | date:
```
{%endraw%}

wynika to z tego, że skrypt dla **[seo]**
ze strony [jekyllcodex](<https://jekyllcodex.org/without-plugin/seo/>)
generuje skrócony opis nawet dla stron używających liquiidu.
Dokładnie problematyczna jest linia:

{%raw%}
```html
  <meta name="description" content="{% if pagecontent_description.size > 10 %}{{ pagecontent_description }}{% else %}{{ site.description }}{% endif %}">
```
{%endraw%}

i dwie podobne dla niej.

## Pomysł rozwiązania problemu ...
Żeby rozwiązać problem podzieliłem  wszystkie wygenerowane strony na trzy grupy:
* strony nie używające liquidu, można dla nich przygotować skrócony opis - są to artykuły, kategorie, tagi i inne kolekcje
* strony używające liquidu i posiadające własny opis - są to strony statyczne
* strony używające liquidu i nie posiadające własnego opisu, tylko używające domyślnego opis - w moim przypadku jest to tylko jedna strona,
`index.html` zawierająca paginację artykułów

## ... i implementacja algorytmu
Ładnie sformatowany kod rozwiązujący ten problem wygląda następująco:
{%raw%}
```html
{% if page.description %}                {% comment %} jeśli strona posiada opis {% endcomment %}
  {{ page.description }}                 {% comment %} to wyświetl go  {% endcomment %}
{% elsif page.use_default_description %} {% comment %} w przeciwnym wypadku jeśli strona posiada zmienną use_default_description {% endcomment %}
  {{ site.description }}                 {% comment %} to wyświetl domyślny opis {% endcomment %}
{% else %}                               {% comment %} w przeciwnym wypadku {% endcomment %}
  {{ pagecontent_description }}          {% comment %} wyświelt przygotowany skrót {% endcomment %}
{% endif %}
```
{%endraw%}

Co produkcyjnie wygląda
{%raw%}
```html
  <meta name="description" content="{% if page.description %}{{ page.description }}{% elsif page.index %}{{ site.description }}{% else %}{{ pagecontent_description }}{% endif %}">
```
{%endraw%}

A cały skrypt dla **[seo]** ostateczie wygląda:
{%raw%}
```html
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ site.title }}</title>
  {% assign pagecontent_description = page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | strip_html | strip_newlines | replace: '  ', ' ' | truncate: 160 %}
  <meta name="description" content="{% if page.description %}{{ page.description }}{% elsif page.index %}{{ site.description }}{% else %}{{ pagecontent_description }}{% endif %}">

  <link rel="shortcut icon" type="image/png" href="/img/icon-196x196.png">
  <link rel="shortcut icon" sizes="196x196" href="/img/icon-196x196.png">
  <link rel="apple-touch-icon" href="/img/icon-196x196.png">

   <!-- Facebook and Twitter integration -->
  <meta property="og:title" content="{{ page.title }}"/>
  {% if page.image %}<meta property="og:image" content="{{ site.url }}{{ page.image }}"/>{% endif %}
  <meta property="og:url" content="{{ site.url }}{{ page.url }}"/>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="{{ site.title }}"/>
  <meta property="og:description" content="{% if page.description %}{{ page.description }}{% elsif page.index %}{{ site.description }}{% else %}{{ pagecontent_description }}{% endif %}"/>

  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="{{ site.twitter_url }}">
  <meta name="twitter:title" content="{{ page.title }}" />
  {% if page.image %}<meta name="twitter:image" content="{{ site.url }}{{ page.image }}" />{% endif %}
  <meta name="twitter:url" content="{{ site.url }}{{ page.url }}" />
  <meta name="twitter:description" content="{% if page.description %}{{ page.description }}{% elsif page.index %}{{ site.description }}{% else %}{{ pagecontent_description }}{% endif %}" />

  <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.baseurl | prepend: site.url }}">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title }}" href="{{ "/feed.xml" | prepend: site.baseurl | prepend: site.url }}">
  <link rel="sitemap" type="application/xml" title="Sitemap" href="{{ "/sitemap.xml" | prepend: site.baseurl | prepend: site.url }}" />
```
{%endraw%}

Aktualny skrypt do pobrania pod linkiem znajduje się dpo linkiem
[head-seo.html](<https://raw.githubusercontent.com/writeonly/writeonly.github.io/master/_includes/head-seo.html>).
Należy umieścić go wewnątrz znaczników `<head />` za pomocą kodu `{%raw%}{% include head-seo.html %}{%endraw%}`.

## Podsumowanie
Nalezy sprawdzać i testować cudze skrypty. Zawsze.

[seo]: /posts-by-tags/seo