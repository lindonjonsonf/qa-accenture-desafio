class PaginaInicial {

  acessarSubpagina(categoria, subpagina) {
    cy.visit('https://demoqa.com/');
    cy.contains('.card', categoria).click();
    cy.contains('.text', subpagina).click();
  }
}

export default new PaginaInicial();
