const fs = require("fs");

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.url=`./${this.nombreArchivo}` 
    }
    
    // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(elemento){ 
        try{
            if(fs.existsSync(this.url)){ //si es que existe el archivo ====>>>
                const contenido = await fs.promises.readFile(this.url,"utf-8")
                if(contenido){ //si hay contendio en el archivo
                    const arrayElementos = JSON.parse(contenido)
                    const ultimoID=arrayElementos.reduce((acc,item)=> item.id> acc ? acc=item.id : acc, 0)
                    const nuevoElemento={ ...elemento, id:ultimoID+1}
                    arrayElementos.push(nuevoElemento)
                    await fs.promises.writeFile(this.url, JSON.stringify(arrayElementos, null, 2))
                    return nuevoElemento.id  //retorno el ID solicitado
                }else{// no hay contenido
                    const nuevoElemento={ ...elemento, id:1}
                    await fs.promises.writeFile(this.url, JSON.stringify(nuevoElemento, null, 2))
                    return nuevoElemento.id  //retorno el ID solicitado
                }
            }else{ //no existe el archivo , por lo tanto es el primer elemento
                const nuevoElemento={ ...elemento, id:1}
                await fs.promises.writeFile(this.url, JSON.stringify([nuevoElemento], null, 2))
                return nuevoElemento.id  //retorno el ID solicitado
            } 
        } catch(err) {
            console.log(err)
        }
    }

    // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(numeroID){
        try{
            if(fs.existsSync(this.url)){
                const contenido = await fs.promises.readFile(this.url,"utf-8")
                if(contenido){ //si hay contendio en el archivo
                    const arrayElementos = JSON.parse(contenido) //obtengo todos los elementos del array del archivo
                    const nuevoElemento = arrayElementos.find(item=>item.id==numeroID)
                    if(nuevoElemento){
                        return nuevoElemento
                    }else return null
                } else return null
            } else return null
        }
        catch(err){
            return `No existe el ID ${numeroID} solicitado o ya fue borrado`
        }
    }

    // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo. En caso de que no haya objetos, ret
    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.url,"utf8");
            if(contenido){
                const nuevoArray = JSON.parse(contenido);
                return nuevoArray
            } else{
                return {error: 'No existe una lista de productos todavia'}
            }
        } catch (error) {
            return {error: 'No existe una lista de productos todavia'}
        }
    }

    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deletedById(ID){
        try {
            const contenido = await fs.promises.readFile(this.url,"utf8");
            const nuevoArray = JSON.parse(contenido);
            const arrayFiltrados= nuevoArray.filter(item=>item.id!==ID);
            await fs.promises.writeFile(this.url, JSON.stringify(arrayFiltrados, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.url, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }

    // acutalizaByID(number: ID , json: producto): void - Elimina todos los objetos presentes en el archivo.
    async actualizaByID(ID, actualizacion){
        try{
            const existeProducto=await this.getById(ID)
            if(existeProducto){
                const nuevoArray= await this.getAll()
                let arrayActualizada = []
                if(nuevoArray){
                    arrayActualizada = nuevoArray.map( obj =>{
                        if(obj.id===ID){
                            return {...actualizacion, id: ID}
                        } else return obj
                })} else return null
                await this.deleteAll()
                await fs.promises.writeFile(this.url, JSON.stringify(arrayActualizada, null, 2))
                return {...actualizacion, id: ID}
            }
        } catch(error) {
            console.log(error)
        }
    }
}

/* --------------------------------- exports -------------------------------- */
module.exports = {Contenedor};