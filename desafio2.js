/**
 * DESAFÍO PRINCIPAL 2
 * Juan Manuel Russo
 * Curso JS CODER - 06/04/2022
 */

//! Main Script


//?  (Clase Constructora) Lista de IDs

class Carrito {
  constructor() {
    this.idsArticulosEnCarrito = [];
    this.cantidadesDeCadaArticulo = {};
    this.precioFinalDeCompra = 0;
  }

  //Agrega un nuevo articulo (ID) al carrito ('idsArticulosEnCarrito'(ARRAY de IDs))
  sumarUnidadArticulo( idArticulo ) {
    idArticulo = parseInt( idArticulo );
    if( this.idsArticulosEnCarrito.indexOf( idArticulo ) !== -1 ) {
      this.cantidadesDeCadaArticulo[idArticulo] = this.cantidadesDeCadaArticulo[idArticulo] + 1;
    }
    else {
      this.idsArticulosEnCarrito.push( idArticulo );
      this.cantidadesDeCadaArticulo[idArticulo] = 1;
    };
    this.renderCarrito();
  }

  //Restar una unidad a un articulo del carrito.
  restarUnidadArticulo(idArticulo) {
    idArticulo = parseInt(idArticulo);
    if( this.idsArticulosEnCarrito.indexOf( idArticulo !== -1 )) {
      this.cantidadesDeCadaArticulo[idArticulo] = this.cantidadesDeCadaArticulo[idArticulo] - 1;
    }
    else {
      return;
    };
    this.renderCarrito();
  }

  //Quitar todas las unidades de un articulo del carrito.
  quitarArticulo( idArticulo ) {
    idArticulo = parseInt( idArticulo );
    this.idsArticulosEnCarrito = this.idsArticulosEnCarrito.filter(( id ) => id !== idArticulo);
    delete this.cantidadesDeCadaArticulo[idArticulo];
    this.renderCarrito();
  }

  //Devuelve los articulos (IDs) que estan guardados en el carrito ('idsArticulosEnCarrito').
  consultarArticulosEnCarrito() {
    return this.idsArticulosEnCarrito;
  }

  //Calcula el precio total de un articulo en el carrito teniendo en cuenta la cantidad seleccionada.
  calcularPrecioTotalArticulo( articulo ) {
    return articulo.precio * this.cantidadesDeCadaArticulo[articulo.id];
  }

  //Crea en el HTML las etiquetas que muestran los articulos que se agregan al carrito.
  renderCarrito() {
    this.calcularPrecioFinalDeCompra()

    const HTMLArticulosEnCarrito = document.getElementById( "carrito-lista" );
    const datos = this.consultarDatosArticulo();

    HTMLArticulosEnCarrito.innerHTML = "";
    datos.forEach(( articulo ) => {
      HTMLArticulosEnCarrito.innerHTML += `
        <li class="carrito-item">
          <p>
            <span class="borrar-carrito-item" onClick="carrito.quitarArticulo(${articulo.id})">x</span> ${articulo.nombre} $${carrito.calcularPrecioTotalArticulo(articulo)}</p>
          <p class="carrito-item-cantidad">
            Cantidad total: <span class="restar-unidad-item-carrito" onClick="carrito.restarUnidadArticulo(${articulo.id})">-</span> ${carrito.cantidadesDeCadaArticulo[articulo.id]} <span onClick="carrito.sumarUnidadArticulo(${articulo.id})" class="sumar-unidad-item-carrito">+</span>
          </p>
        </li>
      `;
    });

    document.getElementById("precio-final-compra").innerText = `$${this.precioFinalDeCompra}`;
  }


  calcularPrecioFinalDeCompra() {
    const datos = this.consultarDatosArticulo();
    this.precioFinalDeCompra = 0

    datos.forEach(( articulo ) => {
      this.precioFinalDeCompra = this.precioFinalDeCompra + articulo.precio * this.cantidadesDeCadaArticulo[articulo.id];
     })
  }

  aplicarCuponDescuento() {
    this.precioFinalDeCompra = this.precioFinalDeCompra * 0.2;
  }

  //Busca y devuelve los datos de los articulos usando los IDs que estan en el carrito ('idsArticulosEnCarrito').
  consultarDatosArticulo() {
    return this.idsArticulosEnCarrito.map(( idArticulo ) => {
      const articulo = listaArticulos.find(( articulo ) => articulo.id === parseInt( idArticulo ));
      return articulo;
    });
  }

  //Borra todo el contenido del carrito ('idsArticulosEnCarrito', 'cantidadesDeCadaArticulo' y HTML)
  limpiarCarrito() {

    if( confirm( "Vas a borrar todos tus artículos del carrito. ¿Estás seguro?" )){
      HTMLArticulosEnCarrito.innerHTML = "";
      this.idsArticulosEnCarrito = [];
      this.cantidadesDeCadaArticulo = {};
    };
  }
};


//? Creando el carrito
const carrito = new Carrito();


//? Render listado producto

const HTMLContainerTarjetas = document.getElementById("container-tarjetas");

for (let i = 0; i < listaArticulos.length; i++) {
  HTMLContainerTarjetas.innerHTML += `
      <div class="tarjeta-normal">
        <img src="${listaArticulos[i].imagenURL}" alt="${listaArticulos[i].nombre}">
        <h3 class="precio">${listaArticulos[i].nombre}</h3>
        <p>${listaArticulos[i].descripcion}</p>
        <p class="precio">Precio: $${listaArticulos[i].precio}</p>
        <button id=${listaArticulos[i].id} class="btn-add" type="button" onClick="carrito.sumarUnidadArticulo(${listaArticulos[i].id})"  >¡AGREGAR!</button>
      </div>`;
}

//? Evento en el boton Limpiar todo el carrito (Borrar Todo)

document.getElementById("btn-quitar-todo").addEventListener("click", carrito.limpiarCarrito);
