let tamanho = parseInt(prompt("Digite o tamanho dos lados do quadrado:"));

for (let i = 0; i < tamanho; i++) {
  let linha = "";
  for (let j = 0; j < tamanho; j++) {
    linha += "* ";
  }
  console.log(linha);
}