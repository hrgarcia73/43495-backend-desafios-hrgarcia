//Definición de la clase Usuario
class Usuario {
    constructor(nombre, apellido) {
        //Recibimos nombre y apellido como parámetros durante la inicialización
        //Asignamos estos a las propiedes del objeto e inicializamos los arreglos
        //de libros y mascotas como vacíos. Los elementos a los arreglos se agregan por medios
        //de los métodos a tales efectos
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }
 
    //Método que devuelve el nombre completo del usuario
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    //Método que agrega una mascota
    addMascota(mascota){
        this.mascotas = [...this.mascotas, mascota];
    }

    //Método que devuelve la cantidad de mascotas
    countMascotas(){
        return this.mascotas.length;
    }

    //Método que agrega un libro. Recibe el título y el autor
    addBook(titulo, autor){
        this.libros = [...this.libros, {titulo, autor}];
    }

    //Método que devuelve los título de los libros que tiene el usuario
    getBookNames(){
        const bookNames = [];
        this.libros.map( item =>(
            bookNames = [...bookNames, item.titulo]
            )
        )
        return bookNames;
    }
 }
 
 //Declaración de una variable de tipo Usuario
 const usuario = new Usuario("Ricardo", "Garcia");

 //Agregamos mascotas para el usuario
 usuario.addMascota("Perro");
 usuario.addMascota("Gato");
 usuario.addMascota("Canario");

 //Agregamos libros para el usuario
 usuario.addBook("Rayuela","Julio Cortazar");
 usuario.addBook("Políticas de la amistad","Jaques Derrida");
 usuario.addBook("Ficciones","Jorge Luis Borges");
 usuario.addBook("Historias de una biblioteca","Tomás Abraham");


 //Sacamos la información del usuario por consola

 //Método que devuelve el nombre completo
 console.log("Usuario: " + usuario.getFullName());

 //Método que devuelve la cantidad de mascotas
 console.log("Cantidad de mascotas: " + usuario.countMascotas());

 //Método que devuelve los nombre de los libros
 console.log("Libros: " + usuario.getBookNames());




