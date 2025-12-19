const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/darkness_boss_rush", {})
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

  
module.exports = mongoose;