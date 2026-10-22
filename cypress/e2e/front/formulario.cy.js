import paginaFormulario from '../../paginas/formulario.pagina';



describe('Desafio Accenture - Practice Form', () => {

  it('Deve preencher, enviar e validar o formulário', () => {

    const identificador = Date.now();

    const dados = {
      nome: `Teste${identificador}`,
      sobrenome: 'Automacao',
      email: `teste${identificador}@exemplo.com`,
      genero: 1,
      telefone: String(Math.floor(1000000000 + Math.random() * 9000000000)),
      endereco: `Rua Teste ${identificador}, Natal RN`
    };

    // Preencher formulário
    paginaFormulario.acessarFormulario();
    paginaFormulario.preencherDadosPessoais(dados);
    paginaFormulario.preencherDataNascimento();
    paginaFormulario.preencherDadosAdicionais(dados);

    // Enviar e validar confirmação
    paginaFormulario.enviarFormulario();
    paginaFormulario.validarConfirmacao(dados);

    // Fechar popup
    paginaFormulario.fecharConfirmacao();

  });

});