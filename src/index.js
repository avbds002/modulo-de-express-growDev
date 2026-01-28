import express from "express";
import * as dotenv from "dotenv";
import { growDevers } from "./dados.js";
dotenv.config();

const app = express();
app.use(express.json());

//Rotas
// GET http://localhost:3333/growdevers
app.get("/growdevers", (req, res) => {
  res.status(200).send({
    ok: true,
    mensagem: "Growdevers listados com sucesso",
    dados: growDevers,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});
