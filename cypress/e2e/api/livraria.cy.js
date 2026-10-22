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

    });

    // ETAPA 2 - Gerar token
    servicoUsuario.gerarToken(usuario).then((resposta) => {

      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.have.property('token');
      expect(resposta.body.token).to.be.a('string').and.not.be.empty;
      expect(resposta.body.status).to.eq('Success');

      tokenAcesso = resposta.body.token;

    });

    // ETAPA 3 - Confirmar autorização
    servicoUsuario.verificarAutorizacao(usuario).then((resposta) => {

      expect(resposta.status).to.eq(200);
      expect(resposta.body).to.eq(true);

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
      });

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


    });

  });

});