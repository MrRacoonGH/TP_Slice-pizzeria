const container = document.querySelector(".pizzas-wrapper");

// Fetch the data from the API
async function getData() {
    try {
        const response = await fetch("http://10.59.122.27:3000/products"); // Replace with your API endpoint
        const data = await response.json(); // Parse JSON response
        console.log(data); // Log the data to check its structure
        displayData(data); // Pass the data to the display function
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }
}

// Display the data dynamically
function displayData(data) {
    container.innerHTML = ""; // Clear the container before adding new elements

    data.forEach(product => {
        // Create the outer container for the pizza item
        const pizzaItem = document.createElement("div");
        pizzaItem.classList.add("pizza-item");

        // Create the pizza image
        const img = document.createElement("img");
        img.classList.add("pizza-picture");
        img.src = product.image || "https://cdn.dummyjson.com/recipe-images/1.webp"; // Use fallback if no image
        img.alt = product.name || "Pizza"; // Use fallback if no name

        // Create the 'add to cart' button
        const addToCartBtn = document.createElement("span");
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.innerHTML = `<img src="../images/carbon_shopping-cart-plus.svg" alt=""> Ajouter au panier`;

        // Create the info section
        const pizzaInfos = document.createElement("ul");
        pizzaInfos.classList.add("pizza-infos");

        const pizzaName = document.createElement("li");
        pizzaName.classList.add("pizza-name");
        pizzaName.textContent = product.name || "Pizza Margarita"; // Use fallback if no name

        const pizzaPrice = document.createElement("li");
        pizzaPrice.classList.add("pizza-price");
        pizzaPrice.textContent = `$${product.price?.toFixed(2) || "16.99"}`; // Use fallback if no price

        // Append the info items to the info section
        pizzaInfos.appendChild(pizzaName);
        pizzaInfos.appendChild(pizzaPrice);

        // Append the elements to the pizza item
        pizzaItem.appendChild(img);
        pizzaItem.appendChild(addToCartBtn);
        pizzaItem.appendChild(pizzaInfos);

        // Append the pizza item to the container
        container.appendChild(pizzaItem);
    });
}

// Fetch the data and generate the pizza items
getData();