// Definición de la clase Chocolate
// class Chocolate {
//     constructor(nombre, cacao, leche, imagen, categoria, precio, id) {
//         this.nombre = nombre;
//         this.cacao = cacao;
//         this.leche = leche;
//         this.imagen = imagen;
//         this.categoria = categoria; 
//         this.precio = precio;
//         this.id = id;
//     }
// }



// Obtener elementos del DOM
const contenedorMayor = document.getElementById("Container-Main");
const contenedorBody = document.getElementById("Container-Main");
const contenedorCard = document.getElementsByClassName("card");
const boton = document.querySelector("#boton");
const listaDeCategorias = document.getElementsByClassName("list");
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias);



// Lista de chocolates
// const Chocolates = [
//     new Chocolate("Chocolate con Leche", "40%", "Leche Tradicional", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Con Leche", "2000", "LAT"),
//     new Chocolate("Chocolate Blanco con Vainilla Natural",  "30%", "Leche Tradicional", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-blanco-con-vainilla-natural21-b290518d96e888c0a816899751055748-640-0.webp", "Con Leche", "2100", "BLA"),
//     new Chocolate("Chocolate Amargo con Almendras & Sal Marina",  "73%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-amargo-cacao-73-plant-based-almendras-sal-marina21-d924303c55f18e684616899751842109-640-0.webp", "Amargos", "2400", "ALM73"),
//     new Chocolate("Chocolate Orgánico Amargo",  "73%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-organico-amargo-cacao-73-plant-based31-6c7ab2cdd406866fea16899750928053-640-0.webp", "Amargos", "2300", "AMA"),
//     new Chocolate("Chocolate Amargo al 80",  "80%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-amargo-cacao-80-plant-based-sin-azucar11-d504209a254896cd0716940159910474-640-0.webp", "Amargos", "2900", "80"),
//     new Chocolate("Chocolate Amargo al 100",  "100%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-organico-extra-amargo-cacao-100-plant-based-sin-azucar11-36c188ed948ca8f49616940178428852-640-0.webp", "Amargos", "3000", "100"),
//     new Chocolate("Chocolate con Leche de Coco Plant Based, Con Flakes de Arroz",  "39%", "Leche de Coco", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche-de-coco-plant-based-flakes-de-arroz-sin-azucar11-0205976308caff0c7c16940159530164-640-0.webp", "Veganos", "2800", "LCARROZ"),
//     new Chocolate("Chocolate con Leche de Coco, Plant Based, Con Granos de Café Molidos",  "35%", "Leche de Coco", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche-de-coco-plant-based-granos-de-cafe-sin-azucar11-14d86893058c627e2f16940159690861-640-0.webp", "Veganos", "2800", "LCCAFE"),
// ];




// Al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay una categoría almacenada en localStorage
    const categoriaAlmacenada = obtenerCategoriaActual();
    if (categoriaAlmacenada) {
        // Mostrar los chocolates de la categoría almacenada
        mostrarChocolatesPorCategoria(categoriaAlmacenada);
    }
    // Obtener y mostrar el contenido del carrito si existe
    const contenidoCarrito = obtenerCarrito();
    if (contenidoCarrito) {
        const listaCarrito = document.querySelector('.listaCarrito');
        listaCarrito.innerHTML = contenidoCarrito;
    }
});

// Funciones para manejar localStorage
function guardarCategoriaActual(categoria) {
    localStorage.setItem("categoriaActual", categoria);
}

function obtenerCategoriaActual() {
    return localStorage.getItem("categoriaActual");
}

// Mostrar chocolates por categoría
function mostrarChocolatesPorCategoria(categoria) {
    const ChocolatesFiltrados = Chocolates.filter((Chocolate) => {
        return Chocolate.categoria.toUpperCase() == categoria.toUpperCase();
    });

    if (categoria.toUpperCase() === "SIN AZUCAR") {
        const chocolatesSinAzucarEspeciales = Chocolates.filter((Chocolate) => {
            return Chocolate.categoria.toUpperCase() === "AMARGOS" &&
                (parseInt(Chocolate.cacao) === 80 || parseInt(Chocolate.cacao) === 100) ||
                Chocolate.leche.toUpperCase().includes("LECHE DE COCO");
        });
        
        ChocolatesFiltrados.push(...chocolatesSinAzucarEspeciales);
    }

    contenedorMayor.innerHTML = "";

    ChocolatesFiltrados.forEach((Chocolate) => {
        crearChocolate(Chocolate);
    });
}

// Manejo de eventos para cada categoría
ArrayDeListaDeCategoria.forEach(list => {
    list.addEventListener("click", (e) => {
        let categoria = e.target.innerText;

        guardarCategoriaActual(categoria);

        mostrarChocolatesPorCategoria(categoria);
    });
});

// Cambiar color de fondo
function cambiarColorFondo() {
    contenedorBody.classList.toggle("modoOscuro")
    Array.from(contenedorCard).forEach(card => {
        card.classList.toggle("modoOscuro");
    });
}

boton.addEventListener("click", cambiarColorFondo);



// Crear una tarjeta para cada chocolate
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



// Crear tarjetas para cada chocolate al cargar la página
// Chocolates.forEach((Chocolate)=>{
//     crearChocolate(Chocolate)
// });

// Manejo de eventos para cada categoría al hacer clic
ArrayDeListaDeCategoria.forEach(list=>{
    list.addEventListener("click", (e)=>{
        let categoria = e.target.innerText

        const ChocolatesFiltrados = Chocolates.filter((Chocolate)=>{
            return Chocolate.categoria.toUpperCase() == categoria.toUpperCase()
        })

        if (categoria.toUpperCase() === "SIN AZUCAR") {
            const chocolatesSinAzucarEspeciales = Chocolates.filter((Chocolate) => {
                return Chocolate.categoria.toUpperCase() === "AMARGOS" && 
                       (parseInt(Chocolate.cacao) === 80 || parseInt(Chocolate.cacao) === 100) ||
                       Chocolate.leche.toUpperCase().includes("LECHE DE COCO");
            });
            
            ChocolatesFiltrados.push(...chocolatesSinAzucarEspeciales);
        }

        contenedorMayor.innerHTML = ""

        ChocolatesFiltrados.forEach((Chocolate)=>{
            crearChocolate(Chocolate)
        })
    })
})

// Carrito de Compras
function abrirCarrito() {
    contenidoCarrito.classList.toggle("mostrar");
}

carrito.addEventListener("click", abrirCarrito);

function borrarCarrito() {
    document.getElementById("listaCarrito").innerHTML = "<ul></ul>";
    guardarCarrito(listaCarrito);
}
borrador.addEventListener("click", borrarCarrito)

// Agregar un producto
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
        productoNuevo.innerHTML = `${nombre} - Precio: ${precio} - <span class="cantidad">1</span>`;
        productoNuevo.classList = `guardarEnCarrito${id}`;
        listaCarrito.appendChild(productoNuevo);
    }

    guardarCarrito(listaCarrito);
}

function borrarProducto(id) {
    const productoABorrar = document.querySelector(`.guardarEnCarrito${id}`);
    productoABorrar.parentNode.removeChild(productoABorrar);
    guardarCarrito(document.querySelector('.listaCarrito'));
}

function guardarCarrito(listaCarrito) {
    const contenidoCarrito = listaCarrito.innerHTML;
    localStorage.setItem("Carrito", contenidoCarrito);
}
function obtenerCarrito() {
    return localStorage.getItem("Carrito");
}




fetch("./json/info.json")
.then(datos => {
    if(!datos.ok){
        throw new Error("Error al traer los datos")
    }else{
        return datos.json()
    }
})
.then(productos => {
    productos.chocolates.forEach(producto => {
        crearChocolate(producto) 
    })
    // agregarEvento() ///////////////////////////////
})
.catch(e => {
    console.error("hubo un error al operar con fetch " + e.message)
})