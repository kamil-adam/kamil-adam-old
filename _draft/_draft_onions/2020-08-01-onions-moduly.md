

### Container 
* json : view(external protocol) -> core -> impl
* text : view(external protocol) -> core -> impl



### Component
* master -> view, core, 
* stash -> impl
* workers:
  * json -> core \/ view, core
  * text -> core \/ view, core




* wejście
* nadanie id
* zapis wejścia
* procesowanie
* zapis wyjścia



* wejście (external protocol - http + json)
* nadanie id
* zapis wejścia
* procesowanie mastera
* procesowanie workerów (internal protocol - gRPC)
* zapis wyjścia



* controler - external api
  * strzał do warstwy aplikacji po internal api
* warstwa aplikacji - internal api
  * lamba zapisująca wejście-wyjście
  * zapis wejścia
  * strzał do warstwy procesowania po api javy
  * zapis wyjścia
* warstwa procesowania

-----

Kretor tworzy Fasade



