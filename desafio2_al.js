/**
 * DESAFÍO PRINCIPAL 2 
 * Juan Manuel Russo
 * Curso JS CODER - 06/04/2022
*/

//! Articles List


class Articulo {
  constructor( id, imagenURL, nombre, descripcion, precio ){
    this.id = id;
    this.imagenURL = imagenURL;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = 1;
    this.cantidadTotal = 1;
  }

  cantidadTotal() {
    return this.cantidadTotal * this.precio;
  };
}




/**----------------------------------------------------------------------*/


const dataBaseJSON = JSON.parse( localStorage.getItem( 'articulos' ));
let listaArticulos = [];

dataBaseJSON.forEach( articulo => {
    listaArticulos.push( articulo );
});

for (let i = 0; i < dataBaseJSON.length; i++) {
        listaArticulos[i].cantidad = 1;
        listaArticulos[i].cantidadTotal = 1;
};

