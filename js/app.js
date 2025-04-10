const container = document.querySelector(".pizza-wrapper");

//fetch
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


//création d'éllement via boutton createPizza
document.getElementById("createPizzaBtn").addEventListener("click", () => {
    const container = document.querySelector(".pizzas-wrapper");
    const pizzaItem = document.createElement("div");
    pizzaItem.classList.add("pizza-item");

    const img = document.createElement("img");
    img.classList.add("pizza-picture");
    img.src = "https://cdn.dummyjson.com/recipe-images/1.webp";
    img.alt = "Nouvelle Pizza";

    const addToCartBtn = document.createElement("span");
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.innerHTML = `<img src="../images/carbon_shopping-cart-plus.svg" alt=""> Ajouter au panier`;

    const pizzaInfos = document.createElement("ul");
    pizzaInfos.classList.add("pizza-infos");

    const pizzaName = document.createElement("li");
    pizzaName.classList.add("pizza-name");
    pizzaName.textContent = "Nouvelle Pizza";

    const pizzaPrice = document.createElement("li");
    pizzaPrice.classList.add("pizza-price");
    pizzaPrice.textContent = "$16.99";

    pizzaInfos.appendChild(pizzaName);
    pizzaInfos.appendChild(pizzaPrice);
    pizzaItem.appendChild(img);
    pizzaItem.appendChild(addToCartBtn);
    pizzaItem.appendChild(pizzaInfos);

    container.appendChild(pizzaItem);
});


//création d'éllément via data avec aide de raphael

function displayData(data) {
    container.innerHTML = "";

    data.forEach(product => {
        const pizzaItem = document.createElement("div");
        pizzaItem.classList.add("pizza-item");

        const img = document.createElement("img");
        img.classList.add("pizza-picture");
        img.src = product.image || "https://cdn.dummyjson.com/recipe-images/1.webp";
        img.alt = product.name || "Pizza";

        const addToCartBtn = document.createElement("span");
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.innerHTML = `<img src="../images/carbon_shopping-cart-plus.svg" alt=""> Ajouter au panier`;

        const pizzaInfos = document.createElement("ul");
        pizzaInfos.classList.add("pizza-infos");

        const pizzaName = document.createElement("li");
        pizzaName.classList.add("pizza-name");
        pizzaName.textContent = product.name || "Pizza Margarita";

        const pizzaPrice = document.createElement("li");
        pizzaPrice.classList.add("pizza-price");
        pizzaPrice.textContent = `$${product.price?.toFixed(2) || "16.99"}`;

        pizzaInfos.appendChild(pizzaName);
        pizzaInfos.appendChild(pizzaPrice);

        pizzaItem.appendChild(img);
        pizzaItem.appendChild(addToCartBtn);
        pizzaItem.appendChild(pizzaInfos);

        container.appendChild(pizzaItem);

        addToCartBtn.addEventListener("click", () => addToCart(product));
        function addToCart(product) {
            const basket = document.querySelector(".empty-basket");
            basket.innerHTML = "";
        
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
        
            const name = document.createElement("p");
            name.textContent = product.name;
        
            const price = document.createElement("p");
            price.textContent = `$${product.price.toFixed(2)}`;
        
            cartItem.appendChild(name);
            cartItem.appendChild(price);
            basket.appendChild(cartItem);

            console.log(product)
        }        
    });
}

getData();
