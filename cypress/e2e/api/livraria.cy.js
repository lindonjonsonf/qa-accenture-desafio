import servicoUsuario from '../../servicos/usuario.servico';
import servicoLivros from '../../servicos/livros.servico';

describe('Desafio Accenture - API da Livraria', () => {

  it('Deve executar o fluxo completo de cadastro e reserva de livros', () => {

    const usuario = {
      userName: `usuario_teste_${Date.now()}`,
      password: 'Teste@12345Aa'
    };

    let identificadorUsuario;
    let tokenAcesso;
    let livrosSelecionados = [];

    // ETAPA 1 - Cadastrar usuário
    servicoUsuario.cadastrarUsuario(usuario).then((resposta) => {

      expect(resposta.status).to.eq(201);
      expect(resposta.body).to.have.property('userID');
      expect(resposta.body.username).to.eq(usuario.userName);

      identificadorUsuario = resposta.body.userID;

      cy.log('ETAPA 1 - Usuário cadastrado com sucesso!');
    });

    // ETAPA 2 - Gerar token
    servicoUsuario.gerarToken(usuario).then((resposta) => {

      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.have.property('token');
      expect(resposta.body.token).to.be.a('string').and.not.be.empty;
      expect(resposta.body.status).to.eq('Success');

      tokenAcesso = resposta.body.token;

      cy.log('ETAPA 2 - Token gerado com sucesso!');
    });

    // ETAPA 3 - Confirmar autorização
    servicoUsuario.verificarAutorizacao(usuario).then((resposta) => {

      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.eq(true);

      cy.log('ETAPA 3 - Usuário autorizado com sucesso!');
    });

    // ETAPA 4 - Consultar livros
    servicoLivros.consultarLivros().then((resposta) => {

      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.have.property('books');
      expect(resposta.body.books).to.be.an('array');
      expect(resposta.body.books.length).to.be.at.least(2);

      livrosSelecionados = resposta.body.books.slice(0, 2);

      livrosSelecionados.forEach((livro) => {
        expect(livro.isbn).to.be.a('string').and.not.be.empty;
        cy.log(`Livro selecionado: ${livro.title}`);
      });

      cy.log('ETAPA 4 - Livros consultados com sucesso!');
    });

    // ETAPA 5 - Reservar dois livros
    cy.then(() => {

      return servicoLivros.reservarLivros(
        identificadorUsuario,
        tokenAcesso,
        livrosSelecionados
      );

    }).then((resposta) => {

      expect(resposta.status).to.eq(201);
      expect(resposta.body).to.have.property('books');
      expect(resposta.body.books).to.have.length(2);

      const identificadoresReservados = resposta.body.books.map(
        (livro) => livro.isbn
      );

      livrosSelecionados.forEach((livro) => {
        expect(identificadoresReservados).to.include(livro.isbn);
      });

      cy.log('ETAPA 5 - Dois livros reservados com sucesso!');
    });

    // ETAPA 6 - Consultar usuário e validar livros
    cy.then(() => {

      return servicoUsuario.consultarUsuario(
        identificadorUsuario,
        tokenAcesso
      );

    }).then((resposta) => {

      expect(resposta.status).to.eq(200);
      expect(resposta.body.userId).to.eq(identificadorUsuario);
      expect(resposta.body.username).to.eq(usuario.userName);

      expect(resposta.body.books).to.be.an('array');
      expect(resposta.body.books).to.have.length(2);

      const identificadoresEncontrados = resposta.body.books.map(
        (livro) => livro.isbn
      );

      livrosSelecionados.forEach((livro) => {
        expect(identificadoresEncontrados).to.include(livro.isbn);
      });

      cy.log('ETAPA 6 - Os dois livros foram encontrados na conta!');
      cy.log('FLUXO COMPLETO DA API VALIDADO COM SUCESSO!');

    });

  });

});