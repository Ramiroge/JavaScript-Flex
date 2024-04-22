class Chocolate {
    constructor(nombre, cacao, leche, imagen, categoria) {
        this.nombre = nombre;
        this.cacao = cacao;
        this.leche = leche;
        this.imagen = imagen;
        this.categoria = categoria; 
    }


}

const contenedorMayor = document.getElementById("Container-Main")
const contenedorBody = document.getElementById("Container-Main")
const contenedorCard = document.getElementsByClassName("card")
const boton = document.querySelector("#boton")
const listaDeCategorias = document.getElementsByClassName("list")
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias)
const Chocolates = [
    new Chocolate("Chocolate con Leche", "40%", "Leche Tradicional", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Con Leche"),
    new Chocolate("Chocolate Blanco con Vainilla Natural",  "30%", "Leche Tradicional", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-blanco-con-vainilla-natural21-b290518d96e888c0a816899751055748-640-0.webp", "Con Leche"),
    new Chocolate("Chocolate Amargo con Almendras & Sal Marina",  "73%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-amargo-cacao-73-plant-based-almendras-sal-marina21-d924303c55f18e684616899751842109-640-0.webp", "Amargos"),
    new Chocolate("Chocolate Orgánico Amargo",  "73%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-organico-amargo-cacao-73-plant-based31-6c7ab2cdd406866fea16899750928053-640-0.webp", "Amargos"),
    new Chocolate("Chocolate Amargo al 80",  "80%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-amargo-cacao-80-plant-based-sin-azucar11-d504209a254896cd0716940159910474-640-0.webp", "Amargos"),
    new Chocolate("Chocolate Amargo al 100",  "100%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-organico-extra-amargo-cacao-100-plant-based-sin-azucar11-36c188ed948ca8f49616940178428852-640-0.webp", "Amargos"),
    new Chocolate("Chocolate con Leche de Coco Plant Based, Con Flakes de Arroz",  "39%", "Leche de Coco", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche-de-coco-plant-based-flakes-de-arroz-sin-azucar11-0205976308caff0c7c16940159530164-640-0.webp", "Veganos"),
    new Chocolate("Chocolate con Leche de Coco, Plant Based, Con Granos de Café Molidos",  "35%", "Leche de Coco", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche-de-coco-plant-based-granos-de-cafe-sin-azucar11-14d86893058c627e2f16940159690861-640-0.webp", "Veganos"),
];

boton.addEventListener("click", cambiarColorFondo)

document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay una categoría almacenada en localStorage
    const categoriaAlmacenada = obtenerCategoriaActual();
    if (categoriaAlmacenada) {
        // Mostrar los chocolates de la categoría almacenada
        mostrarChocolatesPorCategoria(categoriaAlmacenada);
    }
});

function guardarCategoriaActual(categoria) {
    localStorage.setItem("categoriaActual", categoria);
}

function obtenerCategoriaActual() {
    return localStorage.getItem("categoriaActual");
}

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

ArrayDeListaDeCategoria.forEach(list => {
    list.addEventListener("click", (e) => {
        let categoria = e.target.innerText;

        // Guardar la categoría actual en localStorage
        guardarCategoriaActual(categoria);

        // Mostrar los chocolates de la categoría seleccionada
        mostrarChocolatesPorCategoria(categoria);
    });
});

function cambiarColorFondo() {
    contenedorBody.classList.toggle("modoOscuro")
    Array.from(contenedorCard).forEach(card => {
        card.classList.toggle("modoOscuro");
    });
}

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

    card.appendChild(title);
    card.appendChild(cacao);
    card.appendChild(leche);
    card.appendChild(imagen);

    contenedorMayor.appendChild(card);
}

Chocolates.forEach((Chocolate)=>{
    crearChocolate(Chocolate)
})

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















// function sumar(num1, num2) {
//     // if (typeof num1 !== 'number' ||  isNaN(num1)) {
//     //     num1 = parseInt(prompt("El primer numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     // else if (typeof num2 !== 'number' || isNaN(num2)){
//     //     num2 = parseInt(prompt("El segundo numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     resultado = num1 + num2
//     return resultado
// }

// function restar(num1, num2) {
//     // if (typeof num1 !== 'number' ||  isNaN(num1)) {
//     //     num1 = parseInt(prompt("El primer numero ingresado no es valido. Ingrese un numero valido:")); 
//     // }
//     // else if (typeof num2 !== 'number' || isNaN(num2)){
//     //     num2 = parseInt(prompt("El segundo numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     resultado = num1 - num2
//     return resultado
// }

// function multiplicar(num1, num2) {
//     // if (typeof num1 !== 'number' ||  isNaN(num1)) {
//     //     num1 = parseInt(prompt("El primer numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     // else if (typeof num2 !== 'number' || isNaN(num2)){
//     //     num2 = parseInt(prompt("El segundo numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     resultado = num1 * num2
//     return resultado
// }

// function dividir(num1, num2) {
//     // if (typeof num1 !== 'number' ||  isNaN(num1)) {
//     //     num1 = parseInt(prompt("El primer numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     // else if (typeof num2 !== 'number' || isNaN(num2)){
//     //     num2 = parseInt(prompt("El segundo numero ingresado no es valido. Ingrese un numero valido:"));
//     // }
//     resultado = num1 / num2
//     return resultado
// }

// let continuar = false
// const resultados = []

// alert("Bienvenido a la calculadora menos eficiente")
// do {
//     operacion = prompt("desea realizar una suma, una resta, una multiplicacion o una division?")
//     switch(operacion){
       
//         case "suma":
//             if (continuar == true){
//                 num1 = resultados[(resultados.length - 1)]
//                 num2 = parseInt(prompt("ingrese el numero que quiere sumar a " + resultados[(resultados.length - 1)]))
//                 resultado = sumar(num1,num2)

//                 resultados.splice((resultados.length -2),2)
//                 resultados.push("+", num2, "=",resultado)
//                 continuar = confirm("La suma da como resultado: " + resultado + ", quiere continuar con la operacion?")
//             }
//             else {
//                 num1 = parseInt(prompt("ingrese el primer numero a sumar"))
//                 num2 = parseInt(prompt("ingrese el segundo numero a sumar"))
//                 resultado = sumar(num1,num2)

//                 resultados.push(num1, "+", num2, "=",resultado)
//                 continuar = confirm("La suma da como resultado: " + resultado + ", quiere continuar con la operacion?")                   
//             }
//             break

//         case "resta":
//             if (continuar == true){
//                 num1 = resultados[(resultados.length - 1)]
//                 num2 = parseInt(prompt("ingrese el numero que quiere restar a " + resultados[(resultados.length - 1)]))
//                 resultado = restar(num1,num2)

//                 resultados.splice((resultados.length -2),2)
//                 resultados.push("-", num2, "=",resultado)
//                 continuar = confirm("La resta da como resultado: " + resultado + ", quiere continuar con la operacion?")
//             }
//             else {
//                 num1 = parseInt(prompt("ingrese el primer numero a restar"))
//                 num2 = parseInt(prompt("ingrese el segundo numero a restar"))
//                 resultado = restar(num1,num2)

//                 resultados.push(num1, "-", num2, "=",resultado)
//                 continuar = confirm("La resta da como resultado: " + resultado + ", quiere continuar con la operacion?")
//             }
//             break

//         case "multiplicacion":
//             if (continuar == true){
//                 num1 = resultados[(resultados.length - 1)]
//                 num2 = parseInt(prompt("ingrese el numero que quiere multiplicar por " + resultados[(resultados.length - 1)]))
//                 resultado = multiplicar(num1,num2)

//                 resultados.splice((resultados.length -2),2)
//                 resultados.push(")", "*", num2, "=",resultado)
//                 resultados.unshift("(")
//                 continuar = confirm("La multiplicacion da como resultado: " + resultado + ", quiere continuar con la operacion?")
//             }
//             else {
//                 num1 = parseInt(prompt("ingrese el primer numero a multiplicar"))
//                 num2 = parseInt(prompt("ingrese el segundo numero a multiplicar"))
//                 resultado = multiplicar(num1,num2)

//                 resultados.push(num1, "*", num2, "=",resultado)
//                 continuar = confirm("La multiplicacion da como resultado: " + resultado + ", quiere continuar con la operacion?")
//             }
//             break

//         case "division":
//             if (continuar == true){
//                 num1 = resultados[(resultados.length - 1)]
//                 num2 = parseInt(prompt("ingrese el numero por el que quiere dividir a " + resultados[(resultados.length - 1)]))
//                 if (num2 == 0) {
//                     alert("No te pases de vivo")
//                     continuar = false
//                 }
//                 else {
//                     resultado = dividir(num1,num2)

//                     resultados.splice((resultados.length -2),2)
//                     resultados.push(")","/", num2, "=",resultado)
//                     resultados.unshift("(")
//                     continuar = confirm("La division da como resultado: " + resultado + ", quiere continuar con la operacion?")
//                 }
//             }
//             else {
//                 num1 = parseInt(prompt("ingrese el primer numero a dividir"))
//                 num2 = parseInt(prompt("ingrese el segundo numero a dividir"))
//                 if (num1 == 0 || num2 == 0) {
//                     alert("No te pases de vivo")
//                     continuar = false
//                 }
//                 else{
//                     resultado = dividir(num1,num2)

//                     resultados.push(num1, "/", num2, "=",resultado)
//                     continuar = confirm("La division da como resultado: " + resultado + ", quiere continuar con la operacion?")
//                 }
//             }
//             break

//         default:
//             alert("operacion no valida")
//             calcular = false

//             break

//     }
    
// } while (continuar == true)
// if (resultados.length == 0) {
//     alert("No hiciste suficientes calculos")
// }
// else{
//     alert("tus cuentas fueron las siguientes: " + resultados.join(" "))
//     console.log(resultados.join(" "))
// }
