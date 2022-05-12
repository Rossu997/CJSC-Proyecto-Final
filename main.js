/**
 * SIMULANDO BASE DE DATOS CON FETCH DE ARCHIVO JSON
 */

window.addEventListener('DOMContentLoaded', () => {
	fetchData()
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

	loadStorage()
}

/**
 * CARGANDO DATOS GUARDADOS EN EL LOCAL STORAGE
 */

const loadStorage = () => {
	if (localStorage.getItem("carrito")) {
		carrito = JSON.parse(localStorage.getItem("carrito"))
		printCarrito()
	}
	if (localStorage.getItem("favoritos")) {
		favoritos = JSON.parse(localStorage.getItem("favoritos"))
		loadFav()
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
		templateTarjeta.querySelector(".btn-add").dataset.id = producto.id
		templateTarjeta.querySelector("i").dataset.id = producto.id

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
	e.target.classList.contains("btn-add") && setProducto(e.target.parentElement.parentElement)
	e.stopPropagation()
})

//Agregar producto a favoritos
const favProducto = containerTarjetas.addEventListener("click", e => {
	e.target.classList.contains("fa-heart") && setPushPrintFav(e.target.dataset.id)
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
 * LISTA DE FAVORITOS [ARRAY de IDs]
 */

let favoritos = []

//Define, carga y print de favorito
const setPushPrintFav = id => {

	const thisTarjeta = document.querySelectorAll(".tarjeta-normal")[id - 1]

	if (favoritos.find(ele => ele === id)) {
		const index = favoritos.findIndex(ele => ele === id)
		favoritos.splice(index, 1)
		thisTarjeta.querySelector("i").style.color = "#b4b4b4"
	}
	else {
		favoritos.push(id)
		thisTarjeta.querySelector("i").style.color = "#f42"
	}

	localStorage.setItem("favoritos", JSON.stringify(favoritos))
}

//Print de favoritos guardados ❤
const loadFav = () => {

	favoritos.forEach(favorito => {
		const thisTarjeta = document.querySelectorAll(".tarjeta-normal")[favorito - 1]
		thisTarjeta.querySelector("i").style.color = "#f42"
	});
}


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
		"cantidad": 1,
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

//Print del carrito
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

	calcularCantidadProductos()
	estadoCarrito(Object.values(carrito).length)
	totalCarrito(Object.values(carrito).length)
}

//Muestra la cantidad total de productos en el carrito
const calcularCantidadProductos = () => {
	let cantidadProductos = 0

	Object.values(carrito).forEach(producto => {
		cantidadProductos += producto.cantidad
	})

	const pelotitaCantidadProductos = document.getElementById("pelotita-cantidad-productos")
	pelotitaCantidadProductos.textContent = cantidadProductos
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
		precioEnvio = "ENVÍO GRATIS"
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


/**
 * ALERTAS Y TOASTS
 */

//Alerta borrar todos los productos de carrito
const wipeCarrito = () => {
	Swal.fire({
		title: "¿Querés vaciar el carrito?",
		text: "Esto no se podrá revertir...",
		color: "#000000",
		icon: "warning",
		iconColor: "#f42",
		showCloseButton: true,
		stopKeydownPropagation: true,

		confirmButtonText: "Si, eliminar",
		confirmButtonColor: "#ffe11c",

		showCancelButton: true,
		cancelButtonText: "Cancelar",
		cancelButtonColor: "#ddd",
		focusCancel: true,
	})
		.then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "¡Eliminados!",
					text: "Tu carrito ahora está vacío",
					color: "#000000",
					icon: "success",
					iconColor: "#ffe11c",
					timer: 1500,
					timerProgressBar: false,
					showConfirmButton: false,
				})
				carrito = {}
				printCarrito()
			}
		})
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


/**
 * Salir del popup final
 */

const salirFinalizar = () => {
	containerFinalizar.textContent = ""
	bodyTag.style.overflow = "auto"
}