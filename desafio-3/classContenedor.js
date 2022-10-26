
    const fs = require('fs');
  
    class Contenedor {
        constructor (nombreArchivo){
            this.nombreArchivo = nombreArchivo;
        }
        /*
            Devuelve todos los productos que hay en el archivo
        */
        async getAll(){
            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
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

            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
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
            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
                const productos = JSON.parse(archivo);
    
                //Creo un nuevo array filtrando y quitando el producto cuyo id se quiere borrar
                const newProductos = productos.filter((data)=>data.id !== id);
                
                //Formateo el array para guardarlo
                const newProductosString = JSON.stringify(newProductos);
    
                await fs.promises.writeFile(this.nombreArchivo, newProductosString)
    
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
            try {
                const archivo = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
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
    
                await fs.promises.writeFile(this.nombreArchivo, newProductosString)
    
                return newId;
                
            } catch (error) {
                console.log('Se ha producido un error en save()', 'error numero: ', error);
            } 
        }
    
        async deleteAll(){
            try {
                const Productos = [];
                
                const ProductosString = JSON.stringify(Productos);
    
                await fs.promises.writeFile(this.nombreArchivo, ProductosString)
    
            } catch (error) {
                console.log('Se ha producido un error en deleteAll()', 'error numero: ', error);
            } 
        }
    
    }

module.exports = Contenedor;