import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

//Rotas

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});
