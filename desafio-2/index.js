/*
    Hubiera querido hacer una funcion que pertenezca a la clase que solo se encargue
    de leer el archivo y otra que solo se encargue de escribir el archivo, para no repetir 
    el código en los métodos. Quise crear un archivo solo para la clase e importarlo desde 
    el index.js, vi en internet que habia que agregar el package.json y declarar alli el index
    como tipo module. El tema fue que me daba un error cuando hacia el require, entonces lo dejé
    para verlo en otro momento.
*/

class Contenedor {
    constructor (nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }
    /*
        Devuelve todos los productos que hay en el archivo
    */
    async getAll(){
        const fs = require('fs');
        const ruta = this.nombreArchivo;
        try {
            const archivo = await fs.promises.readFile(ruta, 'utf-8');
            const productos = JSON.parse(archivo);
            return productos;
            
        } catch (error) {
            console.log('Se ha producido un error en getAll()', 'error numero: ', error);
        } 
               
    }

    /*
        Recibe un id por parámetro y devuelve el producto que coincide con 
        ese id
    */
    async getById(id){
        const fs = require('fs');
        const ruta = this.nombreArchivo;
        try {
            const archivo = await fs.promises.readFile(ruta, 'utf-8');
            const productos = JSON.parse(archivo);

            //Busco el producto en el array
            const producto = productos.find(p  => p.id === id); 
            return producto;
            
        } catch (error) {
            console.log('Se ha producido un error en getById(id)', 'error numero: ', error);
        } 
    }

    /*
        Recibe un id por parámetro y devuelve el producto que coincide con 
        ese id
    */
    async deleteById(id){
        const fs = require('fs');
        const ruta = this.nombreArchivo;
        try {
            const archivo = await fs.promises.readFile(ruta, 'utf-8');
            const productos = JSON.parse(archivo);

            //Creo un nuevo array filtrando y quitando el producto cuyo id se quiere borrar
            const newProductos = productos.filter((data)=>data.id !== id);
            
            //Formateo el array para guardarlo
            const newProductosString = JSON.stringify(newProductos);

            await fs.promises.writeFile(ruta, newProductosString)

        } catch (error) {
            console.log('Se ha producido un error en deleteById(id)', 'error numero: ', error);
        } 
    }

    /*
        Recibe un producto por parámetro, le asigna el id y lo guarda en el archivo.
        Si el archivo está vacío le asigna al id el valor 1, sino, busca el mayor id
        y le suma 1. 
    */
    async save(producto){
        const fs = require('fs');
        const ruta = this.nombreArchivo;
        try {
            const archivo = await fs.promises.readFile(ruta, 'utf-8');
            const productos = JSON.parse(archivo);
            //Inicializo la variable newId en 0
            let newId =0;
            //Verifico si hay productos
            if (productos.length >0){
                const auxArray = [];
                //Guardo los ids en un array auxiliar
                productos.forEach(element => {
                    auxArray.push(element.id);
                });
                //Busco el mayor id
                newId = Math.max(...auxArray);
            }
            //Si no hay productos  newId=0, si hay productos newId= al mayor id.
            //Despues le sumo 1 y obtengo el nuevo id
            newId++;

            //Agrego el id al objeto enviado por parámetro
            const newProducto = {...producto, id:newId};

            //Creo un array auxiliar con todos los productos mas el nuevo
            const auxProductos = [...productos, newProducto];

            //Formateo el array para guardarlo en el archivo
            const newProductosString = JSON.stringify(auxProductos);

            await fs.promises.writeFile(ruta, newProductosString)

            return newId;
            
        } catch (error) {
            console.log('Se ha producido un error en save()', 'error numero: ', error);
        } 
    }

    async deleteAll(){
        const fs = require('fs');
        const ruta = this.nombreArchivo;
        try {
            const Productos = [];
            
            const ProductosString = JSON.stringify(Productos);

            await fs.promises.writeFile(ruta, ProductosString)

        } catch (error) {
            console.log('Se ha producido un error', 'error numero: ', error);
        } 
    }

}


//Instacio el objeto
const contenedor = new Contenedor('productos.txt');

/* Pido todos los productos */
//contenedor.getAll().then((res) => console.log(res))

/* Pido un producto por el id */
//contenedor.getById(1).then((res)=>console.log(res));

/* Borro un producto por el id */
//contenedor.deleteById(2);

/* Borro tosdos los productos */
//contenedor.deleteAll();

/* Guardo un nuevo producto */
 contenedor.save(    {                                                                                                                                                    
     "title": "Calculadora",                                                                                                                              
     "price": 234.56,                                                                                                                                     
     "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",                                                                                                                                                                                      
   }).then((res)=>console.log(res));