class ServicoLivros {

  consultarLivros() {
    return cy.request({
      method: 'GET',
      url: 'https://demoqa.com/BookStore/v1/Books'
    });
  }

  reservarLivros(identificadorUsuario, tokenAcesso, livrosSelecionados) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/BookStore/v1/Books',
      headers: {
        Authorization: `Bearer ${tokenAcesso}`
      },
      body: {
        userId: identificadorUsuario,
        collectionOfIsbns: livrosSelecionados.map((livro) => ({
          isbn: livro.isbn
        }))
      }
    });
  }

}

export default new ServicoLivros();