# API CRUD
Uma API REST que realiza as operações básicas de CRUD em um banco de dados MySQL.
> Projeto desenvolvido por [Claudir](https://github.com/roehrigjunior), [Guilherme](https://github.com/gu1lherme10) e [Nícolas](https://github.com/NicolasQuadros) durante o Programa de Bolsas da [Compass UOL](https://compass.uol). 

### Funcionalidades
- Cadastrar contrato
- Excluir contrato
- Atualizar contrato
- Listar contratos (todos, por ID, por contratante e por contratado)

### Tecnologias
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Sequelize](https://sequelize.org)
- [MySQL](https://www.mysql.com)
&nbsp;
---
## Documentação _(incompleta)_
### Endpoints:
- POST contracts/
- DELETE contracts/{id}
- UPDATE contracts/{id}
- GET contracts/{id}
- GET contracts/?page=0
- GET contracts/?contractee="name"&page=0
- GET contracts/?contractor="name"&page=0
