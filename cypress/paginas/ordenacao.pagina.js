class PaginaOrdenacao {

  acessarPagina() {
    cy.visit('https://demoqa.com/sortable');
    cy.get('#demo-tab-list').click();
  }

  arrastarElemento(origem, destino) {
    const seletor = '#demo-tabpane-list .list-group-item';

    cy.get(seletor).eq(origem).drag(
      `${seletor}:eq(${destino})`,
      {
        force: true,
        target: {
          position: origem > destino ? 'top' : 'bottom'
        }
      }
    );
  }

  validarOrdem(ordemEsperada) {
    cy.get('#demo-tabpane-list .list-group-item')
      .should(($itens) => {
        const ordemAtual = [...$itens].map(
          (item) => item.innerText.trim()
        );

        expect(ordemAtual).to.deep.equal(ordemEsperada);
      });
  }
}

export default new PaginaOrdenacao();