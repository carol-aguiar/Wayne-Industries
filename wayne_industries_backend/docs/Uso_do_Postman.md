Testes com Postman
Para facilitar os testes da API, foi utilizado o Postman, uma ferramenta popular para realizar chamadas HTTP. Abaixo estão alguns exemplos de como testar os endpoints da API usando o Postman:

Registro de Usuário:

Método: POST
URL: http://localhost:3000/api/auth/register
Corpo:
json
{
    "username": "exemploUsuario",
    "password": "senhaSegura",
    "role": "funcionario"
}
Login de Usuário:

Método: POST
URL: http://localhost:3000/api/auth/login
Corpo:
json
{
    "username": "exemploUsuario",
    "password": "senhaSegura"
}
Adicionar Alerta de Segurança:

Método: POST
URL: http://localhost:3000/api/security-alerts
Corpo:
json
{
    "description": "Alerta de exemplo",
    "severity": "alta"
}
Adicionar Log de Acesso:

Método: POST
URL: http://localhost:3000/api/access-logs
Corpo:
json
{
    "message": "Usuário acessou o sistema",
    "userId": "userIdExample"
}
