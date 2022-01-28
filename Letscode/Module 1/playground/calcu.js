
document.getElementById("suma").addEventListener("click",suma)
document.getElementById("1").addEventListener("click",number1)

var number1= 1
var number2= 2
var number1= 1
console.log

function suma() {
    var x = document.getElementById("in1");
    var y = document.getElementById("in2");
    var resultadosuma = parseFloat(x.value) + parseFloat(y.value)
    var result = document.getElementById("in3");
    result.innerText = resultadosuma;
} 
function resta() {
    var x = document.getElementById("in1");
    var y = document.getElementById("in2");
    var resultadoresta = parseFloat(x.value) - parseFloat(y.value)
    var result = document.getElementById("in3");
    result.innerText = resultadoresta;
}
function multiplicacion() {
    var x = document.getElementById("in1");
    var y = document.getElementById("in2");
    var resultadomultiplicacion = parseFloat(x.value) * parseFloat(y.value)
    var result = document.getElementById("in3");
    result.innerText = resultadomultiplicacion;
}
function division() {
    var x = document.getElementById("in1");
    var y = document.getElementById("in2");
    var resultadodivision = parseFloat(x.value) / parseFloat(y.value)
    var result = document.getElementById("in3");
    result.innerText = resultadodivision;
}