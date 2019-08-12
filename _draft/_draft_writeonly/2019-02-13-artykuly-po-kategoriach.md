---
layout:   post
title:    'Artykuły po kategoriach'
author:   "writeonly"
category: writeonlydoc
tags:     writeonlydoc jekyll liquid
labels:   scalatic
comments: true
toc:      true
---

Płynny plik dołączania dla Jekyll do grupowania przez tablicę

Jekyll Group-By-Array
Płynny plik dołączania dla Jekyll, który umożliwia zgrupowanie obiektu według tablicy. Na przykład może służyć do wyświetlania postów według tagów.

Stosowanie
Skopiuj plik group-by-array.html do katalogu _includes projektu Jekyll.

Dołącz plik do szablonu, przekazując do kolekcji i zmiennej pola. Następnie Jekyll Group-By-Array ustawi nazwy grup i zmienne globalne elementów grupy z wynikami.

Na przykład:

---
układ: strona
tytuł: Tagi
permalink: / tags /
---

{% include group-by-array.html collection = site.posts field = 'tags'%}

<ul>
  {% dla tagu w group_names%}
    {% assign posts = group_items [forloop.index0]%}

    <li>
      <h2> {{tag}} </h2>
      <ul>
        {% dla posta w postach%}
        <li>
          <a href='{{ site.baseurl }}{{ post.url }}'> {{post.title}} </a>
        </li>
        {% endfor%}
      </ul>
    </li>
  {% endfor%}
</ul>
Rozszerzony przykład można znaleźć w tej przykładowej gałęzi grupowej repozytorium Fresh Jekyll.

Przyczynianie się
Rozwidl to
Utwórz gałąź funkcji (git checkout -b my-new-feature)
Zatwierdź zmiany (git commit -am „Dodaj jakąś funkcję”)
Naciśnij na gałąź (git push origin my-new-feature)
Utwórz nowe żądanie ściągnięcia






https://github.com/mushishi78/jekyll-group-by-array



```jekyll
{% comment %} Initialize {% endcomment %}
{% assign __empty_array = '' | split: ',' %}
{% assign group_names = __empty_array %}
{% assign group_items = __empty_array %}

{% comment %} Map {% endcomment %}
{% assign __names =  include.collection | map: include.field %}

{% comment %} Flatten {% endcomment %}
{% assign __names =  __names | join: ',' | join: ',' | split: ',' %}

{% comment %} Uniq {% endcomment %}
{% assign __names =  __names | sort %}
{% for name in __names | sort %}

{% comment %} If not equal to previous then it must be unique as sorted {% endcomment %}
{% unless name == previous %}

{% comment %} Push to group_names {% endcomment %}
{% assign group_names = group_names | push: name %}
{% endunless %}

{% assign previous = name %}
{% endfor %}


{% comment %} group_items {% endcomment %}
{% for name in group_names %}

{% comment %} Collect if contains {% endcomment %}
{% assign __item = __empty_array %}
{% for __element in include.collection %}
{% if __element[include.field] contains name %}
{% assign __item = __item | push: __element %}
{% endif %}
{% endfor %}

{% comment %} Push to group_items {% endcomment %}
{% assign group_items = group_items | push: __item %}
{% endfor %}
```

Widać tutaj



```html

---
layout: page
title: Artykuły po kategorii
permalink: /posts-by-category/
description: Artykuły po kategorii
---
{% include group-by-array.html collection=site.posts field='category' %}
<div class="posts">
  <dl class="posts-nav">
    {% for name in group_names %}
    {% assign posts = group_items[forloop.index0] %}
    <dt>
      <h2>
        <a href="{{ site.baseurl }}/categories/{{ name }}">{{ name }}</a>
      </h2>
    </dt>
    <dd>
      <ul>
        {% for post in posts %}
        <li>
          <a class="posts-nav-item" href="{{ post.url | relative_url }}">
            {{ post.title }}
            <span class="posts-nav-item-date">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="date">
            {{ post.date | date: "%Y-%m-%d" }}
          </time>
        </span>
          </a>
        </li>
        {% endfor %}
      </ul>
    </dd>
    {% endfor %}
  </dl>
</div>

```

```html

---
layout: page
title: Artykuły po tagach
permalink: /posts-by-tags/
description: Artykuły po tagach
---
{% include group-by-array.html collection=site.posts field="tags" %}
<div class="posts">
  <dl class="posts-nav">
    {% for name in group_names %}
    {% assign posts = group_items[forloop.index0] %}
    <dt>
      <h2>
        <a href="{{ site.baseurl }}/tags/{{ name}}">{{ name }}</a>
      </h2>
    </dt>
    <dd>
      <ul>
        {% for post in posts %}
        <li>
          <a class="posts-nav-item" href="{{ post.url | relative_url }}">
            {{ post.title }}
            <span class="posts-nav-item-date">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="date">
            {{ post.date | date: "%Y-%m-%d" }}
          </time>
        </span>
          </a>
        </li>
        {% endfor %}
      </ul>
    </dd>
    {% endfor %}
  </dl>
</div>
```