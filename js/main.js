class Chocolate {
    constructor(nombre, cacao, leche, imagen, categoria) {
        this.nombre = nombre;
        this.cacao = cacao;
        this.leche = leche;
        this.imagen = imagen;
        this.categoria = categoria; 
    }


}

const contenedorBody = document.getElementById("body")

function cambiarColorFondo() {
    contenedorBody.classList.toggle("modoOscuro")
}

const boton = document.querySelector("#boton")

boton.addEventListener("click", cambiarColorFondo)

const contenedorMayor = document.getElementById("Container-Main")

const Chocolates = [
    new Chocolate("Chocolate con Leche", "40%", "Leche Tradicional", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Con Leche"),
    new Chocolate("Chocolate Blanco con Vainilla Natural",  "30%", "Leche Tradicional", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Con Leche"),
    new Chocolate("Chocolate Amargo con Almendras & Sal Marina",  "73%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Amargo"),
    new Chocolate("Chocolate Orgánico Amargo",  "73%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Amargo"),
    new Chocolate("Chocolate Amargo Sin Azúcar al 80",  "80%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Amargo"),
    new Chocolate("Chocolate Amargo Sin Azúcar al 100",  "100%", "Sin Leche", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Amargo"),
    new Chocolate("Chocolate con Leche de Coco Plant Based, Con Flakes de Arroz Sin Azúcar",  "39%", "Leche de Coco", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Vegano"),
    new Chocolate("Chocolate con Leche de Coco, Plant Based, Con Granos de Café Molidos Sin Azúcar",  "35%", "Leche de Coco", "https://acdn.mitiendanube.com/stores/003/236/931/products/chocolate-con-leche21-ce255c0e584758ec4816899752187190-1024-1024.webp", "Vegano"),
];

const crearChocolate = (Chocolate)=>{ 

    contenedorMayor.innerHTML += `
    <div class="card">
        <h3>${Chocolate.nombre}</h3>
        <p>${Chocolate.cacao}</p>
        <p>${Chocolate.leche}</p>
        <img src=${Chocolate.imagen} alt=""/>
    </div>
    `
}


Chocolates.forEach((Chocolate)=>{
    crearChocolate(Chocolate)
})

const listaDeCategorias = document.getElementsByClassName("list")
const ArrayDeListaDeCategoria = Array.from(listaDeCategorias)


ArrayDeListaDeCategoria.forEach(list=>{
    list.addEventListener("click", (e)=>{
        let categoria = e.target.innerText

        const ChocolatesFiltrados = Chocolates.filter((Chocolate)=>{
            return Chocolate.categoria.toUpperCase() == categoria.toUpperCase()
        })

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
