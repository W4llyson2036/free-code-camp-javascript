// Data
import { products }      from "../data/data";

// Typescript class
import { ShoppingCart }  from "../product/shoppingCart";

// Dom
const cartContainer      = document.getElementById("cart-container")           as HTMLElement;
const dessertCards       = document.getElementById("dessert-card-container")   as HTMLElement;
const cartBtn            = document.getElementById("cart-btn")                 as HTMLElement;
const clearCartBtn       = document.getElementById("clear-cart-btn")           as HTMLElement;
const totalNumberOfItems = document.getElementById("total-items")              as HTMLElement;
const showHideCartSpan   = document.getElementById("show-hide-cart")           as HTMLElement;
const addToCartBtns      = document.getElementsByClassName("add-to-cart-btn");
let isCartShowing        = false;

const cart: ShoppingCart = new ShoppingCart();

// Functions
products.forEach(
  ({ name, id, price, category }) => {
    if (!dessertCards) return;
    console.log(dessertCards)

    dessertCards.innerHTML += `
      <div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>
    `;
  }
);

[...addToCartBtns].forEach(
  (btn) => {
    btn.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      cart.addItem(Number(target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);

// Events
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
  cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn?.addEventListener("click", cart.clearCart.bind(cart));