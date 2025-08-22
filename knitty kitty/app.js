document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image,
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
      alert(`${product.name} added to cart!`);
    });
  });

  if (document.getElementById("cart-items")) {
    renderCart();
  }
});
