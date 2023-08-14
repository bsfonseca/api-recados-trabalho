export const usuarios = [
  {
    id: 1,
    nome: "João",
    email: "joao@gmail.com",
    senha: 12345,
    recados: [
      {
        id: 1,
        titulo: "Passear com a daphne",
        descricao: "Nao esquecer de passear com a daphne hoje",
      },
      {
        id: 2,
        titulo: "teste",
        descricao: "teste da descricao do recado 2",
      },
    ],
  },
  {
    id: 2,
    nome: "Daphne",
    email: "daphne@gmail.com",
    senha: "teste123",
    recados: [
      {
        id: 3,
        titulo: "Comer",
        descricao: "Vou comer comidinha hoje",
      },
    ],
  },
  {
    id: 3,
    nome: "Paulo",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
  {
    id: 4,
    nome: "Maria",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
  {
    id: 5,
    nome: "João",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
  {
    id: 6,
    nome: "Claudinha",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
  {
    id: 7,
    nome: "Terezinha",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
  {
    id: 8,
    nome: "Renata",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
  {
    id: 9,
    nome: "Candidato",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: [],
  },
];

let contador = usuarios.length + 1;

export function criarUsuario(usuario) {
  usuario.id = contador;
  contador++;

  usuarios.push(usuario);
}

export function criarRecado(usuario, recado) {
  recado.id = contador;
  contador++;

  usuario.recados.push(recado);
}
