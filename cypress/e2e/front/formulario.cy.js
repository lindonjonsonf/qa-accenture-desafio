import paginaFormulario from '../../paginas/formulario.pagina';



describe('Desafio Accenture - Practice Form', () => {

  it('Deve preencher, enviar e validar o formulário', () => {

    const identificador = Date.now();
    const escolher = (opcoes) => opcoes[Math.floor(Math.random() * opcoes.length)];
    const estados = [
      { indice: 0, nome: 'NCR', cidades: ['Delhi', 'Gurgaon', 'Noida'] },
      { indice: 1, nome: 'Uttar Pradesh', cidades: ['Agra', 'Lucknow', 'Merrut'] },
      { indice: 2, nome: 'Haryana', cidades: ['Karnal', 'Panipat'] },
      { indice: 3, nome: 'Rajasthan', cidades: ['Jaipur', 'Jaiselmer', 'Jodhpur'] }
    ];
    const estado = escolher(estados);
    const indiceCidade = Math.floor(Math.random() * estado.cidades.length);

    const dados = {
      nome: `Teste${identificador}`,
      sobrenome: `QA${identificador}`,
      email: `teste${identificador}@exemplo.com`,
      genero: escolher([1, 2, 3]),
      telefone: String(Math.floor(1000000000 + Math.random() * 9000000000)),
      dataNascimento: {
        dia: escolher(Array.from({ length: 28 }, (_, indice) => indice + 1)),
        mes: escolher(Array.from({ length: 12 }, (_, indice) => indice)),
        ano: escolher(Array.from({ length: 26 }, (_, indice) => 1980 + indice))
      },
      materia: escolher([
        'Maths', 'Physics', 'English', 'Chemistry', 'Computer Science',
        'Commerce', 'Economics', 'Social Studies', 'Arts', 'Accounting'
      ]),
      hobby: escolher([
        { indice: 1, nome: 'Sports' },
        { indice: 2, nome: 'Reading' },
        { indice: 3, nome: 'Music' }
      ]),
      endereco: `Rua Teste ${identificador}, Natal RN`,
      localizacao: {
        estado,
        cidade: {
          indice: indiceCidade,
          nome: estado.cidades[indiceCidade]
        }
      }
    };

    // Preencher formulário
    paginaFormulario.acessarFormulario();
    paginaFormulario.preencherDadosPessoais(dados);
    paginaFormulario.preencherDataNascimento(dados.dataNascimento);
    paginaFormulario.preencherDadosAdicionais(dados);

    // Enviar e validar confirmação
    paginaFormulario.enviarFormulario();
    paginaFormulario.validarConfirmacao(dados);

    // Fechar popup
    paginaFormulario.fecharConfirmacao();

  });

});