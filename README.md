# geracao-dados-API
Mini app de geração de dados aleatórios via API

## PLANEJAMENTO
Planejamento do projeto foi pegar dados em tempo real de 3 API's e gerar um card com informações que foram requisitadas. 

## API'S UTILIZADAS

### RANDOM USER
Utilizada a API <a href='https://randomuser.me/'>random user </a>, onde obtive diversos dados (Como nome, endereço, id, telefone, email, latitude e longitude)

### LEAFLET MAP
Com a API random user, peguei a latitude e longitude e utilizei a API <a href="https://leafletjs.com/index.html">Leaflet</a> para pegar a localização em tempo real e criar um Mapa

### REST COUNTRIES
Utilizando também a API random user, peguei o país do usuario, nisso utilizei a API <a href="https://restcountries.com/">Rest countries</a> para pegar as bandeiras dos países. 


## OBS
Utilizado OOP, código BEM e html CANVAS para gerar uma identidade através das informações dos usuarios. 
