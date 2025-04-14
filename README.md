## 🐘 Configuração Full Stack com Docker

Este projeto contém uma aplicação full-stack com os seguintes componentes:

- **Backend**: API Web em ASP.NET
- **Frontend**: Aplicação React servida por Nginx
- **Banco de Dados**: SQL Server 2022
- **Orquestração de Containers**: Docker Compose

---

### 🛠️ Configuração do Projeto

Para rodar toda a pilha da aplicação localmente, o Docker Compose é utilizado para orquestrar os serviços.

1. **SQL Server**: O backend utiliza um banco de dados SQL Server para armazenar os dados. O banco de dados é inicializado através de um script SQL personalizado (`init.sql`).
2. **Backend .NET**: Um Dockerfile com múltiplos estágios é utilizado para construir a API Web em .NET. Ela escuta na porta `8084`.
3. **Frontend**: A aplicação React é construída dentro do Docker e servida pelo Nginx para lidar com o roteamento de Aplicação de Página Única (SPA). O frontend escuta na porta `3000`.

---

### 🐳 Rodando a Aplicação

#### 1. Construir o Frontend React
O frontend será construído dentro do container Docker e o resultado será copiado para o diretório `dist/`. Esse passo é necessário antes de rodar a pilha completa.

```bash
docker build -t frontend-build ./frontend
docker create --name temp-frontend frontend-build
docker cp temp-frontend:/app/dist ./frontend/dist
docker rm temp-frontend
2. Rodando a Pilha Completa
Depois que o frontend for construído e o diretório dist/ estiver pronto, rode a pilha completa com o seguinte comando:

bash
Copiar
Editar
docker-compose up --build
Isso irá:

Subir o container do SQL Server na porta 1433

Subir o container do Backend API na porta 8084

Subir o container do Frontend (Nginx servindo o app React) na porta 3000

Acessando os Serviços
Frontend (App React): http://localhost:3000

Backend API: http://localhost:8084

⚙️ Configuração do Nginx
O app React é servido utilizando o Nginx. A configuração garante que as rotas da SPA (e.g., /about, /dashboard) retornem para o index.html.

nginx/default.conf:

nginx
Copiar
Editar
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
Esta configuração é usada para servir o diretório dist/ do React como arquivos estáticos.

🧠 Variáveis de Ambiente
Backend: O backend utiliza uma string de conexão para conectar ao container do SQL Server. Isso está definido no arquivo docker-compose.yml da seguinte forma:

yaml
Copiar
Editar
- ConnectionStrings__DefaultConnection=Server=sqlserver;Database=your_db_name;User Id=sa;Password=YourStrong@Password123;
Frontend: O frontend se comunica com a API através da variável de ambiente REACT_APP_API_URL:

yaml
Copiar
Editar
- REACT_APP_API_URL=http://localhost:8084
🔧 Melhorias Opcionais
 Automatizar a cópia do dist/ no Docker Compose

 Adicionar proxy reverso com HTTPS (ex: Traefik ou Nginx)

 Implementar testes unitários e de integração

 Configurar pipeline CI/CD (GitHub Actions, etc.)
