function sumar(num1, num2) {
    resultado = num1 + num2
    return resultado
}

function restar(num1, num2) {
    resultado = num1 - num2
    return resultado
}

function multiplicar(num1, num2) {
    resultado = num1 * num2
    return resultado
}

function dividir(num1, num2) {
    resultado = num1 / num2
    return resultado
}

let continuar = false
const resultados = []

alert("Bienvenido a la calculadora menos eficiente")
do {
    operacion = prompt("desea realizar una suma, una resta, una multiplicacion o una division?")
    switch(operacion){
       
        case "suma":
            if (continuar == true){
                num1 = resultados[(resultados.length - 1)]
                num2 = parseInt(prompt("ingrese el numero que quiere sumar a " + resultados[(resultados.length - 1)]))
                resultado = sumar(num1,num2)

                resultados.splice((resultados.length -2),2)
                resultados.push("+", num2, "=",resultado)
                continuar = confirm("La suma da como resultado: " + resultado + ", quiere continuar con la operacion?")
            }
            else {
                num1 = parseInt(prompt("ingrese el primer numero a sumar"))
                num2 = parseInt(prompt("ingrese el segundo numero a sumar"))
                resultado = sumar(num1,num2)

                resultados.push(num1, "+", num2, "=",resultado)
                continuar = confirm("La suma da como resultado: " + resultado + ", quiere continuar con la operacion?")
            }
            break

        case "resta":
            if (continuar == true){
                num1 = resultados[(resultados.length - 1)]
                num2 = parseInt(prompt("ingrese el numero que quiere restar a " + resultados[(resultados.length - 1)]))
                resultado = restar(num1,num2)

                resultados.splice((resultados.length -2),2)
                resultados.push("-", num2, "=",resultado)
                continuar = confirm("La resta da como resultado: " + resultado + ", quiere continuar con la operacion?")
            }
            else {
                num1 = parseInt(prompt("ingrese el primer numero a restar"))
                num2 = parseInt(prompt("ingrese el segundo numero a restar"))
                resultado = restar(num1,num2)

                resultados.push(num1, "-", num2, "=",resultado)
                continuar = confirm("La resta da como resultado: " + resultado + ", quiere continuar con la operacion?")
            }
            break

        case "multiplicacion":
            if (continuar == true){
                num1 = resultados[(resultados.length - 1)]
                num2 = parseInt(prompt("ingrese el numero que quiere multiplicar por " + resultados[(resultados.length - 1)]))
                resultado = multiplicar(num1,num2)

                resultados.splice((resultados.length -2),2)
                resultados.push(")", "*", num2, "=",resultado)
                resultados.unshift("(")
                continuar = confirm("La multiplicacion da como resultado: " + resultado + ", quiere continuar con la operacion?")
            }
            else {
                num1 = parseInt(prompt("ingrese el primer numero a multiplicar"))
                num2 = parseInt(prompt("ingrese el segundo numero a multiplicar"))
                resultado = multiplicar(num1,num2)

                resultados.push(num1, "*", num2, "=",resultado)
                continuar = confirm("La multiplicacion da como resultado: " + resultado + ", quiere continuar con la operacion?")
            }
            break

        case "division":
            if (continuar == true){
                num1 = resultados[(resultados.length - 1)]
                num2 = parseInt(prompt("ingrese el numero por el que quiere dividir a " + resultados[(resultados.length - 1)]))
                if (num2 == 0) {
                    alert("No te pases de vivo")
                    continuar = false
                }
                else {
                    resultado = dividir(num1,num2)

                    resultados.splice((resultados.length -2),2)
                    resultados.push(")","/", num2, "=",resultado)
                    resultados.unshift("(")
                    continuar = confirm("La division da como resultado: " + resultado + ", quiere continuar con la operacion?")
                }
            }
            else {
                num1 = parseInt(prompt("ingrese el primer numero a dividir"))
                num2 = parseInt(prompt("ingrese el segundo numero a dividir"))
                if (num1 == 0 || num2 == 0) {
                    alert("No te pases de vivo")
                    continuar = false
                }
                else{
                    resultado = dividir(num1,num2)

                    resultados.push(num1, "/", num2, "=",resultado)
                    continuar = confirm("La division da como resultado: " + resultado + ", quiere continuar con la operacion?")
                }
            }
            break

        default:
            alert("operacion no valida")
            calcular = false

            break

    }
    
} while (continuar == true)
if (resultados.length == 0) {
    alert("No hiciste suficientes calculos")
}
else{
    alert("tus cuentas fueron las siguientes: " + resultados.join(" "))
    console.log(resultados.join(" "))
}
