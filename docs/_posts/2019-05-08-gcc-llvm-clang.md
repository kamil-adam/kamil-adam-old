---
title:    'Krótki opis konstrukcji kompilatorów GCC, LLVM i Clang'
author:   kamil-adam
category: onions
tags:     clang llvm compiler parser lexer ast scala-native cli
labels:   gcc ir r
langs:    haskell java kotlin lua python ruby crystal julia pony rust go lisp
---

W dawnych czasach każdy dobry programista chciał napisać swój własny **[kompilator](/posts-by-tags/compiler)** języka C.
Co prawda te czasy już minęły i dziś większość z nas programuje w językach o wiele bardziej złożonych niż C.
Dzięki czemu jesteśmy w stanie pisać szybciej kod.
Ale nadal warto znać podstawy budowy kompilatorów.
Na szczęście konstrukcja kompilatora jest prosta jak konstrukcja dzidy bojowej. 
Dzida bojowa składa się z:
1. przeddzidzia dzidy bojowej 
2. śróddzidzia dzidy bojowej
3. zadzidzia dzidy bojowej.

## Konstrukcja kompilatora
Podobnie jest z kompilatorem.
**[Kompilator](/posts-by-tags/compiler)** języka programowania składa się z:
1. front-endu, zależnego od języka wejściowego
2. middle-endu, clou kompilatora
3. back-endu, zależnego od architektury docelowej

Zgadza się.
Dobrze widzicie.
Pojęcia front-end i back-end są starsze niż aplikacje jednostronicowe (ang. *single-page application*, *SPA*). 

### Front-end
Front-end kompilatora składa się z:
1. analizatora leksykalnego (**[leksere](/posts-by-tags/lexer)**) - wynikiem działania jest ciąg leksemów (tokenów z typami)
2. analizatora składniowego (**[parsera](/posts-by-tags/parser)**) - wynikiem jest drzewo **[AST](/posts-by-tags/ast)**
3. analizatora semantycznego - wynikiem jest zmodyfikowane drzewo AST z tablicą symboli. 
Analizator semantyczny zajmuje się:
    * kontrolą nazw
    * kontrolą typów
    * kontrolą poprawności instrukcji
4. optymalizatora drzewa AST - wykonuje optymalizacje zależne od języka wejściowego
5. generatora reprezentacji pośredniej (ang. *Intermediate representation*,  *IR*) -
drzewo zostaje spłaszczone do uniwersalnego bytecodu lub uniwersalnego języka asemblerowego czytelnego dla człowieka

### Middle-end
Zwany też optymalizatorem reprezentacji pośredniej.
Dokonuje optymalizacji uniwersalnych, 
czyli wszystkie optymalizacje niezależne od języka wejściowego i architektury docelowej.
Z jednej strony jest to najmniej potrzebna część kompilatora.
Z drugiej to właśnie rozbudowany optymalizator decyduje o tym, 
który **[kompilator](/posts-by-tags/compiler)** jest najlepszy.

### Back-end
Back-end kompilatora składa się z:
1. optymalizator kodu wynikowego, wykonuje optymalizacje zależne od architektury docelowej
2. generacja kodu binarnego lub asemblera architektury docelowej

Poziom skomplikowania back-endu zależy od architektury docelowej.

Architektury *RISC* (ang. *Reduced Instruction Set Computing*),
*MISC* (ang. *Minimal Instruction Set Computer*)
oraz *OISC* (ang *One Instruction Set Computer*)
posiadają zwykle prosty i przejrzysty język asemblera,
dlatego back-end dla nich także jest prosty.
Przykładem architektury *RISC* jest architektura ARM oraz AVR.

Architektura *CISC* (ang. *Complex Instruction Set Computing*)
jest skomplikowana, a więc także back-end dla niej będzie zawierać wiele hacków.
Przykładem tej architektury jest architektura x86 oraz rodzina mikrokontrolerów MCS-51.

## GCC i LLVM

Przez lata najbardziej znanym opensoursowym i najlepszym kompilatorem o tej budowie był GCC
(kiedyś *GNU C Compiler* , dziś *GNU Compiler Collection*).
Jednak dziś powoli palmę pierwszeństwa odbiera mu **[LLVM](/posts-by-tags/llvm)**
(kiedyś *Low Level Virtual Machine*, dziś nazwa się nie rozwija ponieważ jest to **[kompilator](/posts-by-tags/compiler)**, a nie maszyna wirtualna).

LLVM powstał z projektu badawczego na temat kompilacji.
Naukowcy wzięli frond-end z GCC i dopisali własny middle-end i back-end.
Później gdy firma Apple sypneła kasą projekt rozrósł się do prawdziwego kompilatora,
ale dalej na otwartej licencji.

Dlaczego naukowcy nie użyli middle-endu z GCC?
Każdy kto spojrzał w kod GCC wie dlaczego.
Ponieważ GCC jest napisany w języku C oraz **[Lispie](/posts-by-langs/lisp)**,
dwóch ulubionych językach [rms](<https://pl.wikipedia.org/wiki/Richard_Stallman>).
Dzięki temu połączeniu w GCC jest osiągany polimorfizm.

Kompilacja GCC składa się z kilku etapów.
Pierwszym jest skompilowanie własnej wersji interpretera **[Lispa](/posts-by-langs/lisp)** napisanego w C.
Następnie wczytywany jest deklaratywny kod w Lispie opisujący docelową architekturę.
Na podstawie kodu w Lispie generowany jest kod w C dla docelowej architektury.
Kompilowany jest kod dla docelowej architektury.
Niestety tego etapu nigdy nie udało mi się przejść więc nie wiem co dzieje się dalej.

LLVM jest napisany w C++, języku który jako język obiektowy posiada polimorfizm out-of-the-box.

## Główne programy/polecenia LLVM

W skład LLVM wchodzi wiele bibliotek dostępnych także jako [polecenia standalone](<http://llvm.org/docs/CommandGuide/>).
Są to:
* [llvm-as](<http://llvm.org/docs/CommandGuide/llvm-as.html>) - Asembler LLVM, 
konwertuje kod czytelny dla człowieka w języku asemblera LLVM (pliki *.ll) do bitkodu LLVM (pliki *.bc)
* [llvm-dis](<http://llvm.org/docs/CommandGuide/llvm-dis.html>) - Disassembler LLVM, 
konwertuje bitkod LLVM (pliki *.bc) do kodu czytelnego dla człowieka w języku asemblera LLVM (pliki *.ll)
* [opt](<http://llvm.org/docs/CommandGuide/opt.html>) - Optimizer LLVM, 
optymalizuje kod w języku asemblera LLVM
* [llc](<http://llvm.org/docs/CommandGuide/llc.html>) - **[Kompilator](/posts-by-tags/compiler)** LLVM, 
kompiluje kod w języku asemblera LLVM na kod w języku asemblera docelowej architektury
* [lli](<http://llvm.org/docs/CommandGuide/lli.html>) - Interpreter (sic!) LLVM, 
wykonuje kod
* i wiele innych...

... ale żeby móc używać LLVM potrzebujemy jeszcze front-endu.

### Clang ...

Technicznie [Clang](<https://clang.llvm.org/>) to front-end dla projektu **[LLVM](/posts-by-tags/llvm)**
kompilujący języki z rodziny C
(C, C ++, Objective C, OpenCL, CUDA i RenderScript).

W praktyce [Clang](<https://clang.llvm.org/get_started.html>) to kompilator maksymalnie zgodny z interface GCC

Można w swoim projekcie podmienić GCC na Clang i cieszyć się szybszą i lepszą kompilacją kodu.

### ... i inne języki programowania

Nie tylko języki C, C++ i Objective-C posiadają swój kompilator oparty na LLVM.
Wiele innych języków natywnych posiada swój kompilator oparty na LLVM jak np.
Ada, D, Delphi, Fortran.
Także języki nienatywne zyskały swoją wersję natywną jak np.
ActionScript,
C#,
Common Lisp,
**[Haskell](/posts-by-langs/haskell)**,
**[Java bytecode](/post-by-langs/java)**,
**[Kotlin](/posts-by-langs/kotlin)**,
**[Lua](/posts-by-langs/lua)**,
**[Python](/posts-by-langs/python)**,
R,
**[Ruby](/posts-by-langs/ruby)**,
**[Scala](/posts-by-tags/scala-native)**.
Kompilatory wielu innych języków programowania powstały odrazu przy pomocy LLVM jak np.
**[Crystal](/posts-by-langs/crystal)**,
**[Julia](/posts-by-langs/julia)**,
**[Pony](/posts-by-langs/pony)**,
**[Rust](/posts-by-langs/rust)**,
Swift.

Co ciekawe nie ma wśród nich języka **[Go](/posts-by-tags/go)**,
Plotki mówią że jest to spowodowane tym,
że głównym sponsorem LLVM jest Apple.
Ale LLVM jest używany przez Google w wielu innych projektach, 
jak chociażby w Chromium/Chrom do kompilowania języka **[JavaScript](/posts-by-langs/javascript)**.
Oficjalnym wytłumaczeniem jest to, że LLVM nie pozwalał na zarządzanie włóknami (ang. *fiber*), lekkimi procesami, 
potrzebnymi do implementacji gorutyn (ang. *goroutines*).


### Przykładowa kompilacja za pomocą GCC i Clang

Jako przykład skompilujemy interpreter języka **[Lua](/posts-by-langs/lua)**.
Najpierw za pomocą kompilatora GCC, 
a później za pomocą LLVM.

Ściągamy repozytorium z kodem interpretera języka **[Lua](/posts-by-langs/lua)**:
```bash
https://github.com/lua/lua.git
```

Przechodzimy do folderu `lua`:
```bash
cd lua
```

I kompilujemy:
```bash
make all
```

Może brakować wam kilku bibliotek potrzebnych do kompilacji. 
U mnie było to:
```bash
sudo apt-get install libreadline-dev
```

Jeśli kompilacja przeszła uruchamiamy interpreter języka **[Lua](/posts-by-langs/lua)**:
```bash
./lua
```
I żeby sprawdzić czy wszystko działa wpisujemy:
```lua
print("Hello World")
```

Jeśli wszystko jest wporządku to kasujemy wszystkie nowe pliki:
```bash
rm -f *.o *.a lua
```

Wchodzimy do pliku `makefile` i zamieniamy kompilator GCC na LLVM,
czyli linię:
```bash
CC= gcc
```
na linię:
```bash
CC= clang
```

Ponownie wszystko kompilujemy:
```bash
make all
```
Prawdopodobnie kompilacja się nie uda ponieważ nie posiadacie kompilatora `clang`.
Więc instalujemy kompilator i ponawiamy kompilację:
```bash
sudo apt install clang
```

Jeśli kompilacja przeszła uruchamiamy interpreter języka **[Lua](/posts-by-langs/lua)**:
```bash
./lua
```
I żeby sprawdzić czy wszystko działa wpisujemy:
```lua
print("Hello World")
```

Widać,
że GCC może zostać bezproblemowo zastąpiony przez Clang,
ponieważ oba kompilatory mają zgodny interfejs **[CLI](/posts-by-tags/cli)**. 

### Clang w szczegółach

Za pomocą kompilatora Clang możemy...

 
... skompilować pojedynczy plik:  
```bash
clang lua.c
```

... uruchomić tylko preprocesor:
```bash
clang lua.c -E
```

... sprawdzić składnię:
```bash
clang lua.c -fsyntax-only
clang lua.c -fsyntax-only -pedantic
```

... sformatowakoć kod:
```bash
clang -cc1 lua.c -ast-print
```

... wygenerować reprezentację pośrednią (ang. *Intermediate representation*,  *IR*):
```bash
clang lua.c -S -emit-llvm -o -
```

... wygenerować asembler maszyny docelowej:
```bash
clang lua.c -S  -o -
clang lua.c -S -fomit-frame-pointer -o -
```

## Podsumowanie
LLVM jest przyszłością i głównie ten projekt jest odpowiedzialny za wysyp nowych języków natywnych.