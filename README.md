# Challenge
----------
## Indroução

Aplicação de consulta de receitas.
A API possui apenas um endpoint, que deve respeitar a seguinte chamada:

```language
http://{HOST}/recipes/?i={ingredient_1},{ingredient_2},{ingredient_3}
```
Os parâmetros de busca são obrigatórios aceitando no máximo 3 ingredientes.

----------

## Setup

1) Faça uma cópia do arquivo **.env.example** como **.env**.
2) Instalar dependências:
```language
npm install
```
3) Rode o projeto:

```language
npm run dev
```
