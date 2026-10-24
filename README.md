# PW Lab — Autenticação e Autorização em API REST

API REST com autenticação JWT, construída com Node.js, Express, Prisma e SQLite.

## Instalação

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

## Variáveis de ambiente (.env)

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="uma_chave_secreta_muito_segura_2024"
PORT=3000
```

## Endpoints

### Autenticação

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/auth/signup` | Registar utilizador | ❌ |
| POST | `/auth/signin` | Login (devolve token) | ❌ |
| GET | `/auth/profile` | Perfil do utilizador autenticado | ✅ |

### Tarefas

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/tasks` | Listar tarefas do utilizador | ✅ |
| GET | `/tasks/:id` | Obter tarefa por ID | ✅ |
| POST | `/tasks` | Criar tarefa | ✅ |
| PUT | `/tasks/:id` | Atualizar tarefa | ✅ |
| DELETE | `/tasks/:id` | Eliminar tarefa | ✅ |

## Exemplos de uso (Postman)

### Signup
```json
POST /auth/signup
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "password123"
}
```

### Signin
```json
POST /auth/signin
{
  "email": "joao@email.com",
  "password": "password123"
}
// Resposta: { "token": "eyJ..." }
```

### Rotas protegidas
Adicionar header:
```
Authorization: Bearer <token>
```

### Criar tarefa
```json
POST /tasks
Authorization: Bearer <token>
{
  "title": "Estudar JWT",
  "description": "Ler documentação"
}
```

## Estrutura do projeto

```
src/
  app.js
  middleware/
    auth.js
  routes/
    auth.js
    tasks.js
prisma/
  schema.prisma
.env
package.json
```
