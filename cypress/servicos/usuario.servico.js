class ServicoUsuario {

  cadastrarUsuario(usuario) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/User',
      body: usuario
    });
  }

  gerarToken(usuario) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/GenerateToken',
      body: usuario
    });
  }

  verificarAutorizacao(usuario) {
    return cy.request({
      method: 'POST',
      url: 'https://demoqa.com/Account/v1/Authorized',
      body: usuario
    });
  }

  consultarUsuario(identificadorUsuario, tokenAcesso) {
    return cy.request({
      method: 'GET',
      url: `https://demoqa.com/Account/v1/User/${identificadorUsuario}`,
      headers: {
        Authorization: `Bearer ${tokenAcesso}`
      }
    });
  }

}

export default new ServicoUsuario();