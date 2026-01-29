import express from "express";
import * as dotenv from "dotenv";
import { growDevers } from "./dados.js";
import { randomUUID } from "crypto";
dotenv.config();

const app = express();
app.use(express.json());

//Rotas
// GET /growdevers
//     /growdevers?idade=20
app.get("/growdevers", (req, res) => {
  const { idade, nome, email } = req.query;

  let dados = growDevers;
  if (idade) {
    dados = dados.filter((item) => item.idade >= Number(idade));
  }

  if (nome) {
    dados = dados.filter((item) => item.nome.includes(nome));
  }

  if (email) {
    dados = dados.filter((item) => item.email.includes(email));
  }

  res.status(200).send({
    ok: true,
    mensagem: "Growdevers listados com sucesso",
    dados,
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

//PUT /growdevers/:id
app.put("/growdevers/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, idade, matriculado } = req.body;

  const growDever = growDevers.find((item) => item.id === id);

  if (!growDever) {
    return res.status(404).send({
      ok: false,
      mensagem: "Growdever não encontrado",
    });
  }

  growDever.nome = nome;
  growDever.email = email;
  growDever.idade = idade;
  growDever.matriculado = matriculado;

  res.status(200).send({
    ok: true,
    mensagem: "Growdever atualizado com sucesso",
    dados: growDevers,
  });
});

//PATCH /growdevers/:id

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});
