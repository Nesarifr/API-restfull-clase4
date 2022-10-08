# API-restfull

## :scroll: Consigna:

Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. <br>
En detalle, que incorpore las siguientes rutas:

-  GET *'/api/productos/'* :arrow_forward: devuelve todos los productos.
-  GET *'/api/productos/:id'* :arrow_forward: devuelve un producto según su id.
-  POST *'/api/productos/'* :arrow_forward: recibe y agrega un producto, y lo devuelve con su id asignado.
-  PUT *'/api/productos/:id'* :arrow_forward: recibe y actualiza un producto según su id.
-  DELETE *'/api/productos/:id'* :arrow_forward: elimina un producto según su id.

Cada producto estará representado por un objeto con el siguiente formato:

<pre><code>{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}</code></pre>

Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.

Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

### :computer: Herramientas utilizadas:
:ballot_box_with_check: Express
:ballot_box_with_check: Postman :rocket:
:ballot_box_with_check: VScode
