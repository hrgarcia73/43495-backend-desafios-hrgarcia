//requerimos la clase contenedor
const Contenedor = require("./classContenedor");
const fs = require("fs");

//requerimos express
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const contenedor = new Contenedor('productos.txt');

//Instacio el objeto clase contenedor
app.get('/', (req, res) => {
    res.send("Desafío 3 - /productos, devuelve todos los productos. /productoRandom, devuelve un producto al azar")
  })

app.get('/productos', async(req, res) => {
    /* Pido todos los productos */
    const productos = await contenedor.getAll();

    res.send(productos);
})

app.get('/productoRandom', async(req, res) => {
    const maxId = 4; //tengo solo 4 productos con id de 1 a 4
    const numRandom = Math.floor(Math.random() * maxId);

    /* Pido el producto con id generado de manera aleatoria */
    const producto = await contenedor.getById(numRandom);

    res.send(producto);
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})