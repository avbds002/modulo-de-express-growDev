import express from "express";
import * as dotenv from "dotenv";
import { growDevers } from "./dados.js";
import { randomUUID } from "crypto";
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

//POST /growdevers
app.post("/growdevers", (req, res) => {
  const body = req.body;

  const novoGrowDever = {
    id: randomUUID(),
    nome: body.nome,
    email: body.email,
    idade: body.idade,
    matriculado: body.matriculado,
  };

  growDevers.push(novoGrowDever);

  res.status(201).send({
    ok: true,
    mensagem: "Growdever criado com sucesso",
    dados: growDevers,
  });
});

//GET /growdevers/:id
app.get("/growdevers/:id", (req, res) => {
  const { id } = req.params;

  const growDever = growDevers.find((item) => item.id === id);

  if (!growDever) {
    return res.status(404).send({
      ok: false,
      mensagem: "Growdever não encontrado",
    });
  }

  res.status(200).send({
    ok: true,
    mensagem: "Growdever obtido com sucesso!",
    dados: growDever,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});
