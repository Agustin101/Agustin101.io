let secuenciaUsuario = [];
let secuenciaMaquina = [];
let rondas = 0;
document.querySelector('#rondas').textContent = `Click en jugar para iniciar!`

function reiniciarJuego (){
    const $titulo = document.querySelector('.titulo');
    $titulo.classList.remove('alert-danger')
    $titulo.classList.add('alert-secondary')
    reiniciarJugadas();
    bloquearUsuario();
    comenzarJuego();
}

function comenzarJuego(){
    secuenciaUsuario = [];
    const cuadroMaquina = generarSecuenciaMaquina();
    secuenciaMaquina.push(cuadroMaquina);

    mostrarTurno('Maquina');
    secuenciaMaquina.forEach(function(cuadroMaquina , i){
        const segundosPraproximo = 500 * (i+1);
        setTimeout(function(){
            encenderCuadro(cuadroMaquina)
        },segundosPraproximo);
    });

    const tiempoMaquina = 500 * (secuenciaMaquina.length + 1);
    setTimeout(function(){
        turnoJugador();
    },tiempoMaquina);


    rondas++;
    aumentarRonda();
}

function turnoJugador(){
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        mostrarTurno('Jugador');
        cuadro.onclick = generarSecuenciaUsuario;
    });
}

function generarSecuenciaUsuario(event){
    const $cuadro = event.target;
    encenderCuadro($cuadro);
    secuenciaUsuario.push($cuadro);
    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]

    if($cuadro.id !==  $cuadroMaquina.id){
        finDeJuego();
        return;
    }

    if (secuenciaMaquina.length === secuenciaUsuario.length){
        bloquearUsuario();
        setTimeout(comenzarJuego, 1000)
    }
    
    
}

function aumentarRonda(){
    document.querySelector('#rondas').textContent = `Rondas jugadas: ${rondas}`
}


function generarSecuenciaMaquina(){
    const $cuadros = document.querySelectorAll('.cuadro')
    const indice = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[indice];
}


function encenderCuadro(cuadro){
    cuadro.style.opacity = 1;

    setTimeout(function(){
    cuadro.style.opacity = 0.5;
    },250);  

}

function bloquearUsuario(){
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        cuadro.onclick = function(){
        };
    });
}

function mostrarTurno(player){
    const $titulo = document.querySelector('.titulo');
    $titulo.textContent = `Turno de ${player}`;
}

function ocultarJugador(){
    const $titulo = document.querySelector('.titulo');
    $titulo.textContent = '';
}

function finDeJuego(){
    const $titulo = document.querySelector('.titulo');
    $titulo.textContent = `Perdiste!`
    $titulo.classList.remove('alert-secondary')
    $titulo.classList.add('alert-danger')
    bloquearUsuario();
}


function reiniciarJugadas(){
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    rondas = 0;
}

$botonJugar = document.querySelector('#boton-jugar');
$botonJugar.onclick = reiniciarJuego;

