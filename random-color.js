//! Random Colors


// FUNCIÓN GENERADORA DE COLORES HEX ALEATORIOS

function generateRandomColor() {
  let signos = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += signos[Math.floor(Math.random() * 16)];
  }
  return color;
};


// COLOR DE FONDO AL LOGO

document.getElementById('logo').addEventListener('mouseover', function () {
  this.style.backgroundColor = generateRandomColor();
})


// COLOR DE LETRA A LINKS DEL NAVBAR

const navItems = document.getElementsByClassName('nav-item')

Object.values(navItems).forEach(ele => {
  ele.addEventListener("mouseover", () => {
    ele.style.color = generateRandomColor()
  })
  ele.addEventListener('mouseout', () => {
    ele.style.color = '#000000'
  })
})


// COLOR DE FONDO BOTONES ARTÍCULOS


/* const btnsAdd = document.getElementsByClassName('btn-add')

for (let i = 0; i < btnsAdd.length; i++) {
  btnsAdd[i].addEventListener("mouseover", () => {
    ele.style.backgroundColor = generateRandomColor()
  })
} */


/*
Object.values(btnsAdd).forEach(ele => {
  console.log('%crandom-color.js line:44 "adentro de aca boton", ele', 'color: #007acc;', "adentro de aca boton", ele);
  ele.addEventListener("click", () => {
    ele.style.color = generateRandomColor()
  })
  console.log('%crandom-color.js line:46 "ENTRO"', 'color: #007acc;', "ENTRO");
}) */


//


