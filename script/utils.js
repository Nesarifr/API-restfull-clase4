/* ------------------- Verificar contenido de los objetos ------------------- */

const arrayKeys=[
    "title",
    "price",
    "thumbnail"
];

const typeOfValues = [ "string", "number", "string"] 

const verificarRequest= (body)=>{
    let verificarKeys = Object.keys(body); //array con keys para verificar
    if (verificarKeys.length===3){ //verifica el largo primero
        for (let index = 0; index < verificarKeys.length; index++) {
            if(verificarKeys[index]!==arrayKeys[index]){
                if(arrayKeys.includes(verificarKeys[index])){
                    return `La clave ${verificarKeys[index]} tendria que estar en la ubicacion ${arrayKeys.indexOf(verificarKeys[index])+1}`
                } else return `La clave ${verificarKeys[index]} esta mal escrita o no coincide con las claves necesarias.`
            }
            else if(!(typeof(body[verificarKeys[index]])==typeOfValues[index])){
                return `El tipo de dato en la clave ${verificarKeys[index]} es incorrecto, deberia ser un: ${typeOfValues[index]}`
            }
        }
        
    } else return `Esta faltando un dato de la peticion`
    return true
}
module.exports = {verificarRequest};

/* --------------------------------- pruebas -------------------------------- */

// body1={title:null, price:null, thumbnail:null }
// console.log("---------------------------------------------------------------");
// console.log("Primer prueba da:  " + verificarRequest(body1))

// body2={title:"titulo", price:null, thumbnail:null }
// console.log("---------------------------------------------------------------");
// console.log("Segunda prueba da:   " + verificarRequest(body2))

// body3={title:"titulo", price: 100, thumbnail:"url" }
// console.log("---------------------------------------------------------------");
// console.log("Tercer prueba da:   " + verificarRequest(body3))
