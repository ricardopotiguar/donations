# Donation Backend

 É uma API RESTful desenvolvida com Node.js, Express e Prisma, projetada para gerenciar um sistema de doação, doares e pessoas ou instituições que possuem necessidade, o objetivo é conectar pessoas que precisam de algo com pessoas disposta a doar algo.

## Executando comando para criação das dependencias mapeadas pelo vite (fazer 1 vez) ##

 ```bash
npm install
```
## Executando comando para instalação do CORS, para liberar acesso do frontend ao backend (fazer 1 vez) ##

 ```bash
npm install cors
```

## Executando comando para instalação do bcrypt, jsonwebtoken e express-validator utilizados para processo de autenticação (fazer 1 vez) ##

 ```bash
npm install bcrypt jsonwebtoken express-validator
```


 ## Ativando o ambiente local ##

 ### Verificar se o banco de dados (Mysql) está Ativando ###

```bash
 sudo systemctl status mysql
```

### Caso não esteja, rodar o comando abaixo para iniciar ###

```bash
sudo systemctl start mysql
```

### Roda o servidor Node ###

```bash
node --watch "./src/server.js"
```

 ## Realizando migração de banco de dados ##

 ### Remover Migrações e Resetar Banco de Dados Se você quiser começar "do zero": ###

```bash
npx prisma migrate reset
```

 ### Criar uma Nova Migração Após ajustar o modelo no schema.prisma, crie uma nova migração: ###

```bash
npx prisma migrate dev --name alter_field_type
```