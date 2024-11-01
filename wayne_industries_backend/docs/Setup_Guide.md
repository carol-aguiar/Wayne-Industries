# Guia de Configuração do Projeto: Wayne Industries

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados:

1. **Node.js** (versão 14 ou superior)
2. **MongoDB** (instância local ou cluster do MongoDB Atlas)
3. **npm** (gerenciador de pacotes do Node.js)

## Passos para Configuração

### 1. Clone o Repositório

Primeiro, clone o repositório do projeto em sua máquina local:

```bash
git clone <URL_DO_REPOSITORIO>
cd wayne_industries_backend
2. Instale as Dependências
Depois de clonar o repositório, instale as dependências do projeto:

npm install
3. Configuração do Banco de Dados
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
 
MONGODB_URI=<SUA_URI_DO_MONGODB>
JWT_SECRET=<SUA_CHAVE_SECRETA>
Substitua <SUA_URI_DO_MONGODB> pela URL da sua instância do MongoDB e <SUA_CHAVE_SECRETA> por uma chave secreta que você deseja usar para o JWT.

4. Inicie o Servidor
Após a configuração, inicie o servidor com o seguinte comando:

node server.js
O servidor estará rodando na porta 3000.

5. Executar o Frontend
Caso você tenha um frontend separado (por exemplo, em React), navegue até o diretório do frontend e execute:

npm start
Conclusão
Agora você deve ter o projeto "Wayne Industries" configurado e em funcionamento em sua máquina local. Sinta-se à vontade para explorar e testar a aplicação!