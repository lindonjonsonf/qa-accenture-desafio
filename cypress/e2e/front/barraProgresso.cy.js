import paginaBarraProgresso from '../../paginas/barraProgresso.pagina';

describe('Desafio Accenture - Progress Bar', () => {

  it('Deve parar até 25%, continuar até 100% e reiniciar', () => {
    paginaBarraProgresso.acessarPagina();
    paginaBarraProgresso.iniciar();
    paginaBarraProgresso.parar();
    paginaBarraProgresso.continuar();
    paginaBarraProgresso.reiniciar();
  });

});
