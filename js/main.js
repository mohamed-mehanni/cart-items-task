let changeTheemBtn = document.getElementById("changetheembtn");
let body = document.body;

changeTheemBtn.addEventListener("click", function () {
    if (body.classList.contains("dark_mode")) {
        body.classList.remove("dark_mode");
        this.classList.replace("btn-light", "btn-dark");
    } else {
        body.classList.add("dark_mode");
        this.classList.replace("btn-dark", "btn-light");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
});

//**products cart */

const products = [
    {
        id: 1,
        name: "product 1",
        price: 10,
        img: ""
    },
    {
        id: 2,
        name: "product 2",
        price: 10,
        img: ""
    },
    {
        id: 3,
        name: "product 3",
        price: 10,
        img: ""
    },
    {
        id: 4,
        name: "product 4",
        price: 10,
        img: ""
    },
    {
        id: 5,
        name: "product 5",
        price: 10,
        img: ""
    },
    {
        id: 6,
        name: "product 6",
        price: 10,
        img: ""
    },
    {
        id: 7,
        name: "product 7",
        price: 10,
        img: ""
    },

    {
        id: 8,
        name: "product 8",
        price: 10,
        img: ""
    },
    {
        id: 9,
        name: "product 8",
        price: 10,
        img: ""
    },
    {
        id: 10,
        name: "product 8",
        price: 10,
        img: ""
    }


];

const Products = [
    { id: 1, name: "Product 1", price: 100, img: "img/item1.jpg" },
    { id: 2, name: "Product 2", price: 200, img: "img/item2.jpg" },
    { id: 3, name: "Product 3", price: 150, img: "img/item3.jpg" },
    { id: 4, name: "Product 4", price: 300, img: "img/item4.jpg" },
    { id: 5, name: "Product 5", price: 300, img: "img/item4.jpg" },
    { id: 6, name: "Product 6", price: 300, img: "img/item5.jpg" },
    { id: 7, name: "Product 7", price: 300, img: "img/item6.jpg" },
    { id: 8, name: "Product 8", price: 300, img: "img/item3.jpg" },
    { id: 9, name: "Product 9", price: 300, img: "img/item7.jpg" },
    { id: 10, name: "Product 10", price: 300, img: "img/item8.jpg" },

];

let cart = [];

const productList = document.getElementById("product-list");
const cartDropdown = document.getElementById("cart-dropdown");
const cartCount = document.getElementById("cart-count");

// عرض المنتجات
function displayProducts() {
    productList.innerHTML = "";
    Products.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>$${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

// show itemj img in cart
function renderCart() {
    const cartItems = document.getElementById("product-list");
    const totalItems = document.getElementById("cart-count");

    let cart_count = 0;
    cart.forEach((item) => {
        const image = document.createElement("img");
        image.src = "item.img";
        image.style.width = "50px";
        image.style.height = "50px";
        image.style.objectFit = "cover";

    })
}

// open-close cart  
function toggleCart() {
    cartDropdown.classList.toggle("active");
    updateCartCount();
    renderCart();
}

//  add item
function addToCart(id) {
    const item = Products.find((p) => p.id === id);
    const existing = cart.find((c) => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    renderCart(true);
    updateCartCount();
}

// removeFromCart
function removeFromCart(id) {
    cart = cart.filter((c) => c.id !== id);
    updateCartCount();
    renderCart(true);
}

// changeQty
function changeQty(id, amount) {
    const item = cart.find((c) => c.id === id);
    if (item) {
        item.qty += amount;
        if (item.qty <= 0) removeFromCart(id);
    }
    updateCartCount();
    renderCart(true);
}

// show cart items
function renderCart(keepOpen = false) {
    cartDropdown.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <strong>${item.name}</strong><br>
            $${item.price} × ${item.qty}
          </div>
          <div class="cart-item-actions">
            <button onclick="event.stopPropagation(); changeQty(${item.id}, -1)">-</button>
            <button onclick="event.stopPropagation(); changeQty(${item.id}, 1)">+</button>
            <button class="delete" onclick="event.stopPropagation(); removeFromCart(${item.id})">X</button>
          </div>
        </div>`
        )

        .join("");

    if (cart.length === 0) {
        cartDropdown.innerHTML = "<p>Your cart is empty</p>";
    } else {
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        cartDropdown.innerHTML += `<div class="total">Total: $${total}</div>`;
    }

    if (keepOpen) {
        cartDropdown.classList.add("active");
    }
}

function toggleCart() {
    const cartDropdown = document.getElementById("cart-dropdown");
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
}

function updateCartCount() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

displayProducts();
