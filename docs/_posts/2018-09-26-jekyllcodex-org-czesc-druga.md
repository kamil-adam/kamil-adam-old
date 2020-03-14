---
title:    "jekyllcodex.org - część druga"
author:   TheKamilAdam
category: jekyll
tags:     blog jekyllcodex seo
tools:    jekyll
redirect_from:
  - jekyllcodex-org-czesc-druga
  - jekyll/jekyllcodex-org-czesc-druga
  - writeonlydoc/jekyllcodex-org-czesc-druga
  - writeonlydoc/2018/09/26/jekyllcodex-org-czesc-druga.html
---

Ponad miesiąc temu, w panice, szukałem prostego skryptu, który by wyświetlał ostrzeżenie o plikach cookies.
Skrypt odnalazłem na stronie [jekyllcodex.org](<https://jekyllcodex.org>).
Strona ta zawiera repozytorium skryptów, które rozszerzają możliwości generatora statycznych stron Jekyll.

Dziś już na spokojnie postanowiłem przejrzeć to repozytorium skryptów.
Przeszukiwanie prowadziłem pod kątem możliwości rozszerzenia funkcjonalności mojego bloga.

## Skrypty, które użyłem
Skrypty wykorzystane przeze mnie podzieliłem na trzy kategorie ze względu na miejsce dodania skryptu:

### Skrypty ogólne
Są to skrypty, które w większości trafiły do układu strony `default.html`:

- [ostrzeżenie o plikach cookies](<https://jekyllcodex.org/without-plugin/cookie-consent/>)
- [seo](<https://jekyllcodex.org/without-plugin/seo/>)
- [kanał rss](<https://jekyllcodex.org/without-plugin/rss-feed/>)
- [przyciski linkujące do kont na portalach społecznościowych](<https://jekyllcodex.org/without-plugin/follow-buttons/>)
- [czat na żywo](<https://jekyllcodex.org/without-plugin/live-chat/>) - jeszcze nie wiem po co, ale dodałem.

### Skrypty dla postów
Są to skrypty, które trafiły do układu strony `post.html`:

- [wskaźnik czasu czytania](<https://jekyllcodex.org/without-plugin/reading-time-indicator/>)
- [przyciski udostępniania dla mediów społecznościowych](<https://jekyllcodex.org/without-plugin/share-buttons/>)

### Skrypty dla stron
Jest to w zasadzie jeden skrypt, który trafił do układu strony `page.html`:

- [okruszki chleba](<https://jekyllcodex.org/without-plugin/breadcrumbs/>) - dla bloga nie za bardzo nie ma sens,
wydaje się przydatny tylko dla stron o zagnieżdżonej hierarchii


## Skrypty, których jeszcze nie użyłem
Niestety nie zdążyłem wypróbować wszystkich skryptów, które mnie ciekawią i które mogłyby być użyteczne na blogu.
Te które pozostały do przetestowania dzielą się na dwie kategorie:

### Skrypty robiące jakąś magię z menu
- [proste menu](<https://jekyllcodex.org/without-plugin/simple-menu/>)
- [mobilne menu](<https://jekyllcodex.org/without-plugin/mobile-menu/>)

### Skrypty dodające wyszukiwarki
- wyszukiwarka oparta o [google](<https://jekyllcodex.org/without-plugin/search-google/>)
- wyszukiwarka oparta o [skrypt lunar](<https://jekyllcodex.org/without-plugin/search-lunr/>)
