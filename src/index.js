import express from "express";
import * as dotenv from "dotenv";
import { growDevers } from "./dados.js";
import { randomUUID } from "crypto";
import { logMiddleware, logRequestMiddleware } from "./middlewares.js";
dotenv.config();

const app = express();
app.use(express.json());

//Rotas
// GET /growdevers
//     /growdevers?idade=20
app.get("/growdevers", [logRequestMiddleware], (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

//POST /growdevers
app.post("/growdevers", [logMiddleware], (req, res) => {
  try {
    const body = req.body;

    if (!body.nome) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo nome não foi informado",
      });
    }

    if (!body.email) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo email não foi informado",
      });
    }

    if (!body.idade) {
      return res.status(400).send({
        ok: false,
        mensagem: "O campo idade não foi informado",
      });
    }

    if (body.idade < 18) {
      return res.status(400).send({
        ok: false,
        mensagem: "O growdever deve ser maior de idade",
      });
    }

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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

//GET /growdevers/:id
app.get(
  "/growdevers/:id",
  [logMiddleware, logRequestMiddleware],
  (req, res) => {
    try {
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
    } catch (error) {
      console.log(error);
      res.status(500).send({
        ok: false,
        mensagem: error.toString(),
      });
    }
  },
);

//PUT /growdevers/:id
app.put("/growdevers/:id", [logMiddleware], (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

//PATCH /growdevers/:id - Toggle do campo matriculado
app.patch("/growdevers/:id", (req, res) => {
  try {
    const { id } = req.params;

    const growDever = growDevers.find((item) => item.id === id);

    if (!growDever) {
      res.status(404).send({
        ok: false,
        mensagem: "Growdever não encontrado",
      });
    }

    growDever.matriculado = !growDever.matriculado;

    res.status(200).send({
      ok: true,
      mensagem: "Growdever atualizado",
      dados: growDevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

//DELETE /growdevers/:id - Excluir um growdever
app.delete("/growdevers/:id", (req, res) => {
  try {
    const { id } = req.params;

    const growDeverIndex = growDevers.findIndex((item) => item.id === id);

    if (growDeverIndex < 0) {
      res.status(404).send({
        ok: false,
        mensagem: "Growdever não encontrado",
      });
    }

    growDevers.splice(growDeverIndex, 1);

    res.status(200).send({
      ok: true,
      mensagem: "Growdever excluído com sucesso",
      dados: growDevers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});
