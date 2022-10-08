const express = require("express");
const app = express();
const productosRouter = require('./router/productos');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, ()=> console.log("Server listening on port 8080"));

app.use('/api/productos', productosRouter)