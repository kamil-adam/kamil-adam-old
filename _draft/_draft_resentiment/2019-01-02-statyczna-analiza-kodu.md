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


Development
Plugins, that don’t affect build nor testing, but still make a development a little bit easier:

sbt-revolver - not every application is a Play application that you can easily terminate with Ctrl+D. Even some terminal applications, refuse to exit after you send EoF. Yet, you would like to be able to kill them without killing the sbt. Revolver lets you reStart application in a fork and return control over the sbt immediately. Then you can reStop it any time you want without killing sbt,
clippy - better error messages than vanilla scalac provides,
sbt-errors-summary - gather compilation errors by files,
sbt-bloop - if you want to use bloop for compilation.



Build checking and improvement
Useful for providing additional information about your project, and dependencies in particular:

sbt-dependency-check - checks if your dependencies might have some vulnerabilities you should be aware of (uses OWASP list).
sbt-dependency-update - easily check if some of your dependencies can be updated,
sbt-dependency-graph - can visualize dependency graph. I use dependencyBrowseGraph quite often to check what transitive dependencies were introduced by that small little library and dependencyStats to see how much it actually affected the fat JAR’s size,




https://kubuszok.com/2018/sbt-tips-and-tricks/
https://kubuszok.pl/2017/ksiazki-ktore-warto-znac/