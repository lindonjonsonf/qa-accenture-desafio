import paginaInicial from './inicio.pagina';

class PaginaOrdenacao {

  acessarPagina() {
    paginaInicial.acessarSubpagina('Interactions', 'Sortable');
    cy.get('#demo-tab-list').click();
  }

  arrastarElemento(origem, destino) {
    const seletor = '#demo-tabpane-list .list-group-item';
    const posicaoAlvo = origem > destino ? 'top' : 'bottom';

    cy.get(seletor).eq(origem).realMouseDown({ position: 'center' });
    cy.get(seletor)
      .eq(destino)
      .realMouseMove(0, 0, {
        position: posicaoAlvo,
        keepMouseDownButton: 'left'
      });
    cy.get(seletor)
      .eq(destino)
      .realMouseUp({ position: posicaoAlvo });
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