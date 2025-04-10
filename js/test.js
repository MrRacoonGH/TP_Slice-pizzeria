let panier = [
    ["Pizza Margherita", 8.99, 2], // Nom, Prix, Quantité
    ["Burger Cheese", 5.49, 1],
    ["Sushi Mix", 12.99, 3]
];

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nom, prix, quantite) {
    panier.push([nom, prix, quantite]);
}

// Fonction pour afficher le panier
function afficherPanier() {
    console.log("Votre panier :");
    panier.forEach((produit, index) => {
        console.log(`${index + 1}. ${produit[0]} - ${produit[1]}€ x${produit[2]}`);
    });
}

// Ajout d'un nouveau produit
ajouterAuPanier("Tacos", 6.99, 2);
afficherPanier();




// code copilot "opti"


// Sélection du wrapper
const container = document.querySelector(".pizzas-wrapper");

// Récupération des données
async function getData() {
    try {
        const res = await fetch("http://10.59.122.27:3000/products");
        const data = await res.json();
        console.log(data);
        displayData(data);
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Fonction pour créer un élément pizza
function createPizzaItem(product = { name: "Nouvelle Pizza", price: "16.99", image: "https://cdn.dummyjson.com/recipe-images/1.webp" }) {
    const pizzaItem = document.createElement("div");
    pizzaItem.classList.add("pizza-item");

    const img = document.createElement("img");
    img.classList.add("pizza-picture");
    img.src = product.image;
    img.alt = product.name;

    const addToCartBtn = document.createElement("span");
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.innerHTML = `<img src="../images/carbon_shopping-cart-plus.svg" alt=""> Ajouter au panier`;

    const pizzaInfos = document.createElement("ul");
    pizzaInfos.classList.add("pizza-infos");

    const pizzaName = document.createElement("li");
    pizzaName.classList.add("pizza-name");
    pizzaName.textContent = product.name;

    const pizzaPrice = document.createElement("li");
    pizzaPrice.classList.add("pizza-price");
    pizzaPrice.textContent = `$${product.price}`;

    pizzaInfos.appendChild(pizzaName);
    pizzaInfos.appendChild(pizzaPrice);
    pizzaItem.appendChild(img);
    pizzaItem.appendChild(addToCartBtn);
    pizzaItem.appendChild(pizzaInfos);

    return pizzaItem;
}

// Affichage des pizzas via les données récupérées
function displayData(data) {
    container.innerHTML = ""; 
    data.forEach(product => container.appendChild(createPizzaItem(product)));
}

// Création manuelle d'une pizza via le bouton
document.getElementById("createPizzaBtn").addEventListener("click", () => {
    container.appendChild(createPizzaItem());
});

// Gestion dynamique du panier
document.addEventListener("click", (event) => {
    if (event.target.closest(".add-to-cart-btn")) {
        const product = {
            name: "Produit ajouté",
            price: (Math.random() * 20).toFixed(2)
        };
        addToCart(product);
    }
});

function addToCart(product) {
    const basketContainer = document.querySelector(".empty-basket");
    if (basketContainer.querySelector("img")) {
        basketContainer.innerHTML = "";
    }

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const name = document.createElement("p");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    cartItem.appendChild(name);
    cartItem.appendChild(price);
    basketContainer.appendChild(cartItem);

    // Mise à jour du nombre d'articles
    document.querySelector(".basket-aside h2").textContent = `Votre panier (${document.querySelectorAll(".cart-item").length})`;
    console.log(product);
}

getData();
