// -----------------------------
// ADD TO CART (for index.html)
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-to-cart, .add-quick");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        id: button.getAttribute("data-id"),
        name: button.getAttribute("data-name"),
        price: parseFloat(button.getAttribute("data-price")),
        image: button.getAttribute("data-image"),
        quantity: 1
      };

      let cart = JSON.parse(localStorage.getItem("kk_cart")) || [];

      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push(product);
      }

      localStorage.setItem("kk_cart", JSON.stringify(cart));
      alert(`${product.name} has been added to cart!`);
    });
  });

  // -----------------------------
  // RENDER CART (for cart.html)
  // -----------------------------
  if (document.getElementById("cart-items")) {
    renderCart();
  }
});

// Function to render the cart items
function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");

  let cart = JSON.parse(localStorage.getItem("kk_cart")) || [];
  cartContainer.innerHTML = ""; // clear old content

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = "$0";
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <div class="cart-info">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;

    cartContainer.appendChild(itemDiv);
    subtotal += item.price * item.quantity;
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}
