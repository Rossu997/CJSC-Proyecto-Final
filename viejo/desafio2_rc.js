/**
 * DESAFÍO PRINCIPAL 2 
 * Juan Manuel Russo
 * Curso JS CODER - 06/04/2022
*/

//! Random Colors


//? FUNCIÓN GENERADORA DE COLORES HEX ALEATORIOS

function generateRandomColor() {
  let signos = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += signos[Math.floor(Math.random() * 16)];
  }
  return color;
};


//? COLOR DE FONDO AL LOGO

document.getElementById('logo').addEventListener('mouseover', function () {
  this.style.backgroundColor = generateRandomColor();
})


//? COLOR DE LETRA A LINKS DEL NAVBAR

let navItems = document.getElementsByClassName( 'nav-item' );
for (let i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener( 'mouseover', function(){
    this.style.color = generateRandomColor();
  });
  navItems[i].addEventListener( 'mouseout', function(){
    this.style.color = '#000000';
  });
};


//? COLOR DE FONDO BOTONES ARTÍCULOS

for (let i = 0; i < listaArticulos.length; i++) {
  let btnAdd = document.getElementById(listaArticulos[i].id);
  btnAdd.addEventListener('mouseover', function () {
  this.style.backgroundColor = generateRandomColor();
  });
  btnAdd.addEventListener('mouseout', function () {
  this.style.backgroundColor = '#000000';
  });
};
