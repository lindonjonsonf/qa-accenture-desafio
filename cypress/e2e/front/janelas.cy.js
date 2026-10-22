import paginaJanelas from '../../paginas/janelas.pagina';




describe('Desafio Accenture - Browser Windows', () => {

  it('Deve validar a abertura de uma nova janela', () => {

    paginaJanelas.acessarPagina();

    // Interceptar a abertura da janela
    paginaJanelas.abrirJanela();

    // Validar o conteúdo da página
    paginaJanelas.validarNovaJanela();

  });

});