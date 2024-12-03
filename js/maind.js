"use strict"
// delacracion de la url de froma global
const URL_GLOBAL = 'https://6672f3a86ca902ae11b28441.mockapi.io/destinos-con-preciso';

// mostrar informacsicon por pantalla
let notificar = document.querySelector("#notificacion_de_edicion");
let contenedor = document.querySelector("#contenido_del_ajax");
let salida_de_errores = document.querySelector("#salida_de_errores");

//delacracion asi es mas facli modificar ese vlaor y poder mostrar en que parte de la tabla estas
let pos_de_pagina = 1;
// nuemro del capchat
let numero_aleatorio;

// botones de llamado de funciones para traer os html con parcial render y mostarr en la pagina
document.querySelector("#boton-menu-js").addEventListener("click", enCabezado);
document.querySelector("#traer_inicio").addEventListener("click", traer_iniccio);
document.querySelector("#traer_comodidad").addEventListener("click", traer_comodid)
document.querySelector("#traer_horario_cole").addEventListener("click", traer_horarios_cole);
document.querySelector("#traer_suscrivite").addEventListener("click", traer_suscribite);
document.querySelector("#traer_destino").addEventListener("click", traer_destinos);

// funciion que se encarga del menu en mobial y en compu
function enCabezado() {
    let menu = document.querySelector('.barra-de-navegacion');
    menu.classList.toggle('abierta');
    let cabeza_de_menu = document.querySelector('.boton-menu');
    cabeza_de_menu.classList.toggle('abierta');
    let boton_de_menu = document.querySelector('#boton-menu-js');
    boton_de_menu.classList.toggle('abierta');
}

// traer contendio con ajax con parciual render 

traer_iniccio(); // traer incio asi ya aparce cargoa una vez que entras a la pagina
async function traer_iniccio() {
    contenedor.innerHTML = "<h1>Loading...</h1>";

    try {
        let response = await fetch('cont-index.html');
        if (response.ok) {
            let contendio = await response.text()
            contenedor.innerHTML = contendio;
            notificar.innerHTML = '';

        }
        else {
            contenedor.innerHTML = "<h1>Error - Failed URL!</h1>";
        }

    }
    catch (error) {
        contenedor.innerHTML = "<h1>Connection error</h1>";
    };
};

async function traer_comodid() {

    contenedor.innerHTML = "<h1>Loading...</h1>";

    try {
        let response = await fetch('comodidad.html');
        if (response.ok) {
            let contendio = await response.text()
            contenedor.innerHTML = contendio;
            notificar.innerHTML = '';
        }
        else {
            contenedor.innerHTML = "<h1>Error - Failed URL!</h1>";
        }

    }
    catch (error) {
        contenedor.innerHTML = "<h1>Connection error</h1>";
    };
};

async function traer_horarios_cole() {

    contenedor.innerHTML = "<h1>Loading...</h1>";
    try {
        let response = await fetch('horarios-de-colectivos-y-equipaje.html');
        if (response.ok) {
            let contendio = await response.text()
            contenedor.innerHTML = contendio;
            notificar.innerHTML = '';
            funciones_del_horarios_cole();
        }
        else {
            contenedor.innerHTML = "<h1>Error - Failed URL!</h1>";
        }

    }
    catch (error) {
        contenedor.innerHTML = "<h1>Connection error</h1>";
    };
};

async function traer_suscribite() {

    contenedor.innerHTML = "<h1>Loading...</h1>";
    try {
        let response = await fetch('suscribete.html');
        if (response.ok) {
            let contendio = await response.text()
            contenedor.innerHTML = contendio;
            notificar.innerHTML = '';
            funciones_de_suscribite();

        }
        else {
            contenedor.innerHTML = "<h1>Error - Failed URL!</h1>";
        }

    }
    catch (error) {
        contenedor.innerHTML = "<h1>Connection error</h1>";
    };
};
async function traer_destinos() {
    contenedor.innerHTML = "<h1>Loading...</h1>";
    try {
        let response = await fetch('destinos.html');
        if (response.ok) {
            let contendio = await response.text();
            contenedor.innerHTML = contendio;
            funciones_del_destino();

        }
        else {
            contenedor.innerHTML = "<h1>Error - Failed URL!</h1>";
        }

    }
    catch (error) {
        contenedor.innerHTML = "<h1>Connection error</h1>";
    };
}

// cierre del contneido del ajax

// funciones internas de los html que se trae con parcial render
function funciones_del_horarios_cole() {
    document.querySelector("#boton_mdp_a_bs").addEventListener("click", horario_de_Mdp_Ba);
    document.querySelector("#boton_bs_a_mdp").addEventListener("click", horario_de_Ba_Mdp);
}
function horario_de_Mdp_Ba() {
    document.querySelector('.horarios_mdp_ba_oculto').classList.toggle('visible');
}
function horario_de_Ba_Mdp() {
    document.querySelector('.horarios_ba_mdp_oculto').classList.toggle('visible');
}
function funciones_de_suscribite() {
    let boton = document.querySelector("#formulario").addEventListener("submit", ecuaciones_suma_resta_multiplicacion_division);
    numero_aleatorio = Math.floor(Math.random() * 100) + 1;
    document.querySelector("#numero_aleatorio_brindado").textContent = "numero aleatorio: " + numero_aleatorio;
}
function ecuaciones_suma_resta_multiplicacion_division(e) {
    e.preventDefault();
    let resultado;
    let num1 = Number(document.querySelector("#num1").value);
    let num2 = Number(document.querySelector("#num2").value);
    let operacion = document.querySelector("#operacion").value;

    switch (operacion) {
        case "suma": resultado = (num1 + num2); break;
        case "resta": resultado = (num1 - num2); break;
        case "multiplicacion": resultado = (num1 * num2); break;
        case "division": resultado = (num1 / num2); break;
    }
    document.querySelector("#resultado").innerHTML = "el resultado es: " + resultado;

    if (resultado == numero_aleatorio) {
        document.querySelector("#accesoaceptado").innerHTML = "aceptado";
    } else {
        document.querySelector("#accesodenegado").innerHTML = "acceso denegado,eres un robot";
    }
}




// funcion todo lo que es la tabala 
async function funciones_del_destino() {

    await cargado_por_partes_la_tabal(pos_de_pagina); // llama al a tbala asi carga y se muestar el contidio de un primer monto 

    document.querySelector("#boton-de-agr-a-tabala").addEventListener("click", enviar_dato); // llamaod a enviar datos cunado toca el boton

    document.querySelector("#agragar_muchas_veces").addEventListener("click", function () {

        let numeor_por_el_usuario = parseInt(document.querySelector("#can_de_agregagr").value); // gurdo en nuemro que me ingrea el usurrio de cuntas veces quiero subir ese dato

        for (let i = 0; i < numeor_por_el_usuario; i++) {
            enviar_dato();
        }

    });
    
    document.querySelector("#buscar").addEventListener("click", buscar_en_la_tabla); //llamado l metdo de filtrdo o buscar en la tabala
    
    // funciones de paginacion, los dos metodos funciona de la misma manera, uno corre al a izqueirda y otro a la dercha 
    document.querySelector("#correr_pagina_izquierda").addEventListener("click", function () {
        // (ese limite es para que no sea -1 o 0) se evalua el valor, se resat uno y se llama al mtdo con ese vlaor por parametro
        if (pos_de_pagina > 1) { 
            pos_de_pagina--;
            cargado_por_partes_la_tabal(pos_de_pagina);

        }
    });
    document.querySelector("#correr_pagina_derecha").addEventListener("click", function () {
        // se suma uno al tocar el boton, y se repite lo mismo que anterior, se lo pasa por parametro
        pos_de_pagina++;
        cargado_por_partes_la_tabal(pos_de_pagina);
    })



}
async function cargado_por_partes_la_tabal(pos) {
    const url_nueva = new URL(URL_GLOBAL);
    url_nueva.searchParams.append('page', pos);
    url_nueva.searchParams.append('limit', 4);
    // (https://6672f3a86ca902ae11b28441.mockapi.io/destinos-con-preciso) la nueva url es asi se le agrga la pacicion en la uqe va a estara y la can de elementos visibles 
    
    let pos_de_la_tabala = document.querySelector("#mostrar_ubicacion_de_la_tabala");

    try {
        // Realizar la solicitud fetch con la URL completa
        let res = await fetch(url_nueva, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            let respuesta = await res.json(); 
            pos_de_la_tabala.innerHTML = pos;
            await mostrar_tabala(respuesta);

        } else {
            console.log('Error fetching tasks:', res.statusText);
        }
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

async function mostrar_tabala(respuesta) {

    try {
        let tablaCuerpo = document.querySelector("#tabla-destinos");
        tablaCuerpo.innerHTML = '';

        for (const j of respuesta) {
            let destino = j.destino;
            let precio = `$${j.precio}`;
            let duracion = j.duracion;
            let id = j.id;

            tablaCuerpo.innerHTML += `
                        <tr>
                            <td>${destino}</td>
                            <td>${precio}</td>
                            <td>${duracion}</td>
                            <td><button id="borrar_tab">Eliminar</button></td>
                            <td><button id="editar_tab">Editar</button></td>
                        </tr>
                    `;

        }


        let boton_eliminar = document.querySelectorAll("#borrar_tab");
        let boton_editar = document.querySelectorAll("#editar_tab");

        for (let i = 0; i < boton_eliminar.length; i++) {
            boton_eliminar[i].addEventListener("click", function () {
                borrar(respuesta[i].id);
            });
        }

        for (let i = 0; i < boton_editar.length; i++) {
            boton_editar[i].addEventListener("click", function () {
                editar(respuesta[i].id, respuesta[i].destino);
            });
        }

    } catch (error) {
        console.log(error);
        salida_de_errores.innerHTML = "Hubo un error al mostrar la tabla";
    }
}

async function enviar_dato() {

    let opcion_de_destino = document.querySelector("#destino_a_agregar").value;
    let opcion_de_precio = document.querySelector("#precio_a_agregar").value;
    let opcion_de_duracion = document.querySelector("#duracion_a_agregar").value;

    let agregar = {
        "destino": opcion_de_destino,
        "precio": opcion_de_precio,
        "duracion": opcion_de_duracion
    }

    try {
        let res = await fetch(URL_GLOBAL, {
            
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(agregar)

        });
        if (res.ok) {

            let respuesta = await res.json();
            notificar.innerHTML = "Se agrego";
            await cargado_por_partes_la_tabal(pos_de_pagina);

        }
    } catch (error) {

        console.log(error);
        salida_de_errores.innerHTML = "hubo un error";

    }
}

async function borrar(id) {
    try {

        let res = await fetch(`${URL_GLOBAL}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {

            let respuesta = await res.json();
            notificar.innerHTML = "Se borro"
            await cargado_por_partes_la_tabal(pos_de_pagina);
        }

    } catch (error) {

        console.log('Error:', error);
        salida_de_errores.innerHTML = "hubo un error";

    }
}

async function editar(id, destino) {

    notificar.innerHTML = "Ya podes editar " + destino;
    let agregar = {};

    document.querySelector("#boton-de-confirmar-edit").addEventListener("click", async function () {
        let opcion_de_destino = document.querySelector("#destino_a_agregar").value;
        let opcion_de_precio = document.querySelector("#precio_a_agregar").value;
        let opcion_de_duracion = document.querySelector("#duracion_a_agregar").value;

        agregar = {
            "destino": opcion_de_destino,
            "precio": opcion_de_precio,
            "duracion": opcion_de_duracion
        };

        try {
            let res = await fetch(`${URL_GLOBAL}/${id}`, {
                "method": "PUT",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(agregar)
            });

            if (res.ok) {
                let respuesta = await res.json();
                await cargado_por_partes_la_tabal(pos_de_pagina);
                notificar.innerHTML = 'Se edito con exito';

            }

        } catch (error) {
            console.log(error);
        }

    });

}

async function buscar_en_la_tabla() {

    let mostrar_respuesta = document.querySelector("#respuesta_de_lo_buscado");
    
    mostrar_respuesta.innerHTML = "";

    let buscar = document.querySelector("#buscar_en_tabal").value;

    const searchUrl = new URL(URL_GLOBAL);    
    searchUrl.searchParams.append("destino", buscar);

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            let respuesta = await response.json();
            await mostrar_tabala(respuesta);
            notificar.innerHTML = "Se enconto";

        } else {
            mostrar_respuesta.innerHTML = "<p>No se pudieron obtener los datos de la búsqueda</p>";
        }

    } catch (error) {
        mostrar_respuesta.innerHTML = "<p>Error de conexión</p>";
    }
    
}