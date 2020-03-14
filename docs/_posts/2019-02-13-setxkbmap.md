---
title:    "setxkbmap - Jak szybko zmienić układ klawiatury z konsoli na Ubuntu?"
author:   TheKamilAdam
category: cli
tags:     cli
langs:
tools:    bash ubuntu
libs:
redirect_from:
  - setxkbmap
  - cli/setxkbmap
  - cli/2019/02/13setxkbmap.html
---

Po długiej przerwie prosty artykuł "Jak szybko zmienić układ klawiatury z konsoli na **[Ubuntu]**?".


## Problem

Podczas pracy na Xubuntu zainstalowanym na wirtualnej maszynie często zmienia mi się układ klawiatury z polskiej na amerykańską.
Na **[Ubuntu]** można odwrócić ten proces w łatwy sposób za pomocą ikonki na pasku zadań,
jednak już w Xubuntu ta opcja jest ukryta głęboko w trzewiach ustawień systemowych.
Dlatego prościej jest to zrobić z linii poleceń.


## Rozwiązanie - setxkbmap

Aby szybko zmienić układ klawiatury, wystarczy zainstalować 'setxkbmap' za pomocą polecenia:
```bash
sudo apt-get install x11-xkb-utils
```

Następnie można łatwo zmieniać układ klawiatury za pomocą polecenia:
```bash
setxkbmap pl
```

Pomoc można wyświetlić za pomocą polecenia:
```bash
setxkbmap -help
```

Pomoc polecenia w wersji 'setxkbmap 1.3.1' :
```
Usage: setxkbmap [options] [<layout> [<variant> [<option> ... ]]]
Options:
  -?, -help           Print this message
  -compat <name>      Specifies compatibility map component name
  -config <file>      Specifies configuration file to use
  -device <deviceid>  Specifies the device ID to use
  -display <dpy>      Specifies display to use
  -geometry <name>    Specifies geometry component name
  -I <dir>            Add <dir> to list of directories to be used
  -keycodes <name>    Specifies keycodes component name
  -keymap <name>      Specifies name of keymap to load
  -layout <name>      Specifies layout used to choose component names
  -model <name>       Specifies model used to choose component names
  -option <name>      Adds an option used to choose component names
  -print              Print a complete xkb_keymap description and exit
  -query              Print the current layout settings and exit
  -rules <name>       Name of rules file to use
  -symbols <name>     Specifies symbols component name
  -synch              Synchronize request with X server
  -types <name>       Specifies types component name
  -v[erbose] [<lvl>]  Sets verbosity (1..10); higher values yield more messages
  -version            Print the program's version number
  -variant <name>     Specifies layout variant used to choose component names
```

Aby przełączać się na polski układ klawiatury za każdym razem,
gdy jest otwierany nowy terminal wystarczy dodać wywołanie polecenia `setxkbmap` do pliku `~/.bashrc` za pomocą polecenia:
```bash
echo "setxkbmap pl" >> ~/.bashrc
```

[Ubuntu]: /posts-by-tools/ubuntu
