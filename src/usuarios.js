export const usuarios = [
  {
    id: 1,
    nome: "João",
    email: "joao@gmail.com",
    senha: 12345,
    recados: ["Descontos para compras acima de 100 reais"],
  },
  {
    id: 2,
    nome: "Daphne",
    email: "daphne@gmail.com",
    senha: "teste123",
    recados: ["Retire seu brinde até dia 30/07/2023"],
  },
  {
    id: 3,

    nome: "Paulo",
    email: "paulo@gmail.com",
    senha: "usuario456",
    recados: ["Frete grátis em toda loja"],
  },
];

let contador = usuarios.length + 1;

export function criarUsuario(usuario) {
  usuario.id = contador;
  contador++;

  usuarios.push(usuario);
}
