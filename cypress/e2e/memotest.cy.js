const URL = "127.0.0.1:8080";

context('Memotest', () => {

  beforeEach(() => {
    cy.visit(URL);
  });
  const NUM_CUADROS = 12;

  describe('configura el juego', () => {
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

  describe('prueba el juego', () => {
    let mapaPares;
    let listaPares;

    it('prueba haciendo click en dos cuadros de color distinto', () => {
      cy.get('.cuadro').then(cuadros => {
        mapaPares = obtenerPares(cuadros);
        listaPares = Object.values(mapaPares);

        cy.get(listaPares[0][0]).click();
        cy.get(listaPares[1][0]).click();

        cy.get('.cuadro').should('have.length', NUM_CUADROS);
      });
    });

    it('completa el juego', () => {
      cy.get('.cuadro').then(cuadros => {
        mapaPares = obtenerPares(cuadros);
        listaPares = Object.values(mapaPares);

        listaPares.forEach((par)=>{
          cy.get(par[0]).click();
          cy.get(par[1]).click();
        });

        cy.get('.cuadro').should('have.length', 0);
        cy.get('#tablero').should('not.be.visible');
        cy.get('#mensaje-fin').should('be.visible');

        const NUM_TURNOS = 6;
        cy.get('#turnos').contains(`${NUM_TURNOS}`);
      });
    });

  });
});


  function obtenerPares(cuadros) {
    let pares = {};

    cuadros.each(function (i, cuadro) {
      const claseCuadro = cuadro.className.replace('cuadro h-100 ', '');

      if (pares[claseCuadro]) {
        pares[claseCuadro].push(cuadro);
      } else {
        pares[claseCuadro] = [cuadro];
      };
    });

    return pares;
  };

