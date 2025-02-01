// Type
import { Products }         from    "../model/typeProducts";
import { ShoppingCartType } from "./typeShoppingCart";

// HTML
const productsContainer  = document.getElementById("products-container") as HTMLElement;
const cartSubTotal       = document.getElementById("subtotal")           as HTMLElement;
const cartTaxes          = document.getElementById("taxes")              as HTMLElement;
const cartTotal          = document.getElementById("total")              as HTMLElement;
const totalNumberOfItems = document.getElementById("total-items")        as HTMLElement;

export class ShoppingCart implements ShoppingCartType{
    items: Products[] = [];
    total: number = 0;
    taxRate: number = 8.25;

    addItem(id: number, products: Products[]) {
      const product = products.find((item) => item.id === id);
      if (!product) return;
  
      const { name, price } = product;  
      this.items.push(product);
  
      const totalCountPerProduct: {[key: number]: number } = {};
      this.items.forEach((dessert) => {
        totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
      })
  
      const currentProductCount = totalCountPerProduct[product.id];
      const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);
  
      currentProductCount > 1 
        ? currentProductCountSpan!.textContent = `${currentProductCount}x`
        : productsContainer.innerHTML += `
        <div id="dessert${id}" class="product">
          <p>
            <span class="product-count" id="product-count-for-id${id}"></span>${name}
          </p>
          <p>${price}</p>
        </div>
        `;
    }
  
    getCounts(): string {
      return this.items.length.toString();
    }
  
    clearCart(): void {
      if (!this.items.length) {
        alert("Your shopping cart is already empty");
        return;
      }
  
      const isCartCleared = confirm(
        "Are you sure you want to clear all items from your shopping cart?"
      );
  
      if (isCartCleared) {
        this.items = [];
        this.total = 0;
        productsContainer.innerHTML = "";
        totalNumberOfItems.textContent = "0";
        cartSubTotal.textContent = "0";
        cartTaxes.textContent = "0";
        cartTotal.textContent = "0";
      }
    }
  
    calculateTaxes(amount: number): number {
      return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }
  
    calculateTotal(): number {
      const subTotal = this.items.reduce((total, item) => total + item.price, 0);
      const tax = this.calculateTaxes(subTotal);
      this.total = subTotal + tax;
      cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
      cartTaxes.textContent = `$${tax.toFixed(2)}`;
      cartTotal.textContent = `$${this.total.toFixed(2)}`;
      return this.total;
    }
};