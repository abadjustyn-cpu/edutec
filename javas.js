// Toggle FAQ answers para que se vea mas fluida la transicion
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function toggleFAQ(id) {
  const answer = document.getElementById(`faq-answer-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);

  answer.classList.toggle("hidden");

  if (answer.classList.contains("hidden")) {
    icon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
  } else {
    icon.innerHTML =
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />';
  }
}

// Mobile menu toggle functionality
const mobileMenuButton = document.querySelector("nav button");
const mobileMenu = document.createElement("div");
mobileMenu.classList.add(
  "fixed",
  "inset-0",
  "bg-white",
  "z-40",
  "pt-16",
  "px-4",
  "hidden"
);

mobileMenu.innerHTML = `
  <div class="space-y-8 py-8">
    <a href="#inicio" class="block text-2xl font-medium text-gray-700 hover:text-blue-600">Inicio</a>
    <a href="#trajes" class="block text-2xl font-medium text-gray-700 hover:text-blue-600">Nosotros</a>
    <a href="#trajes" class="block text-2xl font-medium text-gray-700 hover:text-blue-600">Nuestros Trajes</a>
    <a href="#testimonios" class="block text-2xl font-medium text-gray-700 hover:text-blue-600">Reseñas</a>
    <a href="#contacto" class="block text-2xl font-medium text-gray-700 hover:text-blue-600">Contacto</a>
    <a href="#preguntas" class="block text-2xl font-medium text-gray-700 hover:text-blue-600">Preguntas</a>
  </div>
  <button class="absolute top-6 right-4 text-gray-500 hover:text-gray-700">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
`;

document.body.appendChild(mobileMenu);

// abrir/cerrar menú con hamburguesa
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// cerrar con la X
mobileMenu.querySelector("button").addEventListener("click", () => {
  mobileMenu.classList.add("hidden");
});

// cerrar al hacer clic en un link
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});




// carrito
let carrito = [];
let total = 0;
let carritoVisible = false;

function agregarAlCarrito(producto, precio, cantidad) {
  cantidad = parseInt(cantidad) || 1; // Siempre número válido
  if (cantidad <= 0) return;

  // Verificar si ya existe el producto
  let itemExistente = carrito.find(item => item.producto === producto);

  if (itemExistente) {
    itemExistente.cantidad += cantidad; // acumula cantidades
  } else {
    carrito.push({ producto, precio, cantidad });
  }

  total += precio * cantidad;
  mostrarCarrito();
}

function mostrarCarrito() {
  let lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.producto} (x${item.cantidad}) - S/ ${(item.precio * item.cantidad).toFixed(2)}`;
    lista.appendChild(li);
  });
  document.getElementById("total").textContent = total.toFixed(2);
}

function toggleCarrito() {
  let carritoDiv = document.getElementById("carrito");
  carritoVisible = !carritoVisible;
  carritoDiv.style.display = carritoVisible ? "block" : "none";
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  mostrarCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "Hola, quiero comprar:\n";
  carrito.forEach(item => {
    mensaje += `- ${item.producto} (x${item.cantidad}) - S/ ${(item.precio * item.cantidad).toFixed(2)}\n`;
  });
  mensaje += `\nTotal: S/ ${total.toFixed(2)}`;

  let telefono = "51987654321"; // tu número con código de país
  let url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

