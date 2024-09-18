let maiorIdade = 0;

for (let i = 1; i <= 10; i++) {
  let idade = parseInt(prompt(`Digite a idade da pessoa ${i}:`));
  if (idade >= 18) {
    maiorIdade++;
  }
}

console.log(`Quantidade de pessoas com idade maior ou igual a 18 anos: ${maiorIdade}`);