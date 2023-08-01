import express from "express";
import { usuarios, criarUsuario } from "./usuarios.js";

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

  // Validações de campo obrigatório
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

  // Validação de email já existente
  const user = usuarios.find((usuario) => usuario.email == email);

  // Existe um usuario com o email informado
  if (user != undefined) {
    // retornar erro
    return res.status(400).send({
      ok: false,
      mensagem: "Email ja cadastrado",
    });
  }

  criarUsuario({
    nome,
    email,
    senha,
  });

  res.status(201).send({
    ok: true,
    mensagem: "Usuário criado com sucesso",
    dados: usuarios,
  });
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

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

  const login = usuarios.find((user) => user.email == email && user.senha == senha);

  if (login == undefined) {
    return res.status(400).send({
      ok: false,
      mensagem: "Erro no login",
    });
  }

  res.status(200).send({
    ok: true,
    mensagem: "Login realizado com sucesso",
  });
});

app.get("/usuarios/:id/recados", (req, res) => {
  const { id } = req.params;

  const user = usuarios.find((user) => user.id == id);
  // se user nao existe, retorna erro 404
  if (user == undefined) {
    return res.status(404).send({
      ok: false,
      mensagem: "Recado não encontrado para o usuário",
    });
  }
  // retorna sucesso, pega os recados dentro de user.recados
  res.status(200).send({
    ok: true,
    mensagem: "Recado retornado com sucesso",
    dado: user.recados,
  });
});

app.listen(3000, () => {
  console.log("Api rodando");
});
