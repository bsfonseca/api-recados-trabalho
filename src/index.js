import express from "express";
import { usuarios } from "./usuarios.js";

const app = express();
app.use(express.json());

// Usuários
app.get("/usuarios", (req, res) => {
  res.status(200).send({
    ok: true,
    mensagem: "A lista foi obtida com sucesso",
    dados: usuarios,
  });
});

// Criar um novo usuário
app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome) {
    return res.status(400).send({
      ok: false,
      mensagem: "Nome não informado",
    });
  }

  if (!email) {
    return res.status(400).send({
      ok: false,
      mensagem: "Email não informado",
    });
  }

  if (!senha) {
    return res.status(400).send({
      ok: false,
      mensagem: "Senha não informada",
    });
  }

  usuarios.push({
    nome,
    email,
    senha,
  });

  res.status(201).send({
    ok: true,
    mensagem: "Teste",
  });
});

app.listen(3000, () => {
  console.log("Api rodando");
});
