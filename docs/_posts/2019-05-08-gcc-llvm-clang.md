---
title:    'Krótki opis konstrukcji kompilatorów GCC, LLVM i Clang'
author:   TheKamilAdam
category: programming
tags:     api assembler ast bytecode cli compiler interface interpreter lexer parser
labels:   gcc ir r
langs:    haskell kotlin lua python ruby crystal julia pony rust go lisp
tools:    clang jvm llvm scala-native
redirect_from:
  - gcc-llvm-clang
  - programming/gcc-llvm-clang
  - onions/gcc-llvm-clang
  - onions/2019/05/08/gcc-llvm-clang.html
---

W dawnych czasach każdy dobry programista chciał napisać swój własny **[kompilator]** języka C.
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
**[Kompilator]** języka programowania składa się z:
1. front-endu, zależnego od języka wejściowego
2. middle-endu, clou kompilatora
3. back-endu, zależnego od architektury docelowej

Zgadza się.
Dobrze widzicie.
Pojęcia front-end i back-end są starsze niż aplikacje jednostronicowe (ang. *single-page application*, *SPA*). 

### Front-end
Front-end kompilatora składa się z:
1. analizatora leksykalnego (**[leksera]**) - wynikiem działania jest ciąg leksemów (tokenów z typami)
2. analizatora składniowego (**[parsera]**) - wynikiem jest drzewo **[AST]**
3. analizatora semantycznego - wynikiem jest zmodyfikowane drzewo AST z tablicą symboli. 
Analizator semantyczny zajmuje się:
    * kontrolą nazw
    * kontrolą typów
    * kontrolą poprawności instrukcji
4. optymalizatora drzewa AST - wykonuje optymalizacje zależne od języka wejściowego
5. generatora reprezentacji pośredniej (ang. *Intermediate representation*,  *IR*) -
drzewo zostaje spłaszczone do uniwersalnego kodu bajtowego lub uniwersalnego języka asemblerowego czytelnego dla człowieka

### Middle-end
Zwany też optymalizatorem reprezentacji pośredniej.
Dokonuje optymalizacji uniwersalnych, 
czyli wszystkie optymalizacje niezależne od języka wejściowego i architektury docelowej.
Z jednej strony jest to najmniej potrzebna część kompilatora.
Z drugiej to właśnie rozbudowany optymalizator decyduje o tym, 
który **[kompilator]** jest najlepszy.

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
Jednak dziś powoli palmę pierwszeństwa odbiera mu **[LLVM]**
(kiedyś *Low Level Virtual Machine*, dziś nazwa się nie rozwija ponieważ jest to **[kompilator]**, a nie maszyna wirtualna).

LLVM powstał z projektu badawczego na temat kompilacji.
Naukowcy wzięli frond-end z GCC i dopisali własny middle-end i back-end.
Później gdy firma Apple sypneła kasą projekt rozrósł się do prawdziwego kompilatora,
ale dalej na otwartej licencji.

Dlaczego naukowcy nie użyli middle-endu z GCC?
Każdy kto spojrzał w kod GCC wie dlaczego.
Ponieważ GCC jest napisany w języku C oraz języku **[Lisp]**,
dwóch ulubionych językach [rms].
Dzięki temu połączeniu w GCC jest osiągany polimorfizm.

Kompilacja GCC składa się z kilku etapów.
Pierwszym jest skompilowanie własnej wersji interpretera Lispa napisanego w C.
Następnie wczytywany jest deklaratywny kod w Lispie opisujący docelową architekturę.
Na podstawie kodu w Lispie generowany jest kod w C dla docelowej architektury.
Kompilowany jest kod dla docelowej architektury.
Niestety tego etapu nigdy nie udało mi się przejść więc nie wiem co dzieje się dalej.

**[LLVM]** jest napisany w C++, języku który jako język obiektowy posiada polimorfizm out-of-the-box.

## Główne programy/polecenia LLVM

W skład LLVM wchodzi wiele bibliotek dostępnych także jako [polecenia standalone].
Są to:
* [llvm-as] - **[Asembler]** LLVM, 
konwertuje kod czytelny dla człowieka w języku asemblera LLVM (pliki *.ll) do bitkodu LLVM (pliki *.bc)
* [llvm-dis] - Disasembler LLVM, 
konwertuje bitkod LLVM (pliki *.bc) do kodu czytelnego dla człowieka w języku asemblera LLVM (pliki *.ll)
* [opt] - Optimizer LLVM, 
optymalizuje kod w języku asemblera LLVM
* [llc] - **[Kompilator]** LLVM, 
kompiluje kod w języku asemblera LLVM na kod w języku asemblera docelowej architektury
* [lli] - **[Interpreter]** (sic!) LLVM,
wykonuje kod
* i wiele innych...

... ale żeby móc używać LLVM potrzebujemy jeszcze front-endu.

### Clang ...

Technicznie **[Clang]** to front-end dla projektu **[LLVM]**
kompilujący języki z rodziny C
(C, C ++, Objective C, OpenCL, CUDA i RenderScript).

W praktyce Clang to kompilator maksymalnie zgodny z **[API]** GCC

Można w swoim projekcie podmienić GCC na Clang i cieszyć się szybszą i lepszą kompilacją kodu.

### ... i inne języki programowania

Nie tylko języki C, C++ i Objective-C posiadają swój kompilator oparty na LLVM.
Wiele innych języków natywnych posiada swój kompilator oparty na LLVM jak np.
Ada, D, Delphi, Fortran.
Także języki nienatywne zyskały swoją wersję natywną jak np.
ActionScript,
C#,
**[Common Lisp]**,
**[Haskell]**,
**[Kod bajtowy]** Javy,
**[Kotlin]**,
**[Lua]**,
**[Python]**,
R,
**[Ruby]**,
**[Scala]**.
Kompilatory wielu innych języków programowania powstały odrazu przy pomocy LLVM jak np.
**[Crystal]**,
**[Julia]**,
**[Pony]**,
**[Rust]**,
Swift.

Co ciekawe nie ma wśród nich języka **[Go]**.
Plotki mówią że jest to spowodowane tym,
że głównym sponsorem LLVM jest Apple.
Ale LLVM jest używany przez Google w wielu innych projektach, 
jak chociażby w Chromium/Chrom do kompilowania języka **[JavaScript]**.
Oficjalnym wytłumaczeniem jest to, że LLVM nie pozwalał na zarządzanie włóknami (ang. *fiber*), lekkimi procesami, 
potrzebnymi do implementacji gorutyn (ang. *goroutines*).


### Przykładowa kompilacja za pomocą GCC i Clang

Jako przykład skompilujemy interpreter języka **[Lua]**.
Najpierw za pomocą kompilatora GCC, 
a później za pomocą LLVM.

Ściągamy repozytorium z kodem interpretera języka **[Lua]**:
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

Jeśli kompilacja przeszła uruchamiamy interpreter języka **[Lua]**:
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

Jeśli kompilacja przeszła uruchamiamy interpreter języka **[Lua]**:
```bash
./lua
```
I żeby sprawdzić czy wszystko działa wpisujemy:
```lua
print("Hello World")
```

Widać,
że GCC może zostać bezproblemowo zastąpiony przez Clang,
ponieważ oba kompilatory mają zgodny interfejs **[CLI]**. 

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
**[LLVM]** jest przyszłością i głównie ten projekt jest odpowiedzialny za wysyp nowych języków natywnych.

[Common Lisp]: /posts-by-langs/common-lisp
[Crystal]:     /posts-by-langs/crystal
[Go]:          /posts-by-langs/go
[Haskell]:     /posts-by-langs/haskell
[JavaScript]:  /posts-by-langs/javascript
[Julia]:       /posts-by-langs/julia
[Kotlin]:      /posts-by-langs/kotlin
[Lisp]:        /posts-by-langs/lisp
[Lua]:         /posts-by-langs/lua
[Pony]:        /posts-by-langs/pony
[Python]:      /posts-by-langs/python
[Ruby]:        /posts-by-langs/ruby
[Rust]:        /posts-by-langs/rust
[Scala]:       /posts-by-tools/scala-native

[Clang]:       /posts-by-tools/clang
[LLVM]:        /posts-by-tools/llvm

[API]:         /posts-by-tags/api
[Asembler]:    /posts-by-tags/assembler
[AST]:         /posts-by-tags/ast
[CLI]:         /posts-by-tags/cli
[Interpreter]: /posts-by-tags/interpreter
[Kod bajtowy]: /posts-by-tags/bytecode
[Kompilator]:  /posts-by-tags/compiler
[leksera]:     /posts-by-tags/lexer
[parsera]:     /posts-by-tags/parser

[rms]: https://pl.wikipedia.org/wiki/Richard_Stallman

[polecenia standalone]: http://llvm.org/docs/CommandGuide/
[llvm-as]: http://llvm.org/docs/CommandGuide/llvm-as.html 
[llvm-dis]: http://llvm.org/docs/CommandGuide/llvm-dis.html
[opt]: http://llvm.org/docs/CommandGuide/opt.html 
[llc]: http://llvm.org/docs/CommandGuide/llc.html 
[lli]: http://llvm.org/docs/CommandGuide/lli.html

