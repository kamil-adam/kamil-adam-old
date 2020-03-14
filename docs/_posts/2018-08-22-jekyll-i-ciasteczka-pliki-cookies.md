---
title:    "Jekyll i ciasteczka (pliki cookies)"
author:   TheKamilAdam
category: jekyll
tags:     blog jekyllcodex github-pages
labels:   cookies
tools:    jekyll
libs:     jquery
redirect_from:
  - jekyll-i-ciasteczka-pliki-cookies
  - jekyll/jekyll-i-ciasteczka-pliki-cookies
  - writeonlydoc/jekyll-i-ciasteczka-pliki-cookies
  - writeonlydoc/2018/08/22/jekyll-i-ciasteczka-pliki-cookies.html
---

Przed założeniem bloga opartego na technologiach **[Jekyll]** i **[GitHub Pages]** 
przejrzałem sporo polskojęzycznych blogów z opisem “Jak to zrobić”.
Wszyscy mówili, że jest to niesamowicie proste.
Za wyjątkiem jednego malkontenta, Gutka (<https://blog.gutek.pl/2014/10/30/nowy-blog-2/>).

Pierwszy wieczór spędziłem na nieudanej instalacji Jekylla i próbie uruchomienia przykładowego bloga opartego na motywie graficznym BlackDocs
(<https://github.com/karloespiritu/BlackDoc>).
Wieczór zakończyłem w momencie przeczytania porady na StackOverflow “usuń Rubiego i zainstaluj wszystko ponownie”.
Wtedy stwierdziłem, że może jednak Gutek ma rację i Jekyll bywa problematyczny.

Jednak nie poddałem się i po paru wieczorach miałem pusty blog z możliwością komentowania postów i skryptem raportującym statystyki
(funkcjonalność dodana według <https://devcave.pl/dajsiepoznac2017/jekyll-disqus-comments-google-analitics>)
oraz nie do końca skonfigurowaną wyszukiwarką (<https://devcave.pl/frontend/wyszukiwarka-na-blogu-bez-backendu>).
W tym momencie uznałem, że dalsze usprawnianie bloga, który nie zawiera żadnej treści, nie ma żadnego sensu.
W związku z czym odłożyłem na czas późniejszy dodawanie tagów i kategorii “bez użycia pluginu”
(<https://devenv.pl/pierwsze-zetkniecie-jekyll-podzial-kategorie/> i <http://www.minddust.com/post/tags-and-categories-on-github-pages/>).
A nuż w międzyczasie plugin dla kategorii znajdzie się na liście pluginów wspieranych przez **[GitHub Pages]**
(Aktualna lista wspieranych pluginów <https://pages.github.com/versions/>).

Po opublikowaniu pierwszego posta czułem jednak, że dalej czegoś brakuje. Wciśnięcie F12 i spojrzenie w kod strony było przerażające.
Ujrzałem spaghetti w postaci naprzemiennie występujących fragmentów HTML, CSS i JS.
Ale najgorsze było, gdy spojrzałem na zakładkę “Storage”.
Okazało się, że moja prosta strona internetowa zapisuje, o zgrozo, ciasteczka.
O ile ciasteczko dla systemu komentarzy Disqus można jeszcze obronić, że jest technicznie potrzebne do działania funkcjonalności,
o tyle ciasteczko dla Google Analytics jest już jawnym śledzeniem użytkownika!

Poszukiwanie rozwiązania mojego problemu doprowadziło mnie do strony <https://jekyllcodex.org/> ,
a dokładniej do sekcji “Without plugins” (<https://jekyllcodex.org/without-plugins/>).
Znalazłem tam skrypt wyświetlający banner informujący o plikach Cookies. Po moich przeróbkach wygląda on tak:

```html
<style>
    #cookie-notice {padding: 7px 15px; display: none; text-align: center; position: fixed; bottom: 0; width: 100%; background: #222; color: rgba(255,255,255,0.8);}
    #cookie-notice a {cursor: pointer; margin-left: 10px;}
    @media (max-width: 767px) {
        #cookie-notice span {display: block; padding-top: 3px; margin-bottom: 13px;}
        #cookie-notice a {position: relative; bottom: 4px;}
    }
</style>
<div id="cookie-notice">
    <span>
        Blog, o języku programowania Scala, WriteOnly.pl przechowuje pliki cookies (tzw. ciasteczka) w celach statystycznych i funkcjonalnych.
    </span>
    <a id="cookie-notice-accept" class="btn btn-primary btn-sm">Tak wiem i akceptuję.</a>
    <a href="/privacy/" class="btn btn-primary btn-sm">Chcę dowiedzieć się więcej</a>
</div>
<script>
    function createExpires(days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        return "; expires=" + date.toUTCString();
    }
    function createCookie(name,value,days) {
        const expires = days ? createExpires(days) : "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    function readCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    function isTrue(value) {
        return value == 'true'
    }
    const cookieNoticeDismissed = isTrue(readCookie('cookie-notice-dismissed'))
    if(!cookieNoticeDismissed) {
        $('#cookie-notice').show();
    }
    $('#cookie-notice-accept').click(function() {
        createCookie('cookie-notice-dismissed','true',31);
        $('#cookie-notice').hide();
    });
</script>

```

Czuję, że na stronie <https://jekyllcodex.org/> spędzę więcej czasu  z czego wynikają dwie smutne informacje:
* później zacznę pisać o języku **[Scala]**
* istnieje niebezpieczeństwo, że nauczę się jQuery

[Scala]:        /posts-by-langs/scala

[Jekyll]:       /posts-by-tools/jekyll

[GitHub Pages]: /posts-by-tags/github-pages
