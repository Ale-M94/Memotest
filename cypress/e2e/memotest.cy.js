const URL = "127.0.0.1:8080";

context('Memotest', () => {

  beforeEach(() => {
    cy.visit(URL);
  });

  describe('configura el juego', () => {
    const NUM_CUADROS = 12;

    it('comprueba la cantidad de cuadros', () => {
      cy.get('#tablero').find('.cuadro').should('have.length', NUM_CUADROS);
    });

    it('comprueba que los cuadros sean aleatorios', () => {
      cy.get('.cuadro').then((cuadros) => {
        let cuadrosIniciales = [];
        cuadros.each(function (cuadros, i) {
          cuadrosIniciales.push(cuadros.className);
        });

        cy.visit(URL);

        let cuadrosNuevos = [];
        cy.get('.cuadro').then((cuadrosNuevos) => {
          cuadrosNuevos.each(function (cuadros, i) {
            cuadrosNuevos.push(cuadros.className);
          });
        });

        cy.wrap(cuadrosIniciales).should('not.deep.equal', cuadrosNuevos);
      });

    });
  });
});

