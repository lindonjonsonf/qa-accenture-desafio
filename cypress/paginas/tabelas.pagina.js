class PaginaTabelas {

  acessarPagina() {
    cy.visit('https://demoqa.com/webtables');
    cy.get('#addNewRecordButton').should('be.visible');
  }

  cadastrarFuncionario(funcionario) {
    cy.get('#addNewRecordButton').click();

    const campos = {
      '#firstName': funcionario.nome,
      '#lastName': funcionario.sobrenome,
      '#userEmail': funcionario.email,
      '#age': funcionario.idade,
      '#salary': funcionario.salario,
      '#department': funcionario.departamento
    };

    Object.entries(campos).forEach(([campo, valor]) => {
      cy.get(campo).type(String(valor));
    });

    cy.get('#submit').click();
  }

  localizarFuncionario(email) {
    cy.get('#searchBox').clear().type(email);
    return cy.contains('tbody tr td', email).closest('tr');
  }

  validarFuncionario(funcionario) {
    const valores = [
      funcionario.nome,
      funcionario.sobrenome,
      funcionario.idade,
      funcionario.email,
      funcionario.salario,
      funcionario.departamento
    ];

    this.localizarFuncionario(funcionario.email)
      .should('be.visible')
      .within(() => {
        valores.forEach((valor, indice) => {
          cy.get('td').eq(indice)
            .should('have.text', String(valor));
        });
      });
  }

  editarSalario(email, novoSalario) {
    this.localizarFuncionario(email)
      .find('[id^="edit-record-"]')
      .click({ force: true });

    cy.get('#salary').clear().type(String(novoSalario));
    cy.get('#submit').click();
  }

  excluirFuncionario(email) {
    this.localizarFuncionario(email)
      .find('[id^="delete-record-"]')
      .click({ force: true });
  }

  validarExclusao(email) {
    cy.get('#searchBox').clear().type(email);
    cy.get('tbody').should('not.contain', email);
  }
}

export default new PaginaTabelas();