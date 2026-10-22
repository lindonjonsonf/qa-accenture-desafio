import paginaInicial from './inicio.pagina';

class PaginaJanelas {

  acessarPagina() {
    paginaInicial.acessarSubpagina('Alerts, Frame & Windows', 'Browser Windows');
    cy.get('#windowButton').should('be.visible');
  }

  abrirJanela() {
    cy.window().then((janela) => {
      cy.stub(janela, 'open').as('novaJanela');
    });

    cy.get('#windowButton').click();
  }

  validarNovaJanela() {
    cy.get('@novaJanela')
      .should('have.been.calledOnce')
      .then((janela) => {
        const endereco = janela.firstCall.args[0];

        expect(endereco).to.include('/sample');

        cy.visit(new URL(endereco, 'https://demoqa.com').href);
      });

    cy.contains('h1', 'This is a sample page')
      .should('be.visible');

    cy.go('back');
    cy.get('#windowButton').should('be.visible');
  }
}

export default new PaginaJanelas();