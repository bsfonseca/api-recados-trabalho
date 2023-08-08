import express from "express";
import cors from "cors";

import { usuarios, criarUsuario } from "./usuarios.js";

const app = express();
app.use(express.json());
app.use(cors());

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

// CRUD Recados
// Get - Listar os recados de um usuário
app.get("/usuarios/:id/recados", (req, res) => {
  const { id } = req.params;

  const user = usuarios.find((item) => item.id == id);

  // se user nao existe, retorna erro 404
  if (user == undefined) {
    return res.status(404).send({
      ok: false,
      mensagem: "Recado não encontrado para o usuário",
    });
  }

  // retorna sucesso
  res.status(200).send({
    ok: true,
    mensagem: "Recado retornado com sucesso",
    dado: user.recados,
  });
});

// Post - Criar um recado para um usuario
app.post("/usuarios/:id/recados", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;

  const user = usuarios.find((user) => user.id == id);

  if (user == undefined) {
    return res.status(404).send({
      ok: false,
      mensagem: "Usuário não existe",
    });
  }

  res.status(201).send({
    ok: true,
    mensagem: "Adicionado novo recado",
  });
});

// Put - Atualizar
app.put("/usuarios/:id/recados", (req, res) => {
  const { id } = req.params;
  const recAtual = usuarios.find((recAtual) => recAtual.recados == recados);
  if (recAtual === -1) {
    return res.status(200).send({
      ok: true,
      mensagem: "Recado atualizado com sucesso",
    });
  }
});

// Delete

app.listen(3000, () => {
  console.log("Api rodando");
});
