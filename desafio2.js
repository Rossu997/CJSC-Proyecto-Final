/**
 * DESAFÍO PRINCIPAL 2 
 * Juan Manuel Russo
 * Curso JS CODER - 06/04/2022
*/

//! Main Script


//  Objeto constructor y métodos para la lista de productos
const carritoLista = document.getElementById( 'carrito-lista' );
const buttons = document.getElementsByClassName( 'btn-add' );
class Carrito {
  constructor(){
    this.articulos = [];
  };

  pushArticulo( idArticulo ){
    this.articulos.push( idArticulo )
  };

  getArticulos(){
    return this.articulos;
  };

  renderCarrito(){
    const data = this.getDataArticulo();

    carritoLista.innerHTML = "";

    data.forEach((producto) => { 
    carritoLista.innerHTML += `
        <li class="carrito-item"><span class="borrar-carrito-item">x</span> ${producto.nombre} $${producto.precio}
        <p class="carrito-item-cantidad">Cantidad total: ${producto.cantidadTotal}</p></li>`;
    })
  };

  getDataArticulo(){
    return this.articulos.map(( idArticulo ) => { 
      const articulo = listaArticulos.find(( articulo ) => articulo.id === parseInt( idArticulo ));
      return articulo;
    })
  };

  clearCarrito(){
    carritoLista.innerHTML = "";
    this.articulos = [];
  };
};

const carrito =  new Carrito();


//  Render listado producto
const containerTarjetas = document.getElementById( 'container-tarjetas' );

for( let i = 0; i < listaArticulos.length; i++ ){
    containerTarjetas.innerHTML += `
      <div class="tarjeta-normal">
        <img src="${listaArticulos[i].imagenURL}" alt="${listaArticulos[i].nombre}">
        <h3 class="precio">${listaArticulos[i].nombre}</h3>
        <p>${listaArticulos[i].descripcion}</p>
        <p class="precio">Precio: $${listaArticulos[i].precio}</p>
        <button id=${listaArticulos[i].id} class="btn-add" type="button" >¡AGREGAR!</button>
      </div>`;
};


//Eventos en el boton Agregar
 for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',  function(event){ 
      carrito.pushArticulo(event.target.id)
     carrito.renderCarrito()
     });
};


//Evento en el boton limpiar carrito
document.getElementById( 'btn-quitar-todo' ).addEventListener( 'click', function(){
  if( confirm( 'Vas a borrar todos tus artículos del carrito. ¿Estás seguro?' )){
    carrito.clearCarrito();
  };
});




