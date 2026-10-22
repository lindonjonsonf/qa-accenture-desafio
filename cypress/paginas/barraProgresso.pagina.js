import paginaInicial from './inicio.pagina';

class PaginaBarraProgresso {

  acessarPagina() {
    paginaInicial.acessarSubpagina('Widgets', 'Progress Bar');
    cy.get('#startStopButton').should('be.visible');
  }

  iniciar() {
    cy.get('#startStopButton').click();
  }

  parar() {
    cy.wait(1000);

    cy.get('#startStopButton').click();

    cy.get('#progressBar [role="progressbar"]')
      .invoke('attr', 'aria-valuenow')
      .then((valor) => {
        expect(Number(valor)).to.be.at.most(25);
      });
  }

  continuar() {
    cy.get('#startStopButton').click();

    cy.get('#progressBar [role="progressbar"]', {
      timeout: 30000
    }).should('have.attr', 'aria-valuenow', '100');
  }

  reiniciar() {
    cy.get('#resetButton').click();

    cy.get('#progressBar [role="progressbar"]')
      .invoke('attr', 'aria-valuenow')
      .then((valor) => {
        expect(Number(valor)).to.be.at.most(5);
      });
  }
}

export default new PaginaBarraProgresso();