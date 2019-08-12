# Script Macro Lang 

## Macro Proccessor 

m4/m5
sed
tcl
clojure


```m4
define(`subleq',$1 $2 $3)
define(`jmp', subleq(_,_,$1))
define(`sub',subleq($1,$2,?+3))
define(`clr',sub($1,$1))

define(`add',
sub($1,_)
sub(_,$2)
sub(_,_)
)
define(`mov',
clr($2)
add($1,$2)
)


define(`counter',1)
define(`hash', `defn(format(``hash[%s]'', `$1'))')
define(`hash_set', `define(format(``hash[%s]'', `$1'), `$2')')
hash_set(`counter', 1)


define(`beq',
subleq($1,_,L1)
jmp(OUT)
`L'hash(`counter')
clr(_)
subleq(_, $1, $2)
`OUT'hash(`counter')
hash_set(`counter', incr(hash(`counter')))
)


subleq(1,2,,3)
jmp(lbl)
sub(4,5)

add(s,d)

mov(s,d)

beq(1, lbl)

beq(0, lbl)

```

## SML


## BIL

**BIL** (ang. *Block Instruction Label*) - 
uproszczona wersja języka **TCL** (ang. *Tool Command Language*)
Obsługiwana przez Tęczowy MakroProcesor (ang. *Rainbow Macro Processor*).



## Składnia

### Komentarz

```tcl
# treść komentarza
```

### Stałe i zmienne

```tcl
value nazwa_stałej wartość
variable nazwa_zmienne ewentualna_wartość
```


### Etykiety 

```tcl
label nazwa_etykiety
```


### Rozkaz

```tcl
instruction nazwa_instrukcji {
  # ciało rozkazu
  $1 $2 $3
  # nienazwane argmenty $1 $2 $3 itd
}
```

np:

```tcl
instruction subleq {
  $1 $2 $3
}
```

### Blok

```tcl
block nazwa_bloku {

  # ciało bloku

  rozkaz_1 $2 $1
  rozkaz_2 $1 $2

  # nienazwane argmenty $1 $2 $3 itd
}
```

wewnątrz bloków można tworzyć lokalne zmienne i etykiety


##  Asembler i AsmLang 

Asembler (ang. *Assembler*) dla każdego języka w stylu SubLeq.
Dla SubLeq wystarczą trzy rozkazy:
* deklaracja zmiennej (z opcjonalną inicjalizacją)
* deklaracja etykiety
* rozkaz

## Makro Procesor i  Intermediate Language

Makro Procesor (ang. *MacroProcessor*) - procesor makr.

**IL** (ang. *Instruction Language*) - język makro procesora wzrorowany na języku **[TCL]**.
Zestaw makr, który wyrównuje różnice między językami.
Dzięki czemu wszystkie języki są sobie równe.
Można określić listę makr na których ma zaprzestać rozwijania i poprostu je zwrócić.
Do trzech rodzajów rozkazów dochodzi deklaracja makra.

## B-Lang

B-Lang (ang. *Block Language*, *Block Instruction Language*) - rozszerzenie **IL** o instrukcje sterujące i bloki instrukcji,
które też są makrami.
Trzeba dodać przekazywanie bloku kodu do makra.

Wszystkie makra mogą być też podprogramami.
Podprogramy (ang. subroutine) nie posiadają zmiennych lokalnych.
Jeśli chce się zmienne należy użyć dodatkowe parametry z wartościami domyślnymi.

## Makro Asembler i AlgoFuck

**AlgoFuck** (ang. *Algorithm BrainFuck*) - implementacja Makro-Asemblera (ang. Macro Assembler) 
ze składnią języka opartą o stronę oparta o stronę [Brainfuck algorithms]

## Rainbow BIL
**Rainbow BIL** - wewnętrzna postać języka B-Lang wyglądająca jak Schema/Racket

