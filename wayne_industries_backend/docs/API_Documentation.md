# Documentação da API

## 1. Registro de Usuário
**Endpoint**: `POST /api/auth/register`

**Descrição**: Registra um novo usuário.

### Requisição:
- **Corpo**:
```json
{
    "username": "exemploUsuario",
    "password": "senhaSegura",
    "role": "funcionario"
}
Resposta:
Código 201:
{"message": "Usuário registrado com sucesso"}
Código 400:
{"message": "Todos os campos são obrigatórios"}
Código 400:
{"message": "Usuário já existe"}
Código 500:
{"message": "Erro no servidor"}

2. Login de Usuário
Endpoint: POST /api/auth/login

Descrição: Realiza o login de um usuário existente.

Requisição:
Corpo:
{
    "username": "exemploUsuario",
    "password": "senhaSegura"
}
Resposta:
Código 200:
{
    "token": "JWT_TOKEN",
    "message": "Login bem-sucedido"
}
Código 400:
{"message": "Todos os campos são obrigatórios"}
Código 400:
{"message": "Credenciais inválidas"}
Código 500:
{"message": "Erro no servidor"}

3. Gerenciamento de Alertas de Segurança
3.1 Adicionar Alerta
Endpoint: POST /api/security-alerts

Descrição: Adiciona um novo alerta de segurança.

Requisição:
Corpo:
{
    "description": "Alerta de exemplo",
    "severity": "alta"
}
Resposta:
Código 201:
json

{
    "_id": "alertId",
    "description": "Alerta de exemplo",
    "severity": "alta"
}
Código 400:
json

{"message": "Descrição e severidade são obrigatórios"}
Código 500:
json

{"message": "Erro ao adicionar alerta de segurança"}
3.2 Remover Alerta
Endpoint: DELETE /api/security-alerts/:id

Descrição: Remove um alerta de segurança pelo ID.

Resposta:
Código 204: Sem conteúdo
Código 404:
json

{"message": "Alerta não encontrado"}
Código 500:
json

{"message": "Erro ao remover alerta de segurança"}
3.3 Atualizar Alerta
Endpoint: PUT /api/security-alerts/:id

Descrição: Atualiza um alerta de segurança existente.

Requisição:
Corpo:
json

{
    "description": "Descrição atualizada",
    "severity": "media"
}
Resposta:
Código 200: Alerta atualizado
Código 404:
json

{"message": "Alerta não encontrado"}
Código 500:
json

{"message": "Erro ao atualizar alerta de segurança"}
4. Gerenciamento de Logs de Acesso
4.1 Adicionar Log de Acesso
Endpoint: POST /api/access-logs

Descrição: Adiciona um novo log de acesso.

Requisição:
Corpo:
json

{
    "message": "Usuário acessou o sistema",
    "userId": "userIdExample"
}
Resposta:
Código 201:
json

{
    "_id": "logId",
    "message": "Usuário acessou o sistema",
    "userId": "userIdExample"
}
Código 400:
json

{"message": "Mensagem e ID de usuário são obrigatórios"}
Código 500:
json

{"message": "Erro ao adicionar log de acesso"}
4.2 Remover Log de Acesso
Endpoint: DELETE /api/access-logs/:id

Descrição: Remove um log de acesso pelo ID.

Resposta:
Código 204: Sem conteúdo
Código 404:
json

{"message": "Log não encontrado"}
Código 500:
json

{"message": "Erro ao remover log de acesso"}
4.3 Atualizar Log de Acesso
Endpoint: PUT /api/access-logs/:id

Descrição: Atualiza um log de acesso existente.

Requisição:
Corpo:
json

{
    "message": "Mensagem atualizada",
    "userId": "userIdExample"
}
Resposta:
Código 200: Log atualizado
Código 404:
json

{"message": "Log não encontrado"}
Código 500:
json

{"message": "Erro ao atualizar log de acesso"}
Mensagens de Erro Comuns
Login: Se as credenciais forem inválidas, o sistema retornará um erro com a mensagem "Credenciais inválidas".
Cadastro: Se o usuário já existir, o sistema retornará um erro com a mensagem "Usuário já existe".

Conclusão
O sistema "Wayne Industries" oferece uma solução robusta para o gerenciamento de segurança, permitindo a autenticação de usuários e o gerenciamento eficiente de recursos, alertas de segurança e logs de acesso. A documentação detalha as funcionalidades da API e as instruções necessárias para a configuração e execução do sistema.