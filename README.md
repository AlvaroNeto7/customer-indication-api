# Customer Indication API

API desenvolvida com **NestJS**, **MongoDB**, **Redis** e **RabbitMQ** para gerenciamento de clientes e controle de indicações.

## Objetivo

O projeto simula um sistema onde um cliente pode indicar outros clientes.

Sempre que uma nova indicação é realizada, um evento é publicado no RabbitMQ e um consumidor atualiza, de forma assíncrona, um relatório contendo a quantidade de indicações realizadas por cada cliente.

Este projeto foi desenvolvido como teste técnico para demonstrar conhecimentos em arquitetura backend utilizando NestJS.

---

## Tecnologias utilizadas

* NestJS
* TypeScript
* MongoDB
* Mongoose
* Redis
* RabbitMQ
* Docker Compose
* Swagger

---

## Arquitetura

```
Cliente
    │
    ▼
POST /customers
    │
    ▼
MongoDB
    │
    ▼
Redis (Cache Aside)
    │
    ▼
RabbitMQ (Producer)
    │
    ▼
RabbitMQ (Consumer)
    │
    ▼
Reports Collection
    │
    ▼
GET /reports
```

---

## Funcionalidades

* Cadastro de clientes
* Cadastro de clientes indicados
* Validação do cliente indicador
* Cache Aside utilizando Redis
* Publicação de eventos com RabbitMQ
* Consumo assíncrono dos eventos
* Atualização automática dos relatórios
* Consulta dos relatórios
* Documentação via Swagger

---

## Estrutura do projeto

```
src
├── customers
├── reports
├── rabbitmq
├── redis
├── app.module.ts
└── main.ts
```

---

## Como executar

### Clonar o projeto

```bash
git clone <url-do-repositorio>
```

### Instalar dependências

```bash
npm install
```

### Subir os containers

```bash
docker-compose up -d
```

### Executar a aplicação

```bash
npm run start:dev
```

---

## Swagger

Após iniciar a aplicação:

```
http://localhost:3000/docs
```

---

## Fluxo da aplicação

### Cadastro de cliente

```
POST /customers
```

Exemplo:

```json
{
  "name": "João",
  "email": "joao@email.com"
}
```

---

### Cadastro com indicação

```json
{
  "name": "Maria",
  "email": "maria@email.com",
  "parent_customer_id": "ID_DO_JOAO"
}
```

Fluxo:

* Valida o cliente no Redis
* Caso não exista, busca no MongoDB
* Atualiza o Redis (Cache Aside)
* Salva o novo cliente
* Publica um evento no RabbitMQ
* Consumer atualiza o relatório automaticamente

---

## Consulta de relatórios

```
GET /reports
```

Resposta:

```json
[
  {
    "customer_id": "ID_DO_CLIENTE",
    "total_indications": 2
  }
]
```

---

## Melhorias futuras

* Tratamento global de exceções
* Testes unitários
* Testes de integração
* Autenticação JWT
* Variáveis de ambiente completas
* Logs estruturados
* CI/CD
* Deploy em ambiente cloud

---

## Autor

Álvaro Neto

LinkedIn:
https://www.linkedin.com/in/alvaro-neto7

GitHub:
https://github.com/alvaroneto7

