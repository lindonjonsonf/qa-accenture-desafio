import paginaBarraProgresso from '../../paginas/barraProgresso.pagina';


describe('Desafio Accenture - Progress Bar', () => {

  it('Deve parar até 25%, continuar até 100% e reiniciar', () => {

    // ETAPA 1 - Acessar a página
    paginaBarraProgresso.acessarPagina();

    // ETAPA 2 - Iniciar a barra
    paginaBarraProgresso.iniciar();

    // ETAPA 3 - Parar antes de 25%
    paginaBarraProgresso.parar();

    cy.wait(3000);

    // ETAPA 5 - Continuar até 100%
    paginaBarraProgresso.continuar();

    cy.wait(2000);

    // ETAPA 7 - Clicar em Reset
    paginaBarraProgresso.reiniciar();

    cy.log('Progress Bar validada com sucesso!');

  });

});