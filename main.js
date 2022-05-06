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
const templateFinalizar = document.getElementById("template-finalizar").content
const containerFinalizar = document.getElementById("container-finalizar")
const carritoSub = document.getElementById("carrito-sub")
const envioInfo = document.getElementById("envios-info")
const bodyTag = document.querySelector("body")

const quitarTodo = document.getElementById("btn-quitar-todo")


/**
 * EVENTOS EN EL DOM
 */

//Agregar un producto al carrito
const addProducto = containerTarjetas.addEventListener("click", e => {
	e.target.classList.contains("btn-add") && setProducto(e.target.parentElement)
	e.stopPropagation()
})


//Modificar los productos del carrito
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
	e.stopPropagation()
	printCarrito()
})


//Total y finalizar la compra
const finalizarCompra = containerPrecioFinal.addEventListener("click", e => {
	if (e.target.classList.contains("btn-finalizar")) {

		templateFinalizar.querySelector("h4").textContent = "$chorrocientosmil morlacos"
		bodyTag.style.overflow = "hidden"

		const clone = templateFinalizar.cloneNode(true)
		fragment.appendChild(clone)
		containerFinalizar.appendChild(fragment)

		const auxBg = document.getElementById("finalizar-bg")
		auxBg.addEventListener("click", e => e.target.classList.contains("click-fuera") && salirFinalizar())
		document.addEventListener("keydown", e => e.key === "Escape" && salirFinalizar())
	}
	e.stopPropagation()
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
	totalCarrito(Object.values(carrito).length)
}


//Cambia información según el estado del carrito
const estadoCarrito = lenght => {

	if (lenght === 0) {
		carritoSub.textContent = "Carrito vacío. ¡Seleccioná productos!"
		envioInfo.innerHTML = `	<p>¡Envíos gratis a todo el país!</p>
                    				<p>A partir de $20.000</p>`
		envioInfo.classList.add("envios-info")
	}
	else {
		carritoSub.textContent = "Productos agregados:"
		envioInfo.textContent = ""
		envioInfo.classList.remove("envios-info")
	}
}


//Total carrito con texto que cambia dependiendo el contenido
const totalCarrito = lenght => {
	containerPrecioFinal.textContent = ""

	if (lenght !== 0) {

		const precioFinal = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + (cantidad * precio), 0)
		templatePrecioFinal.getElementById("precio-final-compra").textContent = precioFinal

		calcularEnvio(precioFinal)

		templatePrecioFinal.getElementById("precio-envio").innerHTML = precioEnvio
		if (precioEnvio === "ENVÍO GRATIS") {
			templatePrecioFinal.querySelector(".signo-peso").textContent = ""
			templatePrecioFinal.querySelector(".envio-div").classList.add("bg-amarillo")
		} else {
			templatePrecioFinal.querySelector(".signo-peso").textContent = "$"
			templatePrecioFinal.querySelector(".envio-div").classList.remove("bg-amarillo")
		}

		const clone = templatePrecioFinal.cloneNode(true)
		fragment.appendChild(clone)
		containerPrecioFinal.appendChild(fragment)

		const quitarTodo = document.getElementById("btn-quitar-todo")
		quitarTodo.addEventListener("click", e => wipeCarrito(e))
	}

}

//Calcula el precio del envío y cuánto falta para que sea gratis
const calcularEnvio = (precioFinal) => {
	const enviosInfoIn = templatePrecioFinal.getElementById("envios-info-in")

	if (precioFinal >= 20000) {
		precioEnvio = "ENVÍO GRATIS 🤑"
		enviosInfoIn.textContent = ""
		enviosInfoIn.classList.remove("envios-info")
	} else if (precioFinal > 15000) {
		precioEnvio = 2000
		enviosInfoIn.innerHTML = `<p>¡Solo faltan $${20000 - precioFinal} para tu envío gratis! 😍</p>`
		enviosInfoIn.classList.add("envios-info")
	} else if (precioFinal > 10000) {
		precioEnvio = 1500
		enviosInfoIn.innerHTML = `<p>Agregando $${20000 - precioFinal} tu envío es sin costo 😏</p>`
	} else if (precioFinal > 5000) {
		precioEnvio = 1000
		enviosInfoIn.innerHTML = `<p>¡Necesitar sumar $${20000 - precioFinal} y te regalamos el envío hasta tu casa! 🙄</p>`
	} else {
		precioEnvio = 500
		enviosInfoIn.innerHTML = `<p>Todavía te faltan $${20000 - precioFinal} para tu envío bonificado 😪</p>`
		enviosInfoIn.classList.add("envios-info")
	}
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
					icon: "success",
					duration: 2000
				});
				carrito = {}
				printCarrito()
			}
		});
}


//Aviso que se elimino el producto del carrito
const toastProductoEliminado = producto => {
	Toastify({
		text: `${producto} eliminado del carrito 😔👌`,
		duration: 2000,
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

//Salir del popup final
const salirFinalizar = () => {
	containerFinalizar.textContent = ""
	bodyTag.style.overflow = "auto"
}