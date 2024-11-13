const URL = "http://192.168.56.1:8080";

context('Memotest', () => {

  before(() => {
    cy.visit(URL);
  });

  describe('configura el juego', () => {
    const NUM_CUADROS = 12;

    it('comprueba la cantidad de cuadros', () => {
      cy.get('#tablero').find('.cuadro').should('have.length', NUM_CUADROS);
    });

    /*it('comprueba la cantidad de cuadros', () => {
      cy.url().should('not.include', 'about:blank');
      cy.get('#tablero').find('.cuadro').should('have.length', NUM_CUADROS);
    });
    */
  });

});

