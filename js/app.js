const container = document.querySelector(".pizza-wrapper");

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

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const basketAside = document.querySelector('.basket-aside');
const basketProductsList = document.querySelector('.basket-products');
const totalOrderPriceElement = document.querySelector('.total-order-price');

let cart = [];
let totalPrice = 0;

function updateBasket() {
  basketProductsList.innerHTML = '';
  cart.forEach((item, index) => {
    const productItem = document.createElement('li');
    productItem.classList.add('basket-product-item');
    productItem.innerHTML = `
      <span class="basket-product-item-name">${item.name}</span>
      <span class="basket-product-details">
        <span class="basket-product-details-quantity">${item.quantity}x</span>
        <span class="basket-product-details-unit-price">@ $${item.price.toFixed(2)}</span>
        <span class="basket-product-details-total-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </span>
      <img class="basket-product-remove-icon" src="../images/remove-icon.svg" alt="Remove" data-index="${index}" />
    `;
    basketProductsList.appendChild(productItem);
  });

  totalOrderPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  basketAside.querySelector('h2').textContent = `Votre panier (${cart.reduce((sum, item) => sum + item.quantity, 0)})`; // Update basket count
  basketAside.classList.remove('hidden');
}

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const pizzaName = button.parentElement.querySelector('.pizza-name').textContent;
    const pizzaPrice = parseFloat(button.parentElement.querySelector('.pizza-price').textContent.replace('$', ''));

    const existingItem = cart.find((item) => item.name === pizzaName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name: pizzaName, price: pizzaPrice, quantity: 1 });
    }

    totalPrice += pizzaPrice;
    updateBasket();
  });
});

basketProductsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('basket-product-remove-icon')) {
    const index = event.target.dataset.index;
    const item = cart[index];
    totalPrice -= item.price * item.quantity;
    cart.splice(index, 1);
    updateBasket();

    if (cart.length === 0) {
      basketAside.classList.add('hidden');
    }
  }
});

const confirmOrderBtn = document.querySelector('.confirm-order-btn');
const orderModalWrapper = document.querySelector('.order-modal-wrapper')
const orderDetailList = document.querySelector('.order-detail');
const orderTotalPriceElement = document.querySelector('.order-detail-total .total-order-price');

function displayOrderModal() {
  orderDetailList.innerHTML = '';

  cart.forEach((item) => {
    const orderItem = document.createElement('li');
    orderItem.classList.add('order-detail-product-item');
    orderItem.innerHTML = `
      <img class="order-detail-product-image" src="https://cdn.dummyjson.com/recipe-images/1.webp" alt="${item.name}" />
      <span class="order-detail-product-name">${item.name}</span>
      <span class="order-detail-product-quantity">${item.quantity}x</span>
      <span class="order-detail-product-unit-price">@ $${item.price.toFixed(2)}</span>
      <span class="order-detail-product-total-price">$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    orderDetailList.appendChild(orderItem);
  });

  orderTotalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  orderModalWrapper.classList.remove('hidden');
}

confirmOrderBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    displayOrderModal();
  } else {
    alert('Your basket is empty!');
  }
});

const newOrderBtn = document.querySelector('.new-order-btn');

function resetPage() {
  cart = [];
  totalPrice = 0;

  basketAside.classList.add('hidden');
  orderModalWrapper.classList.add('hidden');

  basketProductsList.innerHTML = '';
  basketAside.querySelector('h2').textContent = 'Votre panier (0)';
  totalOrderPriceElement.textContent = '$0.00';

}

newOrderBtn.addEventListener('click', () => {
  resetPage();
});

getData();
