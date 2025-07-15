// Load XML using AJAX
function loadElectronics() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "electronics.xml", true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            displayElectronics(xhr.responseXML);
        } else {
            console.error("Error loading XML file");
            displayElectronics(null); // Fallback if XML fails
        }
    };
    xhr.onerror = function () {
        console.error("Request failed");
        displayElectronics(null);
    };
    xhr.send();
}

// Display electronics in the HTML
function displayElectronics(xml) {
    let productList = document.getElementById("Electroniclist");
    productList.innerHTML = ""; // Clear existing products

    // Default products if XML fails
    if (!xml) {
        const defaultElectronics = [
            { id: "E001", title: "Camera", brand: "Canon", price: 500, image: "img/canon.jpg" },
            { id: "E002", title: "Laptop", brand: "Dell", price: 800, image: "img/mac.png" },
            { id: "E003", title: "Headphones", brand: "Sony", price: 300, image: "img/sony.jpg" },
            {id:  "E004", title: "Smartphone",brand:"Samsung",price:400,image:"img/Smartphone.jpg" },
        ];

        defaultElectronics.forEach(item => createProductElement(item, productList));
        return;
    }

    let electronics = xml.getElementsByTagName("electronics");
    for (let i = 0; i < electronics.length; i++) {
        let item = {
            id: electronics[i].getAttribute("id"),
            title: electronics[i].getElementsByTagName("title")[0].textContent,
            brand: electronics[i].getElementsByTagName("Brand")[0].textContent,
            price: parseFloat(electronics[i].getElementsByTagName("price")[0].textContent),
            image: electronics[i].getElementsByTagName("image")[0].textContent
        };
        createProductElement(item, productList);
    }
}

// Create and append a product element
function createProductElement(item, productList) {
    let productItem = document.createElement("div");
    productItem.classList.add("product");
    productItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}" width="150">
        <h3>${item.title}</h3>
        <p>Brand: ${item.brand}</p>
        <p>Price: $${item.price}</p>
        <button onclick="addToCart('${item.id}', '${item.title}', ${item.price})">Add to Cart</button>
    `;
    productList.appendChild(productItem);
}

// Search function
function filterElectronics() {
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    let products = document.getElementsByClassName("product");

    for (let product of products) {
        let title = product.querySelector("h3").textContent.toLowerCase();
        let brand = product.querySelector("p").textContent.toLowerCase();
        product.style.display = title.includes(searchQuery) || brand.includes(searchQuery) ? "block" : "none";
    }
}

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, title, price) {
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    let cartList = document.getElementById("cartList");
    cartList.innerHTML = cart.length === 0 ? "<li>Your cart is empty</li>" : "";

    let total = 0;
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let li = document.createElement("li");
        li.innerHTML = `${item.title} (${item.quantity}) - $${itemTotal.toFixed(2)}
            <button onclick="removeFromCart(${index})">❌</button>`;
        cartList.appendChild(li);
    });

    let totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartList.appendChild(totalLi);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Load on page load
window.onload = function () {
    loadElectronics();
    displayCart();
};
