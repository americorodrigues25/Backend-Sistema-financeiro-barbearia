# 💈 Sistema de barbearia (Back-End)

### 📘 Sobre o sistema 
<p>Este repositório contém todo o backend do sistema que realizei para barbearia do meu cliente. Desenvolvido para facilitar o <b>controle financeiro diário e mensal dos serviços realizados.</b></p>

O sistema permite:
- Cadastrar serviços realizados.
- Vizualizar valores diarios e mensais.
- Fazer filtros por periodos.
- Graficos dinâmicos com valores e serviços.
- Exportar relatório por periodo e tipo de serviço.

<p>O back-end foi desenvolvido com <b>Node.js</b> (Express) e <b>MongoDB</b>, utilizando <b>Mongoose</b> para modelagem dos dados e <b>JWT</b> para autenticação segura.</p>

### 🛠️ Tecnologias utilizadas
- [NodeJS](https://nodejs.org/pt)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/products/platform/atlas-database)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Cors](https://www.npmjs.com/package/cors)

### ⚙️ Funcionalidades principais
* Autenticação de usuários (login);
* CRUD de serviços (criação, leitura, atualização e exclusão);
* Filtragem por data (diário, semanal e mensal);
* Cálculo automático dos totais diários e mensais;
* Proteção de rotas com tokens JWT.
* Exportar relatório em PDF

### 🚀 Rodando  projeto

``` bash
# Clone o repositório com:
$ git clone https://github.com/americorodrigues25/Backend-Sistema-financeiro-barbearia.git

# Acesse o diretório:
$ cd Backend-Sistema-financeiro-barbearia
```

``` bash
# Instale as dependências:
$ npm install
```

* <p>Configure o arquivo .env</p>

``` bash
# Crie um arquivo .env na raiz do projeto e adicione as variáveis:
$ PORT=5000
$ MONGO_URI=sua_string_de_conexao
$ JWT_SECRET=sua_chave_secreta
$ CLIENT_URL=https://localhost:3000
```

* <p>Altere a variável CLIENT_URL conforme a URL do seu front-end.</p>

``` bash
# Rode o projeto
$ npm run dev
```

---

### 🧾 Licença
Este projeto está licenciado sob a **MIT License**.   

Você pode **usar, modificar e adaptar este sistema** livremente para outros clientes ou barbearias, desde que **mantenha os devidos créditos ao autor original**.  

Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).

---

<div align="center">💻 Feito por Américo Rodrigues</div>

