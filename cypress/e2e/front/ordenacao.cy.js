import paginaOrdenacao from '../../paginas/ordenacao.pagina';


describe('Desafio Accenture - Sortable', () => {

  it('Deve organizar os elementos em ordem crescente', () => {

    paginaOrdenacao.acessarPagina();

    // Desorganizar a lista
    paginaOrdenacao.arrastarElemento(5, 0);

    paginaOrdenacao.validarOrdem([
      'Six', 'One', 'Two', 'Three', 'Four', 'Five'
    ]);

    // Organizar novamente
    paginaOrdenacao.arrastarElemento(0, 5);

    paginaOrdenacao.validarOrdem([
      'One', 'Two', 'Three', 'Four', 'Five', 'Six'
    ]);

  });

});