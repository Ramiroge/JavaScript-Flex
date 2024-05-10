

// Definición de variables globales y constantes
const contenedorMayor = document.getElementById("Container-Main");
const contenedorCard = document.getElementsByClassName("card");
const contenedorCarrito = document.getElementById("contenidoCarrito");
const boton = document.querySelector("#boton");
const listaDeCategorias = document.getElementsByClassName("list");
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias);

// Definición de funciones

// Funciones para manejar localStorage
function guardarCategoriaActual(categoria) {
    localStorage.setItem("categoriaActual", categoria);
}

function obtenerCategoriaActual() {
    return localStorage.getItem("categoriaActual");
}

function obtenerCarrito() {
    return localStorage.getItem("Carrito");
}

// Función para mostrar chocolates por categoría
function mostrarChocolatesPorCategoria(categoria) {
    contenedorMayor.innerHTML = "";
    
    fetch("./json/info.json")
    .then(datos => {
        if(!datos.ok){
            throw new Error("Error al traer los datos")
        } else {
            return datos.json()
        }
    })
    .then(productos => {
        const ChocolatesFiltrados = productos.chocolates.filter((chocolate) => {
            return chocolate.categoria.toUpperCase() === categoria.toUpperCase();
        });

        if (categoria.toUpperCase() === "SIN AZUCAR") {
            const chocolatesSinAzucarEspeciales = productos.chocolates.filter((chocolate) => {
                return chocolate.categoria.toUpperCase() === "AMARGOS" &&
                    (parseInt(chocolate.cacao) === 80 || parseInt(chocolate.cacao) === 100) ||
                    chocolate.leche.toUpperCase().includes("LECHE DE COCO");
            });
        
            ChocolatesFiltrados.push(...chocolatesSinAzucarEspeciales);
        }

        ChocolatesFiltrados.forEach((chocolate) => {
            crearChocolate(chocolate);
        });
    })
    .catch(e => {
        console.error("Hubo un error al operar con fetch " + e.message);
    });
}

// Función para crear una tarjeta para cada chocolate
const crearChocolate = (Chocolate) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.textContent = Chocolate.nombre;

    const cacao = document.createElement('p');
    cacao.textContent = `Cacao: ${Chocolate.cacao}`;

    const leche = document.createElement('p');
    leche.textContent = `Leche: ${Chocolate.leche}`;

    const imagen = document.createElement('img');
    imagen.src = Chocolate.imagen;
    imagen.alt = Chocolate.nombre;

    const precio = document.createElement('p');
    precio.textContent = `Precio: ${Chocolate.precio}`;

    const boton = document.createElement('button');
    boton.textContent = "Comprar";
    boton.addEventListener("click", () => agregarProducto(Chocolate.nombre, Chocolate.precio, Chocolate.id));
    boton.id = `botonDeCompra${Chocolate.id}`;

    card.appendChild(title);
    card.appendChild(cacao);
    card.appendChild(leche);
    card.appendChild(imagen);
    card.appendChild(precio);
    card.appendChild(boton);

    contenedorMayor.appendChild(card);
}

// Función para cambiar color de fondo
function cambiarColorFondo() {
    console.log("hola")
    contenedorMayor.classList.toggle("modoOscuro");
    contenedorCarrito.classList.toggle("modoOscuro");
    Array.from(contenedorCard).forEach(card => {
        card.classList.toggle("modoOscuro");
    });

}

// Función para guardar el carrito
function guardarCarrito(listaCarrito) {
    const contenidoCarrito = listaCarrito.innerHTML;
    localStorage.setItem("Carrito", contenidoCarrito);
}

// Funcion para calcular el total de carrito
function actualizarTotal() {
    const listaCarrito = document.querySelector('.listaCarrito');
    const productosEnCarrito = listaCarrito.querySelectorAll('li');

    let total = 0;

    productosEnCarrito.forEach(producto => {
        const cantidadTexto = producto.querySelector('.cantidad').textContent;
        const cantidad = parseInt(cantidadTexto);
        const precioTexto = producto.textContent.match(/Precio: (\d+)/);
        if (precioTexto) {
            const precio = parseInt(precioTexto[1]);
            total += precio * cantidad;
        }
    });

    document.getElementById('total').textContent = `Total: $${total}`;
}

// Función para agregar un producto al carrito
function agregarProducto(nombre, precio, id) {
    const listaCarrito = document.querySelector('.listaCarrito');

    // Verificar si el producto ya está en el carrito
    const productosEnCarrito = listaCarrito.getElementsByClassName(`guardarEnCarrito${id}`);
    if (productosEnCarrito.length > 0) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        const cantidadElemento = productosEnCarrito[0].querySelector('.cantidad');
        let cantidad = parseInt(cantidadElemento.textContent);
        cantidad++;
        cantidadElemento.textContent = cantidad;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        const productoNuevo = document.createElement('li');
        productoNuevo.innerHTML = `<span class="cantidad">1</span> x ${nombre} - Precio: ${precio}`;
        productoNuevo.classList = `guardarEnCarrito${id}`;
        listaCarrito.appendChild(productoNuevo);
    }
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Producto agregado al carrito",
        text: `${nombre} - Precio: ${precio}`
      });
    guardarCarrito(listaCarrito);
    actualizarTotal();
}

// Función para abrir el carrito
function abrirCarrito() {
    contenidoCarrito.classList.toggle("mostrar");
}

// Función para borrar el carrito
function borrarCarrito() {
    document.getElementById("listaCarrito").innerHTML = "<ul></ul>";
    guardarCarrito(listaCarrito);
    actualizarTotal();
    Swal.fire({
        icon: "success",
        title: "Carrito borrado",
        text: "El carrito ha sido borrado",
        timer: 2500
    })
}

// Asignación de eventos y lógica relacionada con el DOM
ArrayDeListaDeCategoria.forEach(list => {
    list.addEventListener("click", (e) => {
        let categoria = e.target.innerText;

        guardarCategoriaActual(categoria);

        mostrarChocolatesPorCategoria(categoria);
    });
});

boton.addEventListener("click", cambiarColorFondo);
carrito.addEventListener("click", abrirCarrito);
borrador.addEventListener("click", borrarCarrito);

// Llamadas a funciones necesarias al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    const categoriaAlmacenada = obtenerCategoriaActual();
    if (categoriaAlmacenada) {
        mostrarChocolatesPorCategoria(categoriaAlmacenada);
    }
    const contenidoCarrito = obtenerCarrito();
    if (contenidoCarrito) {
        const listaCarrito = document.querySelector('.listaCarrito');
        listaCarrito.innerHTML = contenidoCarrito;
        actualizarTotal();
    }
});

