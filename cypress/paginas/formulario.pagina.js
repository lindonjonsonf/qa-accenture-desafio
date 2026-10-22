import paginaInicial from './inicio.pagina';

class PaginaFormulario {

  acessarFormulario() {
    paginaInicial.acessarSubpagina('Forms', 'Practice Form');
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

  preencherDataNascimento(dataNascimento) {
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(String(dataNascimento.mes));
    cy.get('.react-datepicker__year-select').select(String(dataNascimento.ano));

    const dia = String(dataNascimento.dia).padStart(3, '0');
    cy.get(`.react-datepicker__day--${dia}:not(.react-datepicker__day--outside-month)`)
      .click();
  }

  preencherDadosAdicionais(dados) {
    cy.get('#subjectsInput').type(dados.materia);
    cy.contains('.subjects-auto-complete__option', dados.materia).click();

    cy.get(`label[for="hobbies-checkbox-${dados.hobby.indice}"]`).click();

    cy.get('#uploadPicture')
      .selectFile('cypress/fixtures/documento.txt');

    cy.get('#currentAddress').type(dados.endereco);

    cy.get('#state').click();
    cy.get(`#react-select-3-option-${dados.localizacao.estado.indice}`).click();

    cy.get('#city').click();
    cy.get(`#react-select-4-option-${dados.localizacao.cidade.indice}`).click();
  }

  enviarFormulario() {
    cy.get('#submit').click();
  }

  validarConfirmacao(dados) {
    cy.get('.modal-content').should('be.visible');

    cy.get('#example-modal-sizes-title-lg')
      .should('contain', 'Thanks for submitting the form');

    const valoresEsperados = [
      ['Student Name', `${dados.nome} ${dados.sobrenome}`],
      ['Student Email', dados.email],
      ['Gender', { 1: 'Male', 2: 'Female', 3: 'Other' }[dados.genero]],
      ['Mobile', dados.telefone],
      ['Date of Birth', `${dados.dataNascimento.dia} ${[
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ][dados.dataNascimento.mes]} ${dados.dataNascimento.ano}`],
      ['Subjects', dados.materia],
      ['Hobbies', dados.hobby.nome],
      ['Picture', 'documento.txt'],
      ['Address', dados.endereco],
      ['State and City', `${dados.localizacao.estado.nome} ${dados.localizacao.cidade.nome}`]
    ];

    valoresEsperados.forEach(([rotulo, valor]) => {
      const celulaValor = cy.contains('.table-responsive td', rotulo)
        .parent('tr')
        .find('td')
        .eq(1);

      if (rotulo === 'Date of Birth') {
        celulaValor.invoke('text').then((texto) => {
          const normalizarData = (data) => data
            .toLowerCase()
            .replace(/[^\da-z]/g, '')
            .replace(/^0+(?=\d)/, '');

          expect(normalizarData(texto)).to.eq(normalizarData(valor));
        });
      } else {
        celulaValor.should('have.text', valor);
      }
    });
  }

  fecharConfirmacao() {
    cy.realPress('Escape');
    cy.get('.modal-content').should('not.exist');
  }
}

export default new PaginaFormulario();