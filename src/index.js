import express from "express";

const app = express();
app.use(express.json());

//Rotas

app.listen(3333, () => {
  console.log("Servidor executando na porta 3333");
});
