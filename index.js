const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const userRoutes = require('./routes/User.routes');
const bossRoutes = require('./routes/boss.routes');
require('./db/conexao');

app.use('/user', userRoutes);
app.use('/boss', bossRoutes);


app.get("/", (req, res)=>{
    res.send("servidor rodando");
})


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})