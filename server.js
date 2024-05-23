// importar o módulo do Express
const express = require ("express");
const sequelize = require ("./config/sequelize");
const router = require ("./routes/router");
require ("dotenv").config();

//testar a conexão  com o banco de dados 
sequelize.authenticate()
    .then(() =>{
        console.log("Conexão com o banco de dados bem-sucedida.");

        //listar todas as tabelas de banco de dados
        return sequelize.query ("SHOW TABLES");
    })
    .then(([result, metadada]) => {
        console.log("Tabelas no banco de dados:");
        console.log(result);

        //inicie o servidor 
        /* app.listen (3000, () => {
            console.log("Servidor Express iniciado na port 3000");
        }); */
    })
    .catch (err => {
        console.error("Erro ao conectar ao banco de dados:", err);
    });

//criar uma instancia do aplicativo Express
const app = express();

//configura o servidor a aceitar requisições JSON usando express
app.use(express.json())
app.use(router);

//app.use(cooki-parser)

//definir a porta em que o servidor irá ouvir
const PORT = process.env.PORT || 3000;

//iniciar o servidor e ouvir a porta especificada 
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado na porta ${PORT}`);
});