let secuenciaUsuario = [];
let secuenciaMaquina = [];
let rondas = 0;
document.querySelector('#rondas').textContent = `Click en jugar para iniciar!`

function reiniciarJuego (){
    reiniciarJugadas();
    comenzarJuego();
}

function comenzarJuego(){
    secuenciaUsuario = [];
    bloquearUsuario();
    const cuadroMaquina = generarSecuenciaMaquina();
    secuenciaMaquina.push(cuadroMaquina);

    document.querySelector('#jugador').textContent = 'Maquina'
    secuenciaMaquina.forEach(function(cuadroMaquina , i){
        const segundosPraproximo = 1000 * (i+1);
        setTimeout(function(){
            encenderCuadro(cuadroMaquina)
        },segundosPraproximo);
    });

    const tiempoMaquina = 1000 * (secuenciaMaquina.length + 1);
    setTimeout(function(){
        turnoJugador();
    },tiempoMaquina);


    rondas++;
    aumentarRonda();
}

function turnoJugador(){
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        document.querySelector('#jugador').textContent = 'Jugador'
        cuadro.onclick = generarSecuenciaUsuario;
    });
}

function generarSecuenciaUsuario(event){
    const $cuadro = event.target;
    encenderCuadro($cuadro);
    secuenciaUsuario.push($cuadro);
    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]

    if($cuadro.id !==  $cuadroMaquina.id){
        document.querySelector('#rondas').textContent = `Perdiste`
        return;
    }

    if (secuenciaMaquina.length === secuenciaUsuario.length) {
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
    },500);  

}

function bloquearUsuario(){
    document.querySelectorAll('.cuadro').forEach(function(cuadro){
        cuadro.onclick = console.log('nada');
    });
}

function reiniciarJugadas(){
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    rondas = 0;
}

$botonJugar = document.querySelector('#boton-jugar');
$botonJugar.onclick = reiniciarJuego;

