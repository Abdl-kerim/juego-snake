//Acoto la notacion mediante d;
const d = document;

//AREA DE JUEGO -- CONTENEDOR GRID
const area_juego = d.querySelector('#area_mov'); 

//Cantidad de cuadros en el eje x = 20 y cantidad de cuadros en el eje y = 20
const grid_x_e_y = 20;

//Posicion inicial de la serpiente
let posicion_en_area = [{x: 10, y: 10}];

//Posicion comida
let cont_posicion_comida = posicion_comida(); 

//Direccion por defecto
let direccion_elegida = 'left';

//Crea la serpiente o la comida
function nuevo_elemento(elemento, nombre_clase, rol_elemento) {
    const crea_elemento = d.createElement(elemento);

    const crea_clase = d.createAttribute("class");
    crea_clase.value = nombre_clase;

    crea_elemento.setAttributeNode(crea_clase);

    const rol_att = d.createAttribute("role");
    rol_att.value = rol_elemento;
    crea_elemento.setAttributeNode(rol_att);

    return crea_elemento;
}

//Establece la posicion de la serpiente
function establecer_posicion_en_mapa(crea_elemento, eje) {
    crea_elemento.style.gridColumn = eje.x;
    crea_elemento.style.gridRow = eje.y;
}

function crear_serpiente() {
    posicion_en_area.forEach(function (obj) {
        //Crea el cuerpo de la serpiente
        const extremidad_serpiente = nuevo_elemento('div', 'estilo_serpiente', 'Este elemento representa graficamente la serpiente, equivale a una extremidad');
        establecer_posicion_en_mapa(extremidad_serpiente, obj);

        area_juego.appendChild(extremidad_serpiente);
    });
}


function posicion_comida() {
    const pos_x = Math.floor( Math.random() * grid_x_e_y ) + 1;
    const pos_y = Math.floor( Math.random() * grid_x_e_y ) + 1;
    return {x:pos_x, y:pos_y};
}

function crear_comida() {
    //Crea la comida
    const mas_comida = nuevo_elemento('div', 'estilo_comida', 'Este elemento representa graficamente la comida, equivale a 1 punto');    
    establecer_posicion_en_mapa(mas_comida, cont_posicion_comida);

    area_juego.appendChild(mas_comida);
}

function movimiento() {
    //Haz una copia del elemento 0 -- NO UTILIZA EL ELEMENTO 0
    const movimiento = {...posicion_en_area[0]};
    switch (direccion_elegida) {
        case 'ArrowUp':
            movimiento.y--
        break;
        case 'ArrowRight':
            movimiento.x++
        break;
        case 'ArrowDown':
            movimiento.y++
        break;
        case 'ArrowLeft':
            movimiento.x--
        break;
        default:
            movimiento.x--
        break;
    }
    crear_serpiente();
    posicion_en_area.unshift(movimiento);
    posicion_en_area.pop();
}

function f_agrup() {
    movimiento();
    console.log(posicion_en_area.length)
}
let dificultad_velocidad_mov;
function empezar() {
    area_juego.innerHTML = "";
    dificultad_velocidad_mov = setInterval(f_agrup, 200);
    crear_comida();
    crear_serpiente();
    d.addEventListener("keydown", (event) => {
        if (
            event.key === 'ArrowDown'  || 
            event.key === 'ArrowUp'    || 
            event.key === 'ArrowRight' || 
            event.key === 'ArrowLeft' 
            ) {
            direccion_elegida = event.key;

        }
    })
}
function finalizar() {
    window.clearInterval(dificultad_velocidad_mov);
    dificultad_velocidad_mov = null;
    area_juego.innerHTML = "";
}
d.querySelector('#empezar').addEventListener('click', empezar);
d.querySelector('#pausa').addEventListener('click', finalizar);