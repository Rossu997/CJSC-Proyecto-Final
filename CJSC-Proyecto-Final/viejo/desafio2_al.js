/**
 * DESAFÍO PRINCIPAL 2
 * Juan Manuel Russo
 * Curso JS CODER - 06/04/2022
 */

//! Articles List

//  (Clase Constructora) Lista de todos los articulos cargados en el sitio.

class Articulo {
  constructor(id, imagenURL, nombre, descripcion, precio) {
    this.id = id;
    this.imagenURL = imagenURL;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = 1;
  }
}

//  Creando ista de todos los articulos cargados en el sitio.

const localStorageDataBase = JSON.parse(localStorage.getItem("articulos"));
let listaArticulos = [];

localStorageDataBase.forEach((articulo) => {
  listaArticulos.push(articulo);
});
