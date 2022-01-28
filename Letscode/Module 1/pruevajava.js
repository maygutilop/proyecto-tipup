division(2,5)
function division(x,y){
let div= x/y;
console.log(div);
}


function suma (peras,manzanas,ciruelas){
// aqui tenemos parametro, parametro es el nombre que le ponemos a la funcion, puede ser cuelquiera, en este caso peras, manzanas y ciruelas
//luego esto lo vamos a cambiar por numeros es un nombre que le ponemso nosotros 
let suma= peras+manzanas+ciruelas;
// aqui ponemos lo que va a hacer la funcion, en este caso ponemos el parametro y + que es suma
console.log(suma)
//aqui estamos poniendo en la consola la funcion suma en el buscador f12
}
suma(5,2,5)
//en este apartado estamos llamando la funcion es el (argumento) le estamos dando valores reales a peras, manzana y ciruelas y aqui ya esta llamando la funcion 
//y nos va a dar el resultado de los valores que pongamos es una llamada de funciones
suma(8,5,5)
division(8,2,5)
suma(5,2,6)

let array_numeros = [2,4,123,78,56,332,125,82,33,258,307,425,17,15,337,921, 625, 285, 288, 130, 28, 88, 155, 202]
function pares (numeros){
for (let i = 0; i<numeros.length ; i++) {
if (numeros[i]%2==0) {
console.log(numeros[i])    
}
    
}
}
pares(array_numeros)

let array_numeros = [2,4,123,78,56,332,125,82,33,258,307,425,17,15,337,921, 625, 285, 288, 130, 28, 88, 155, 202]
function pares (numeros){
for (let i = 0; i<numeros.length ; i++) {
if (numeros[i]%2==0) {
console.log(numeros[i])    
}
    
}
}
pares(array_numeros)