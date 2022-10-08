const express = require('express');
const {Contenedor} = require('../script/contenedor.js')
const {verificarRequest} = require('../script/utils')
const router = express.Router();
const datosProductos = new Contenedor('producto.txt')

/* --------- GET '/api/productos/' -> devuelve todos los productos. --------- */
router.get('/', async (req, res)=>{
    try{
        const productos = await datosProductos.getAll()
        if ( productos){
            res.json(productos)
        }
    }
    catch(error){
        res.status(500).send('Error en el servidor')
    }
});

/* ------ GET '/api/productos/:id' -> devuelve un producto según su id. ----- */
router.get('/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const existeProducto = await datosProductos.getById(id)
        if(existeProducto){
            res.json(await datosProductos.getById(parseInt(id)))
        } else res.json({error: 'No existe el archivo solicitado'})
    }
    catch(error){
        res.status(500).send('Error en el servidor')
    }
})

/* ------  POST '/api/productos/' -> recibe y agrega un producto, y lo devuelve con su id asignado. ----- */
router.post('/', async (req, res)=> {
    try{
        const nuevoProducto = req.body;
        const verificaRequest = verificarRequest(req.body);
        if(typeof(verificaRequest)!== "string"){ //Si devuelve String es un error, sera mostrado en res.json
            const nuevoId = await datosProductos.save(nuevoProducto)
            res.json({
                id: nuevoId,
                nuevoProducto: nuevoProducto
            })
        } else res.json({error: verificaRequest})        
    }catch(error){
        res.status(500).send('Error en el servidor')
    }    
})

/* ------  PUT '/api/productos/:id' -> recibe y actualiza un producto según su id. ----- */
router.put('/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const upDate = req.body
        if(Object.keys(upDate).length===3){ //verificar que el body este completo
            const actualizacion = await datosProductos.actualizaByID(parseInt(id), req.body)
            if(actualizacion){
                res.json(actualizacion)
            } else res.json({error: 'El producto con ese ID no existe'})
        } else res.json({error: 'Nuevo producto mal ingresado, falta un campo'}) 
    }
    catch{
        res.status(500).send('Error en el servidor')
    }
})

/* ----- DELETE '/api/productos/:id' -> elimina un producto según su id. ---- */
router.delete('/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const productoID=await datosProductos.getById(id)
        if(productoID){ //getById devuelve null en caso de que no exita el elemento con ID
            await datosProductos.deletedById(parseInt(id))
            res.json({msg: "Producto eliminado"})
        } else {res.json({msg: "El producto no existe"})}
    }
    catch{
        res.status(500).send('Error en el servidor')
    }
    
})

/* --------------------------------- Exports -------------------------------- */
module.exports = router;