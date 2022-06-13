# Globo-Challenge
## Para rodar o projeto:

### Para rodar o banco de dados:
- Rode o docker coms o banco de dados com os comando:
```shell
cd rest-api
docker-compose up
```
### Para rodar a API:
- Instale as dependências da API:
```shell
cd rest-api
yarn
```
- Iniciar a API:
```shell
yarn start
```

A aplicação ficará disponível em **http://localhost:3000** 

A docmentação está disppnicel em **http://localhost:3000/api**

### Para rodas os testes
```shell
cd 
yarn test
```
### Para rodar o front
```shell
cd front
yarn start
```
A aplicação ficará disponível em **http://localhost:80** 

### Para usar o CLI

Para usar o CLI é possível utilizar o comando 
```shell
cd cardimportcli
bin/run [comando]
```
ou então instalar o o CLI com o comando
```shell
cd cardimportcli
npm i -g .
```
e rode o CLI com o comando

```shell
cd cardimportcli
card [comando]
```
Comandos do CLI
```shell
USAGE
  $ card [COMMAND]

COMMANDS
  database  Configura a conexão com o banco de dados
  import    Importa cartas de um arquivo CSV e gravar no banco de dados
 ```
 
 ```shell
Importa cartas de um arquivo CSV e gravar no banco de dados

USAGE
  $ card import [PATH]

ARGUMENTS
  PATH  Caminho absoluto do arquivo CSV

EXAMPLES
  $ card import C:\Users\user\Desktop\test.csv
 ```
 ```shell
Configura a conexão com o banco de dados

USAGE
  $ card database [CONNECTION] [-n] [-s]

ARGUMENTS
  CONNECTION  String de conexão com o banco de dados

FLAGS
  -n, --new   Substitui a string de conexão existente por uma nova
  -s, --show  Mostra a atual string de conexão 

EXAMPLES
  card connection postgresql://dbuser:secretpassword@database.server.com:5432/mydb
 ```
