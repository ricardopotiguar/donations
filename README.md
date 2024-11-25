# Donation Backend

 É uma API RESTful desenvolvida com Node.js, Express e Prisma, projetada para gerenciar um sistema de doação, doares e pessoas ou instituições que possuem necessidade, o objetivo é conectar pessoas que precisam de algo com pessoas disposta a doar algo.


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
