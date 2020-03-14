---
title:    'Krótki wpis o tym jak Google niszczy konkurencję'
author:   TheKamilAdam
category: jekyll
tags:     css html
langs:    javascript
tools:    jekyll
redirect_from:
  - preload-css
  - jekyll/preload-css
---

Żyję sobie spokojnie jak gdyby nigdy nic i nagle @cerrato z [4programmers.net](https://4programmers.net/) pisze do mnie,
że moja strona mi się rozjechała i podsyła screena.
Patrzę i faktycznie plik [CSS] się w ogóle nie wczytał.
Sprawdzam w Chromium, Chromie, Operze i Edge i wszędzie działa. 
Pytam się @cerrato co za niszową przeglądarkę używa. 
Firefox, a wszystkie przeglądarki w których testowałem są oparte na silniku z Chromium.
Chyba już tylko Firefox ma niespokrewniony silnik.

## Analiza

Często analizuję swoją statyczną stronę generowaną przez Jekylla w [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). 
Ostatnio Google stwierdził,
że źle robię wczytując [blokująco swoje CSSy](https://web.dev/render-blocking-resources/?utm_source=lighthouse&utm_medium=unknown)
i dał mi poradę z [preload](https://web.dev/defer-non-critical-css/).

W rezultacie moje ładowanie pliku [CSS] przed uruchomieniem jekylla wygląda następująco:
{% raw %}
```html
  <link rel="preload" href="{{ site.baseurl }}/assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/style.css">
  </noscript>
```
{% endraw %}

Co ostatecznie daje następujący kod [html]:
```html
  <link rel="preload" href="{{ site.baseurl }}/assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/style.css">
  </noscript>
```
Czyli jeśli przeglądarka ma włączony [JavaScript] to plik [CSS] jest ładowany asynchronicznie. 
W przeciwnym wypadku jest wykonane klasyczne ładowanie synchroniczne. 

Niestety Google nie powiedział,
że [preload nie jest wspierany przez Firefox](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content) :(

Dlaczego Firefox nie wspiera `preload`? 
Bo `preload` nie jest w standardzie,
ale jest w [drafcie standardu](https://w3c.github.io/preload/#x2.link-type-preload) i jest duża szansa, że będzie. 
Moim skromnym zdaniem Firefox nie nadąża lub ogranicza zasoby na programistów.

## Rozwiązanie

Rozwiązaniem na szybko jest oczywiście usunięcie `preload` z kodu [HTML].
Nie jest to oczywiście rozwiązanie zadowalające.

Na szczęście istnieje skrypt [loadCSS](https://github.com/filamentgroup/loadCSS),
który rozwiązuje wszystkie moje problemy.
W rezultacie moje ładowanie pliku [CSS] przed uruchomieniem jekylla wygląda następująco:
{% raw %}
```html
  <link rel="preload" href="{{ site.baseurl }}/assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/style.css">
  </noscript>
  <script type="text/javascript">
   {% include loadCss.js %}
  </script>
```
{% endraw %}

A po uruchomieniu jekylla dostaję: 
```html
  <link rel="preload" href="{{ site.baseurl }}/assets/css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/style.css">
  </noscript>
  <script type="text/javascript">
   {% include loadCss.js %}
  </script>
```

# Podsumowanie
* Nie ufaj Googlowi, niszczą konkurencję
* Warto testować strony na Firefoxie

[JavaScript]: /posts-by-langs/javascript

[jekyll]:     /posts-by-tools/jekyll

[CSS]:        /posts-by-tags/css
[html]:       /posts-by-tags/html
