/*  --- ---- --- ---- ------ --- ----- ---- --- ---- --- ---- --- ----  */ 
/*  --  ---- --- ---- --- VARIABLES y CONSTANTES --- ---- --- ---  ---  */
/*  --- ---- --- ---- ------ --- ----- ---- --- ---- --- ---- --- ----  */ 

//Select document object;
const d = document;

//Contenedor donde se almacenaran los puntos de la partida
let puntos = 0;

//Selecciona el area donde se muestran los puntos
const muestra_puntos = d.querySelector('#puntos');

//Selecciona el area donde se muestran los puntos
const muestra_puntuacion_maxima = d.querySelector('#puntos_maximo');

//Area animado
const area_juego = d.querySelector('#area_juego');

//Cambia el texto que muestra el nivel de dificultad
const muestra_dificultad = d.querySelector('#dificultad_elegida');

//Selecciona la cobra
const img_cobra = d.querySelector('#cobra');

//Cantidad de boxes en total, si la cantidad en el eje X es !== a la cantidad en el eje Y utilizar 2 vars...
const grid_x_por_y = 20;

//Establecer posicion inicial de la serpiente
let posicion_en_area = [
    {
        x: 10,
        y: 10 
    }
];

//Ejecuta la funcion con la posicion de la comida
let posicion_elementos_inicial = inicio_aleatorio();

//Direccion inicial de la serpiente
let direccion_movimiento = 'left';

//Almacena el id del setInterval para poder parar el juego
let para_juego;

//Establece la dificultad del juego
let dificultad_velocidad = 200;



/*  --- ---- --- ---- ------ --- ----- ---- --- ---- --  */ 
/*  --- ---- --- ---- -- FUNCIONES --- ---- --- ---- --  */
/*  --- ---- --- ---- ------ --- ----- ---- --- ---- --  */ 

//Cambia el nivel de dificultad
function elige_dificultad() {
    switch (d.querySelector('#dificultad').value) {
        case '1':
          muestra_dificultad.textContent = "Nivel: 1";
          dificultad_velocidad = 360;
          break;
        case '2':
          muestra_dificultad.textContent = "Nivel: 2";
          dificultad_velocidad = 320;
          break;
        case '3':
          muestra_dificultad.textContent = "Nivel: 3";
          dificultad_velocidad = 280;
          break;
        case '4':
          muestra_dificultad.textContent = "Nivel: 4";
          dificultad_velocidad = 240;
          break;
        case '5':
          muestra_dificultad.textContent = "Nivel: 5";
          dificultad_velocidad = 200;
          break;
        case '6':
          muestra_dificultad.textContent = "Nivel: 6";
          dificultad_velocidad = 160;
          break;
        case '7':
          muestra_dificultad.textContent = "Nivel: 7";
          dificultad_velocidad = 120;
          break;
        case '8':
          muestra_dificultad.textContent = "Nivel: 8";
          dificultad_velocidad = 80;
          break;
        case '9':
          muestra_dificultad.textContent = "Nivel: 9";
          dificultad_velocidad = 40;
          break;
        case '10':
          muestra_dificultad.textContent = "Nivel: 10";
          dificultad_velocidad = 10;
          break;
        default:
            muestra_dificultad.textContent = "Nivel: 5";
            dificultad_velocidad = 200;
        break;
    }
}

//Funcion que creara las etiquetas de la serpiente o la comida...
function nuevo_elemento(etiqueta, atributo, valor_atributo, aria_oculto) {
    const elemento_creado = d.createElement(etiqueta);

    const append_atributo = d.createAttribute(atributo);
    append_atributo.value = valor_atributo;
    elemento_creado.setAttributeNode(append_atributo);

    //Creo un parametro OPCIONAL haciendo uso del if statement .. func(...aria_oculto)
    //DATO: Si dices que no sea undefined, cualquier input === defined sera true y lo exec...
    if (
        aria_oculto === true    || 
        aria_oculto === 'true'  || 
        aria_oculto === false   || 
        aria_oculto === 'false'
        ) {
        const rol_elegido = d.createAttribute('aria-hidden');
        window.toString(aria_oculto)
        rol_elegido.value = aria_oculto;
        elemento_creado.setAttributeNode(rol_elegido)    
    }

    return elemento_creado;
};

//Establece la posicion de la serpiente sobre el eje X e Y
function posicion_en_mapa(elemento_creado, pos_en_eje) {
    elemento_creado.style.gridColumn = pos_en_eje.x;
    elemento_creado.style.gridRow = pos_en_eje.y;
};

//Crea la serpiente
function crea_serpiente() {
    posicion_en_area.forEach( function (eje) {
        const extremidad = nuevo_elemento('div', 'class', 'estilo_serpiente', true);
        posicion_en_mapa(extremidad, eje);

        area_juego.appendChild(extremidad)
    })
};

//Posicion de la comida 
function inicio_aleatorio() {
    const eje_x = Math.floor( Math.random() * grid_x_por_y ) + 1;
    const eje_y = Math.floor( Math.random() * grid_x_por_y ) + 1;
    return {x: eje_x, y: eje_y};
};
//Captura posicion de la comida
let posicion_de_la_comida;
//Crea la comida
function crea_comida() {
    const comida = nuevo_elemento('div', 'class', 'estilo_comida', true);
    posicion_de_la_comida = posicion_elementos_inicial;
    posicion_en_mapa(comida, posicion_de_la_comida);
    area_juego.appendChild(comida)
};

//Movimiento de la serpiente
function mover_serpiente() {
    //Realiza una copia del array con la ultima posicion
    const actualizar_posicion_serpiente = {
        ...posicion_en_area[0]
    };
    switch (direccion_movimiento) {
        case 'ArrowUp':
            actualizar_posicion_serpiente.y--
        break;
        case 'ArrowRight':
            actualizar_posicion_serpiente.x++
        break;
        case 'ArrowDown':
            actualizar_posicion_serpiente.y++
        break;
        case 'ArrowLeft':
            actualizar_posicion_serpiente.x--
        break;
        default:
            actualizar_posicion_serpiente.x--
        break;
    }

    //Comprueba si la posicion de la serpiente es la actual a la de la comida
    if (
        (posicion_de_la_comida.x === posicion_en_area[0].x) 
        && 
        (posicion_de_la_comida.y === posicion_en_area[0].y)
        ) {
            posicion_elementos_inicial = inicio_aleatorio(); //Cambia la posicion de la comida
            window.clearInterval(para_juego);
            para_juego = null;
            para_juego = setInterval(inicio, dificultad_velocidad);

            ++puntos
            puntos = puntos.toString();
            muestra_puntos.textContent = puntos.padStart(3, '0');
            muestra_puntuacion_maxima.textContent = puntos.padStart(3, '0');
    } else {
        posicion_en_area.pop(); //Elimina la ultima posicion
    }
    posicion_en_area.unshift(actualizar_posicion_serpiente); //Actualiza la posicion en la direc elegida
}

function te_las_pegao() {
    const inicio_serpiente = posicion_en_area[0];
  
    if (
        inicio_serpiente.x < 1            || 
        inicio_serpiente.x > grid_x_por_y || 
        inicio_serpiente.y < 1            || 
        inicio_serpiente.y > grid_x_por_y
        ) {
            finalizar();
            puntos = 0;
            posicion_en_area = [{x: 10,y: 10}];
            posicion_elementos_inicial = inicio_aleatorio();
            direccion_movimiento = 'left';
            muestra_puntos.textContent = '000';
    }
  
    for (let i = 1; i < posicion_en_area.length; i++) {
      if (
        (inicio_serpiente.x === posicion_en_area[i].x) 
        && 
        (inicio_serpiente.y === posicion_en_area[i].y)
        ) {
        finalizar();
        puntos = 0;
        posicion_en_area = [{x: 10,y: 10}];
        posicion_elementos_inicial = inicio_aleatorio();
        direccion_movimiento = 'left';
        muestra_puntos.textContent = '000';
      }
    }
}

//Inicia el juego
function inicio() {
    img_cobra.classList.add('d_none');
    area_juego.innerHTML = '';
    crea_comida();
    crea_serpiente();
    mover_serpiente();
    te_las_pegao();
}

//Captura las teclas pulsadas por el usuario
function captura_teclas_inicio() {
    area_juego.innerHTML = "";

    crea_serpiente();

    if (para_juego) {
        try {            
            window.clearInterval(para_juego);
            para_juego = null;
        } catch (e) {console.log(e)};
    };

    para_juego = setInterval(inicio, dificultad_velocidad);

    d.addEventListener("keydown", (tecla_pulsada) => {
        if (
            tecla_pulsada.key === 'ArrowDown'  || 
            tecla_pulsada.key === 'ArrowUp'    || 
            tecla_pulsada.key === 'ArrowRight' || 
            tecla_pulsada.key === 'ArrowLeft' 
            ) {
            direccion_movimiento = tecla_pulsada.key;
        }
    })
}

//Finalizar el juego
function finalizar() {
    window.clearInterval(para_juego);
    para_juego = null;
    area_juego.innerHTML = '';
    img_cobra.classList.remove('d_none');
}



/*  --- ---- --- ---- ------ --- ----- ---- --- ---- -- --- ---- --  */ 
/*  --- ---- --- ---- -- DISPARADOR DE EVENTOS --- ---- --- ---- --  */
/*  --- ---- --- ---- ------ --- ----- ---- --- ---- -- --- ---- --  */ 

//Empieza el juego si pulsas en el boton
d.querySelector('#empezar').addEventListener('click', captura_teclas_inicio);

//Si pulsas en el espacio el juego se inicia
window.addEventListener("keydown", (tecla_pulsada) => {
    if (tecla_pulsada.key === ' ') { captura_teclas_inicio() }
});

//Pausa el juego
d.querySelector('#pausa').addEventListener('click', finalizar);

//Cambia el nivel de dificultad
d.querySelector('#dificultad').addEventListener('change', function () {
    elige_dificultad();
})