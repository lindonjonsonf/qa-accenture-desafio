import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import paginaTabelas from '../../paginas/tabelas.pagina';

let funcionarios = [];

Given('que acesso a página Web Tables', () => {
  funcionarios = [];
  paginaTabelas.acessarPagina();
});

When('cadastro e excluo {int} funcionários, um por vez', (quantidade) => {
  const identificador = Date.now();

  funcionarios = Array.from({ length: quantidade }, (_, indice) => ({
    nome: `Teste${indice + 1}`,
    sobrenome: 'Automacao',
    email: `qa${identificador}_${indice}@exemplo.com`,
    idade: 20 + indice,
    salario: 3000 + indice * 100,
    departamento: 'Qualidade'
  }));

  funcionarios.forEach((funcionario) => {
    paginaTabelas.cadastrarFuncionario(funcionario);
    paginaTabelas.validarFuncionario(funcionario);
    paginaTabelas.excluirFuncionario(funcionario.email);
    paginaTabelas.validarExclusao(funcionario.email);
  });
});

Then('nenhum dos {int} funcionários deve permanecer na tabela', (quantidade) => {
  expect(funcionarios).to.have.length(quantidade);

  funcionarios.forEach((funcionario) => {
    paginaTabelas.validarExclusao(funcionario.email);
  });
});
