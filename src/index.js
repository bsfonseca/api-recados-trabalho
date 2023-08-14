import express from "express";
import cors from "cors";

import { usuarios, criarUsuario, criarRecado } from "./usuarios.js";

const app = express();
app.use(express.json());
app.use(cors());

// Listagem de usuários
// (com paginação)
app.get("/usuarios", (req, res) => {
  const usuariosPorPagina = 5;
  const pagina = req.query.page;

  // usuarios [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
  // pagina 1 -> 0..4
  // pagina 2 -> 5..9
  // pagina 3 -> 10..14
  // pagina 4 -> 15..19

  const posInicial = usuariosPorPagina * (pagina - 1);
  const posFinal = usuariosPorPagina * pagina - 1;

  const usuariosPaginados = usuarios.slice(posInicial, posFinal + 1);

  res.status(200).send({
    ok: true,
    mensagem: "A lista foi obtida com sucesso",
    dados: usuariosPaginados,
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

  if (!titulo) {
    return res.status(400).send({
      ok: false,
      mensagem: "Titulo nao informado",
    });
  }

  if (!descricao) {
    return res.status(400).send({
      ok: false,
      mensagem: "Titulo nao informado",
    });
  }

  const user = usuarios.find((item) => item.id == id);

  if (user == undefined) {
    return res.status(404).send({
      ok: false,
      mensagem: "Usuário não existe",
    });
  }

  criarRecado(user, {
    titulo,
    descricao,
  });

  res.status(201).send({
    ok: true,
    mensagem: "Adicionado novo recado",
  });
});

// Put - Atualizar
// falta terminar...
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
// falta terminar...

app.listen(3000, () => {
  console.log("Api rodando");
});
