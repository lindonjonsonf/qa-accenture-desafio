class PaginaFormulario {

  acessarFormulario() {
    cy.visit('https://demoqa.com/');
    cy.contains('.card', 'Forms').click();
    cy.contains('.text', 'Practice Form').click();
    cy.url().should('include', '/automation-practice-form');
  }

  preencherDadosPessoais(dados) {
    const campos = {
      '#firstName': dados.nome,
      '#lastName': dados.sobrenome,
      '#userEmail': dados.email,
      '#userNumber': dados.telefone
    };

    Object.entries(campos).forEach(([campo, valor]) => {
      cy.get(campo).type(String(valor));
    });

    cy.get(`label[for="gender-radio-${dados.genero}"]`).click();
  }

  preencherDataNascimento() {
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('4');
    cy.get('.react-datepicker__year-select').select('2000');

    cy.get('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)')
      .click();
  }

  preencherDadosAdicionais(dados) {
    cy.get('#subjectsInput').type('Math');
    cy.contains('.subjects-auto-complete__option', 'Maths').click();

    cy.get('label[for="hobbies-checkbox-1"]').click();

    cy.get('#uploadPicture')
      .selectFile('cypress/fixtures/documento.txt');

    cy.get('#currentAddress').type(dados.endereco);

    cy.get('#state').click();
    cy.get('#react-select-3-option-0').click();

    cy.get('#city').click();
    cy.get('#react-select-4-option-0').click();
  }

  enviarFormulario() {
    cy.get('#submit').click();
  }

  validarConfirmacao(dados) {
    cy.get('.modal-content').should('be.visible');

    cy.get('#example-modal-sizes-title-lg')
      .should('contain', 'Thanks for submitting the form');

    const valoresEsperados = [
      `${dados.nome} ${dados.sobrenome}`,
      dados.email,
      dados.telefone,
      'Maths',
      'Sports',
      'documento.txt',
      dados.endereco
    ];

    valoresEsperados.forEach((valor) => {
      cy.get('.table-responsive').should('contain', valor);
    });
  }

  fecharConfirmacao() {
    cy.get('#closeLargeModal').click({ force: true });
    cy.get('.modal-content').should('not.be.visible');
  }
}

export default new PaginaFormulario();