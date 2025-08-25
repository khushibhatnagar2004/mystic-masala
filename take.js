// Function to handle adding items to the cart
function addToCart(event) {
    const menuItem = event.target.closest('.menu-item');
    if (!menuItem) return; // If the button is not inside a menu item, do nothing
  
    const itemName = menuItem.dataset.name;
    const itemPrice = parseFloat(menuItem.dataset.price);
  
    // Here you can implement your cart logic, such as adding the item to an array or updating a shopping cart display
    console.log(`Added ${itemName} to cart. Price: $${itemPrice}`);
  }
  
  // Add event listeners for the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
  