import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

//Rotas

// GET http://localhost:3000/teste
app.get("/teste", (req, res) => {
  res.send({
    ok: true,
    mensagem: "Teste da api realizado com sucesso",
  });
});

// GET http://localhost:3000/about
app.get("/about", (req, res) => {
  res.send({
    nome: "André Vinicius Bezerra da Silva",
    email: "avbds2077@outlook.com",
    resumo: "Programador back-end iniciante buscando vagas de estágio",
    idade: 25,
    skills: ["React", "NodeJs/Express", "Spring boot web", "JPA", "PostgreSQL"],
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});
