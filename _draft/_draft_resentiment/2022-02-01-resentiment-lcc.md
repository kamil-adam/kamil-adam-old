---
layout:   post
title:    'Problem wywołań cebulowych w Scali'
author:   "writeonly"
category: resentiment
tags:     resentiment scala kotlin clojure bash jekyll
labels:   lips elixir f# ocaml elm livescript julia hack
comments: true
toc:      true
---







https://drh.github.io/lcc/current/doc/install.html

http://drhanson.s3.amazonaws.com/storage/documents/interface4.pdf



```bash
export BUILDDIR=`pwd`/lcc;
echo $BUILDDIR;

mkdir $BUILDDIR;
ll $BUILDDIR;

sudo ln -s $BUILDDIR /usr/local/lib/lcc;
sudo ls -al /usr/local/lib/lcc

make HOSTFILE=etc/solaris.c lcc
make TARGET=sparc/solaris test

echo "alias lcc='$BUILDDIR/lcc'" >> ~/.bashrc;
source ~/.bashrc;
```


```bash
lcc -Wf-target=symbolic -S tst/8q.c;
cat 8q.s;
```