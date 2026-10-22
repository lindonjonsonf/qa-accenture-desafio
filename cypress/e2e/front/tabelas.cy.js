import paginaTabelas from '../../paginas/tabelas.pagina';

describe('Desafio Accenture - Web Tables', () => {

  it('Deve cadastrar, consultar, editar e excluir um funcionário', () => {

    const identificador = Date.now();

    const funcionario = {
      nome: 'Teste',
      sobrenome: `QA${identificador}`,
      email: `qa${identificador}@exemplo.com`,
      idade: 26,
      salario: 4500,
      departamento: 'Qualidade'
    };

    // Cadastrar e validar
    paginaTabelas.acessarPagina();
    paginaTabelas.cadastrarFuncionario(funcionario);
    paginaTabelas.validarFuncionario(funcionario);

    // Editar e validar
    paginaTabelas.editarSalario(funcionario.email, 6000);
    paginaTabelas.validarFuncionario({
      ...funcionario,
      salario: 6000
    });

    // Excluir e validar
    paginaTabelas.excluirFuncionario(funcionario.email);
    paginaTabelas.validarExclusao(funcionario.email);

  });

});