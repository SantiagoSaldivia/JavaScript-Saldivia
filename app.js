// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Camiseta primer equipo',
        precio: 500,
        imagen: 'imagen2.webp'
    },
    {
        id: 2,
        nombre: 'Camiseta segundo equipo',
        precio: 300,
        imagen: 'imagen5.webp'
    },
    {
        id: 3,
        nombre: 'Camiseta tercer equipo',
        precio: 200,
        imagen: 'imagen1.webp'
    },
    {
        id: 4,
        nombre: 'Camiseta Campeones Monumentales',
        precio: 300,
        imagen: 'imagen1.webp'
    },
    {
        id: 5,
        nombre: 'Camperon River',
        precio: 1000,
        imagen: 'imagen4.webp'
    },
    {
        id: 6,
        nombre: 'Camiseta alternativa',
        precio: 400,
        imagen: 'imagen6.webp'
    },
    {
        id: 7,
        nombre: 'Buzo estampado',
        precio: 200,
        imagen: 'imagen7.webp'
    },
    {
        id: 8,
        nombre: 'Chomba River',
        precio: 150,
        imagen: 'imagen8.webp'
    },
    {
        id: 9,
        nombre: 'Pantalón',
        precio: 50,
        imagen: 'imagen9.webp'
    }
];
let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
// Funciones


function renderizarProductos() {
    baseDeDatos.forEach((info) => {
       
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
     
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
     
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
     
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
   
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
      
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Añadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}


function renderizarCarrito() {
    // Vaciamos todo el htmlhhgg
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();