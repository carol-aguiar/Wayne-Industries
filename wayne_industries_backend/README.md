# Projeto Wayne Industries

## Descrição

O projeto **Wayne Industries** é um sistema de gerenciamento de segurança que permite autenticação e autorização de usuários, bem como o gerenciamento de recursos, alertas de segurança e logs de acesso. O sistema foi projetado para fornecer uma interface intuitiva para administradores e funcionários, garantindo que apenas usuários autorizados tenham acesso às áreas restritas das Indústrias Wayne.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Mongoose
- **Banco de Dados**: MongoDB
- **Frontend**: React, Material-UI
- **Autenticação**: JWT (JSON Web Tokens)
- **Controle de Versão**: Git

## Funcionalidades

- Registro e login de usuários com autenticação via JWT.
- Gerenciamento de recursos internos, como inventário de equipamentos e dispositivos de segurança.
- Adição, remoção e atualização de alertas de segurança.
- Criação e gerenciamento de logs de acesso.

## Instruções de Configuração

### Pré-requisitos

Antes de começar, você precisará de:

1. **Node.js** (versão 14 ou superior)
2. **MongoDB** (instância local ou cluster do MongoDB Atlas)
3. **npm** (gerenciador de pacotes do Node.js)

### Passos para Configuração

1. **Clone o Repositório**:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd wayne_industries_backend
Instale as Dependências:
npm install
Configuração do Banco de Dados:

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

plaintext
 
MONGODB_URI=<SUA_URI_DO_MONGODB>
JWT_SECRET=<SUA_CHAVE_SECRETA>
Inicie o Servidor:

Após a configuração, inicie o servidor com o seguinte comando: 
node server.js
O servidor estará rodando na porta 3000.

Executar o Frontend:

Caso você tenha um frontend separado, navegue até o diretório do frontend e execute:

npm start
Documentação da API
1. Registro de Usuário
Endpoint: POST /api/auth/register
Descrição: Registra um novo usuário.
Requisição:
json
 
{
    "username": "exemploUsuario",
    "password": "senhaSegura",
    "role": "funcionario"
}
Respostas:
201: {"message": "Usuário registrado com sucesso"}
400: {"message": "Todos os campos são obrigatórios"}
400: {"message": "Usuário já existe"}
500: {"message": "Erro no servidor"}

2. Login de Usuário
Endpoint: POST /api/auth/login
Descrição: Realiza o login de um usuário existente.
Requisição:
json
 
{
    "username": "exemploUsuario",
    "password": "senhaSegura"
}
Respostas:
200: {"token": "JWT_TOKEN", "message": "Login bem-sucedido"}
400: {"message": "Todos os campos são obrigatórios"}
400: {"message": "Credenciais inválidas"}
500: {"message": "Erro no servidor"}

3. Gerenciamento de Alertas de Segurança
3.1 Adicionar Alerta
Endpoint: POST /api/security-alerts
Descrição: Adiciona um novo alerta de segurança.
Requisição:
{
    "description": "Alerta de exemplo",
    "severity": "alta"
}
Respostas:
201: {"_id": "alertId", "description": "Alerta de exemplo", "severity": "alta"}
400: {"message": "Descrição e severidade são obrigatórios"}
500: {"message": "Erro ao adicionar alerta de segurança"}

3.2 Remover Alerta
Endpoint: DELETE /api/security-alerts/:id
Descrição: Remove um alerta de segurança pelo ID.
Respostas:
204: Sem conteúdo
404: {"message": "Alerta não encontrado"}
500: {"message": "Erro ao remover alerta de segurança"}

3.3 Atualizar Alerta
Endpoint: PUT /api/security-alerts/:id
Descrição: Atualiza um alerta de segurança existente.
Requisição:
{
    "description": "Descrição atualizada",
    "severity": "media"
}
Respostas:
200: Alerta atualizado
404: {"message": "Alerta não encontrado"}
500: {"message": "Erro ao atualizar alerta de segurança"}

4. Gerenciamento de Logs de Acesso
4.1 Adicionar Log de Acesso
Endpoint: POST /api/access-logs
Descrição: Adiciona um novo log de acesso.
Requisição:
{
    "message": "Usuário acessou o sistema",
    "userId": "userIdExample"
}
Respostas:
201: {"_id": "logId", "message": "Usuário acessou o sistema", "userId": "userIdExample"}
400: {"message": "Mensagem e ID de usuário são obrigatórios"}
500: {"message": "Erro ao adicionar log de acesso"}

4.2 Remover Log de Acesso
Endpoint: DELETE /api/access-logs/:id
Descrição: Remove um log de acesso pelo ID.
Respostas:
204: Sem conteúdo
404: {"message": "Log não encontrado"}
500: {"message": "Erro ao remover log de acesso"}

4.3 Atualizar Log de Acesso
Endpoint: PUT /api/access-logs/:id
Descrição: Atualiza um log de acesso existente.
Requisição:
{
    "message": "Mensagem atualizada",
    "userId": "userIdExample"
}
Respostas:
200: Log atualizado
404: {"message": "Log não encontrado"}
500: {"message": "Erro ao atualizar log de acesso"}
Conclusão
O sistema Wayne Industries oferece uma solução robusta para o gerenciamento de segurança, permitindo a autenticação de usuários e o gerenciamento eficiente de recursos, alertas de segurança e logs de acesso. A documentação detalha as funcionalidades da API e as instruções necessárias para a configuração e execução do sistema.