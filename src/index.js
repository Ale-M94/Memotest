const $tablero = document.querySelector('#tablero');
const $mensajeFinal = document.querySelector('#mensaje-fin');
const $cuadros = $tablero.querySelectorAll('.cuadro');
let turnos = 0;
let $primerCuadro = null;


function configurarJuego() {
    const coloresBase = ['azul', 'rojo', 'verde', 'amarillo', 'negro', 'naranja'];
    const coloresRepetidos = coloresBase.concat(coloresBase);
    configurarColores($cuadros, coloresRepetidos);
    manejarEventos($tablero);
};

function finDelJuego() {
    $tablero.style.display = 'none';
    $mensajeFinal.style.display = 'block';
    document.querySelector('#turnos').textContent = turnos.toString();
};


function configurarColores($cuadros, coloresRepetidos) {
    const coloresRandom = coloresRepetidos.sort(function () {
        return Math.random() - 0.5
    });

    coloresRandom.forEach(function (color, i) {
        $cuadros[i].classList.add(color);
    });
};

function manejarEventos($tablero) {
    $tablero.onclick = function (e) {
        const $elemento = e.target;
        if ($elemento.classList.contains('cuadro')) {
            manejarClick($elemento);
        };
    };
};

function mostrarCuadro($cuadro) {
    $cuadro.style.opacity = '1';
};

function ocultarCuadro($cuadro) {
    setTimeout(function () {
        $cuadro.style.opacity = '0';
    }, 750);
};

function manejarClick($cuadroActual) {
    mostrarCuadro($cuadroActual);

    if ($primerCuadro === null) {
        $primerCuadro = $cuadroActual;
    } else {
        if ($primerCuadro === $cuadroActual) {
            return;
        };

        turnos++;

        if (compararCuadros($primerCuadro, $cuadroActual)) {
            eliminarCuadro($primerCuadro);
            eliminarCuadro($cuadroActual);
        } else {
            ocultarCuadro($primerCuadro);
            ocultarCuadro($cuadroActual);
        }
        $primerCuadro = null;
    };
};

function compararCuadros($cuadro1, $cuadro2) {
    return $cuadro1.className === $cuadro2.className;
};

function eliminarCuadro($cuadro){
    setTimeout(function(){
        $cuadro.parentElement.classList.add('gris');
        $cuadro.remove();
        evaluarFinJuego();
    }, 500);  
};

function evaluarFinJuego(){
    if(document.querySelectorAll('.cuadro').length === 0){
        finDelJuego();
    };
};

configurarJuego();
