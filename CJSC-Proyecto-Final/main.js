/**
 * SIMULANDO BASE DE DATOS CON FETCH DE ARCHIVO JSON
 */

window.addEventListener('DOMContentLoaded', () => {
	fetchData()
	if (localStorage.getItem("carrito")) {
		carrito = JSON.parse(localStorage.getItem("carrito"))
		printCarrito()
	}
})

const fetchData = async () => {
	try {
		const resp = await fetch("api.json")
		const data = await resp.json()
		printProductos(data)
	}
	catch (error) {
		console.log(error);
	}
}


/**
 * CARGA Y PRINT DE LOS PRODUCTOS TRAIDOS DEL JSON
 */

const printProductos = productos => {

	productos.forEach(producto => {
		templateTarjeta.querySelector("h3").textContent = producto.nombre
		templateTarjeta.querySelector("p").textContent = producto.descripcion
		templateTarjeta.querySelector("span").textContent = producto.precio
		templateTarjeta.querySelector("img").setAttribute("src", producto.imagenURL)
		templateTarjeta.querySelector("button").dataset.id = producto.id

		const clone = templateTarjeta.cloneNode(true)
		fragment.appendChild(clone)
	})
	containerTarjetas.appendChild(fragment)
}


/**
 * TEMPLATES Y CARGA DE ETIQUETAS HTML PARA MODIFICAR EL DOM
 */

const fragment = document.createDocumentFragment()

const templateTarjeta = document.getElementById("template-tarjeta").content
const containerTarjetas = document.getElementById("container-tarjetas")
const templateCarrito = document.getElementById("template-carrito").content
const containerCarrito = document.getElementById("carrito-lista")
const templatePrecioFinal = document.getElementById("template-precio-final").content
const containerPrecioFinal = document.getElementById("container-precio-final")
const carritoSub = document.getElementById("carrito-sub")

const quitarTodo = document.getElementById("btn-quitar-todo")


/**
 * EVENTOS EN EL DOM
 */

const addProducto = containerTarjetas.addEventListener("click", e => {
	e.target.classList.contains("btn-add") && setProducto(e.target.parentElement)
	e.stopPropagation()
})


const modProductosCarrito = containerCarrito.addEventListener("click", e => {
	let id = e.target.dataset.id
	switch (e.target.classList.value) {

		case ("x"):
			toastProductoEliminado(carrito[id].nombre)
			delete carrito[id]
			break

		case ("-"):
			carrito[id].cantidad = carrito[id].cantidad - 1
			if (carrito[id].cantidad === 0) {
				toastProductoEliminado(carrito[id].nombre)
				delete carrito[id]
			}
			break

		case ("+"):
			carrito[id].cantidad = carrito[id].cantidad + 1
			break
	}
	printCarrito()
})



/**
 * CARRITO {COLECCION DE OBJETOS}
 */

let carrito = {}


//Define el producto que se eligio
const setProducto = ele => {

	const producto = {
		"id": ele.querySelector(".btn-add").dataset.id,
		"nombre": ele.querySelector("h3").textContent,
		"precio": ele.querySelector("span").textContent,
		"cantidad": 1
	}
	pushProducto(producto)
}


//Carga en el carrito el producto
const pushProducto = producto => {

	if (carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1
	}
	carrito[producto.id] = { ...producto }
	printCarrito()
}


//Carga y print del carrito
const printCarrito = () => {

	localStorage.setItem("carrito", JSON.stringify(carrito))

	containerCarrito.textContent = ""

	Object.values(carrito).forEach(producto => {
		templateCarrito.querySelector("#carrito-borrar-item").dataset.id = producto.id
		templateCarrito.querySelector("#carrito-nombre-item").textContent = producto.nombre
		templateCarrito.querySelector("#carrito-restar-item").dataset.id = producto.id
		templateCarrito.querySelector("#carrito-cantidad-item").textContent = producto.cantidad
		templateCarrito.querySelector("#carrito-sumar-item").dataset.id = producto.id
		templateCarrito.querySelector("#carrito-precio-total-item").textContent = producto.cantidad * producto.precio

		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild(clone)
	})
	containerCarrito.appendChild(fragment)
	estadoCarrito(Object.values(carrito).length)
	finalCarrito(Object.values(carrito).length)
}


//Subtitulo con estado del carrito
const estadoCarrito = (lenght) => {
	if (lenght === 0) {
		carritoSub.textContent = "Carrito vacío. ¡Seleccioná productos!"
	}
	else {
		carritoSub.textContent = "Productos agregados:"
	}
}


//Total y finalizar compra
const finalCarrito = (lenght) => {

	if (lenght === 0) {
		containerPrecioFinal.textContent = ""
	}

	else {
		const precioFinal = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + (cantidad * precio), 0)
		templatePrecioFinal.getElementById("precio-final-compra").textContent = precioFinal

		const clone = templatePrecioFinal.cloneNode(true)
		fragment.appendChild(clone)
	}
	containerCarrito.appendChild(fragment)
}





//Borra todo el contenido del carrito
const wipeCarrito = () => {
	swal({
		title: "¿Seguro querés borrar todos los productos del carrito?",
		icon: "warning",
		buttons: true,
		dangerMode: true,
	})
		.then((willDelete) => {
			if (willDelete) {
				swal("Productos eliminados", {
					icon: "success"
				});
				carrito = {}
			}
		});
}


//Aviso que se elimino el producto del carrito
const toastProductoEliminado = producto => {
	Toastify({
		text: `${producto} eliminado del carrito 🥵👌`,
		duration: 3000,
		gravity: "top",
		position: "right",
		stopOnFocus: true,
		style: {
			background: "#000000",
			color: "#ffffff",
			letterSpacing: "8px",
			fontWeight: "100",
			fontSize: "3rem"
		}
	}).showToast();
}

