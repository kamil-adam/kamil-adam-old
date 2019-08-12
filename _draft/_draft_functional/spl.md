**SPL** -  *Scripting Programming Language* or *Silesian Polish Language*.
Is it a *Small* and *Portable* language 
which are *Structured* and *Procedural*.


It has two logos.
First is *Simply*, 
other is *Pretty*.

**SPL** should have *Symbolic Processor*,
but I do not know what mean *Symbolic*.
* Sometime Assembler Langugage is call Symbolic Language,
because we can using symbolic labels for variable and code, not real addresses. 
* In **[Lisp]** it mean that you can assign code to variable  
[https://en.wikipedia.org/wiki/Symbolic_language_(programming)]
* In **[Scheme]** and **[Scala]** it mean `'symbol`
  * in **[Clojure]** and **[Ruby]** is it `:keyword` 
  * in **[Erlang]** is it `atom` or `'another atom'`


## Wyzwania
* TinyScheme
  * https://en.wikipedia.org/wiki/TinyScheme
  * http://tinyscheme.sourceforge.net/
* Scheme Shell
  * https://en.wikipedia.org/wiki/Scsh 
  * https://scsh.net/
  
  
## Biblioteka

Standard Polymorphism Language

## Reverse Polish Notation -> Normal Notation

```
(value-or-lambda name define)
('() false define)
(''() true define)
```

## Something is no yes

```
((list of params) body something)
((list of params) if-true true something)

((list of params) if-true exp if-false something)
((list of params) if-true exp if-false true something)

((list of params) if-true1 exp1 if-true2 exp2 something)
((list of params) if-true1 exp1 if-true2 exp2 ... if-trueN expN something)
```

## This is nothing

```
((list of params) body nothing)
((list of params) if-false false nothing)

((list of params) if-false exp if-true nothing)
((list of params) if-false exp if-true false nothing)

((list of params) if-false1 exp1 if-false2 exp2 nothing)
((list of params) if-false1 exp1 if-false2 exp2 ... if-falseN expN nothing)
```

## Stack

W języku wszystko jest budowane według zasady `Dopełnienie Podmiot Orzeczenie (OSV)`.

### Operatory
```
+-*/% < > =
```

* `.` - definicja, opcjonalne, tylko dla czytelności
* `!` - wywołanie funkcji
* `?` - wyrażenie warunkowe
* `[]` - leniwe niawiasy
* `{}` - gorliwe nawiasy, czyli odpowiednik `[]!`
* `()` - niewiadomo jakie nawiasy
* `<>` - w ogóle nie nawiasy


### Literały
```
`c `h `a `r
'string'
"multi
line
string"
```


nazwy funkcji to wskaźniki na funkcje

### Deklaracja zmiennych
Zmienne deklaruje się albo poprzez parametry funkcji, albo jako funkcje bez argumentów

```
value name [.]

1 one .
```
### Wyrażenia
Odwrotna notacja polska

```
2 el el + sum .
```


### Deklaracja funkcji
Funkcje są od razu konstrukcjami match-swhich-case

```
'[' 
{block condition ?} 
[default-condition !] 
']' name .
```

```
[
  _1 _2 addn _1 isNumber ?
  _1 _2 adds _1 isSymbol ?
  error !
] add .
```

### Wywołanie funkcji
```
{var} name !
```

```
var1 var2 add !
```

### Blok kodu czyli switch

```
{var} '[' 
{block condition ?} 
[default-block !] 
']' 
```

```
_1 _2 [
  _1 _2 addn _1 isNumber ?
  _1 _2 adds _1 isSymbol ?
  error! 
]
```

Blok kodu z przypisaniem
```
_1 _2 {
  _1 _2 addn _1 isNumber ?
  _1 _2 adds _1 isSymbol ?
  error! 
} sum .
```

```
2 3 { _1 _2 +} sum .
```

### Rekurencja
Rekurencja jest jedyną formą iteracji
```
[
  1 1 _1 = ?
  _1 _1  1 - factorial * ?
] factorial .
```

```
[
  0 0 _1 = ?
  1 1 _1 = ?
  _1 1 - fib _1 2 - fib + !
] fib .
```

### Rekurencja anonimowa (bez definiowania funkc)
`_` oznacza nazwę funkcji (this, recur z innych języków programowania)

```
3 {
  1 1 _1 = ?
  _1 _1  1 - _ * !
} silnia_z_3 .
```

```
6 {
  0 0 _1 = ?
  1 1 _1 = ?
  [_1 1 -] _ [_1 2 -] _ +
} fib_z_6 .
```

### Inne

* # - komentarz
* ^ - wzkaźnik
* ^@ - null
* x - mutowalne zmienne
* ACT - no CAT
* _ - akumilator
* _1, _2 - stos
* __ - akumulator techniczny
* __1, __2 - stos techniczny
