import { growDevers } from "./dados.js";

export const logRequestMiddleware = (req, res, next) => {
  console.log(req.query);
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.body);

  next();
};

export const logBody = (req, res, next) => {
  console.log(req.body);
  next();
};

export const validateGrowdeverMiddleware = (req, res, next) => {
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

    if (Number(body.idade < 18)) {
      return res.status(400).send({
        ok: false,
        mensagem: "O growdever deve ser maior de idade",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }
};

export const validateGrowdeverMatricualdoMiddleware = (req, res, next) => {
  try {
    const { id } = req.params;

    const growDever = growDevers.find((item) => item.id === id);

    if (!growDever) {
      return next();
    }

    if (!growDever.matriculado) {
      return res.status(400).send({
        ok: false,
        mensagem: "Growdever não matriculado não pode realizar atualizações",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensagem: error.toString(),
    });
  }

  next();
};
