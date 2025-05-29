
# Desafio Técnico - Altforce
## Ecommerce API com Inteligência Artificial usando Cohere IA, Express, TypeScript, PostgreSQL, Jest e Docker

API RESTful de Ecommerce com autenticação, gerenciamento de produtos e pedidos, e funcionalidades inteligentes com IA. Totalmente dockerizada.

---

## 🚀 Instruções Rápidas

### 🔧 Subindo o Projeto abra seu terminal

```bash
chmod +x start-docker.sh
./start-docker.sh
````

Selecione a opção:

```
1 - docker-compose up --build
```

### 📦 Acessando os logs

```bash
docker logs -f <nome-do-container>
```

---

## 🧪 Testes com Jest

Você pode rodar os testes de duas formas:

### ✅ Usando o script interativo:

```bash
./start-docker.sh
```

Escolha a opção:

```
6 - Entrar no container
```

Depois:

```bash
npm run test
# ou
npx jest
```

### ✅ Diretamente com Docker:

```bash
docker exec -it <nome-do-container> npm run test
```

---

## 📚 Documentação Swagger

Acesse a documentação da API com Swagger:

```
http://localhost:3000/api-docs
```

---

## 📬 Testes com Postman

### 🔐 Autenticação

**📌 Registro**

```
POST http://localhost:3000/api/register
```

```json
{
  "name": "Robson",
  "email": "robson@admin.com",
  "password": "admin"
}
```

**📌 Login**

```
POST http://localhost:3000/api/login
```

```json
{
  "email": "robson@admin.com",
  "password": "admin"
}
```

🔐 **Após o login, use o token gerado em todas as requisições:**

```
Authorization: Bearer <seu-token>
```

---

## 🛍️ Produtos

### ➕ Criar Produto

```
POST /api/products
```

```json
{
  "name": "Notebook Asus",
  "description": "Notebook potente para programação",
  "price": 4200.50,
  "category": "Eletrônicos"
}
```

### 🔍 Buscar Produto por ID

```
GET /api/products/<id>
```

### ✏️ Atualizar Produto por ID

```
PUT /api/products/<id>
```

### ❌ Deletar Produto por ID

```
DELETE /api/products/<id>
```

---

## 🧾 Pedidos

### ➕ Criar Pedido

```
POST /api/orders
```

```json
{
  "items": [
    {
      "productId": "4acbeb8d-d9d5-441b-99d5-f8dc1b3eaa97",
      "quantity": 1
    }
  ]
}
```

---

## 🧠 Funcionalidades de IA

### 📊 Resumo de Pedidos

```
GET /api/summarize-orders
```

Body: `none`

---

### 📂 Sugestão de Categoria

```
POST /api/suggest-category
```

```json
{
  "description": "Computador para programação"
}
```

---

### 📝 Geração de Descrição Comercial

```
POST /api/generate-description
```

```json
{
  "name": "Cadeira Gamer ThunderX3",
  "category": "Móveis"
}
```

---

### ⚠️ Detecção de Anomalias nos Produtos

```
GET /api/detect-anomalies
```

Body: `none`

---

## 🛠️ Tecnologias

* Node.js + Express + TypeScript
* SQL puro (sem ORM)
* JWT Authentication
* Jest para testes unitários
* Integração com IA via Cohere
* Swagger UI
* Docker + Docker Compose

---
## Acesse a cohere e use a IA em https://dashboard.cohere.com/ 
