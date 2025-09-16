// student-auth.js - Authentication and initialization for Student Dashboard
document.addEventListener("DOMContentLoaded", function() {
  // Check authentication
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  console.log("Student Dashboard loading - checking auth");
  console.log("UserID:", userID || "Not found");
  console.log("Token:", token ? "Found" : "Not found");
  console.log("User Role:", userRole || "Not found");
  
  // If user is not authenticated, redirect to login
  if (!userID || !token) {
    console.log("Not authenticated, redirecting to login");
    window.location.href = 'login.html';
    return;
  }
  
  // If user is an admin, redirect to admin dashboard
  if (userRole === 'admin') {
    console.log("Admin user, redirecting to staff dashboard");
    window.location.href = 'staff_dashboard.html';
    return;
  }
  
  console.log("Student Dashboard loaded for student:", userID);
  
  // Load menu items - can be moved to main student dashboard script
  loadMenuItems();
  
  // Initialize cart display
  displayCart();
});

// Function to load menu items
async function loadMenuItems() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/menu', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    
    const menuItems = await response.json();
    displayMenuItems(menuItems);
  } catch (error) {
    console.error('Error loading menu items:', error);
    alert('Error loading menu. Please try again later.');
  }
}

// Function to display menu items - replace with your implementation
function displayMenuItems(items) {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) {
    console.error('Menu container not found in the DOM');
    return;
  }
  
  menuContainer.innerHTML = '';
  
  items.forEach(item => {
    const itemElement = createMenuItemElement(item);
    menuContainer.appendChild(itemElement);
  });
}

// Helper function to create menu item elements - replace with your implementation
function createMenuItemElement(item) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'menu-item';
  
  // Customize this based on your actual HTML structure
  itemDiv.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.name}" class="menu-item-image">
    <h3>${item.name}</h3>
    <p>₹${item.price.toFixed(2)}</p>
    <button class="add-to-cart-btn" data-id="${item._id}" data-name="${item.name}" data-price="${item.price}">
      Add to Cart
    </button>
  `;
  
  // Add event listener to the add to cart button
  const addToCartBtn = itemDiv.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', function() {
    addToCart(item);
  });
  
  return itemDiv;
}

// Function to add item to cart
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the item is already in the cart
  const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
  
  if (existingItemIndex > -1) {
    // Item exists, increment quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // Item doesn't exist, add it with quantity 1
    cart.push({ ...item, quantity: 1 });
  }
  
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update the cart display
  displayCart();
  
  // Show notification
  alert(`${item.name} added to cart!`);
}

// Function to display cart
function displayCart() {
  const cartContainer = document.getElementById('cart-container');
  if (!cartContainer) {
    console.error('Cart container not found in the DOM');
    return;
  }
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  let cartHTML = '<ul class="cart-items">';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    cartHTML += `
      <li class="cart-item">
        <span>${item.name} (${item.quantity})</span>
        <span>₹${itemTotal.toFixed(2)}</span>
        <button class="remove-item-btn" data-id="${item._id}">Remove</button>
      </li>
    `;
  });
  
  cartHTML += '</ul>';
  cartHTML += `<div class="cart-total">Total: ₹${total.toFixed(2)}</div>`;
  cartHTML += '<button id="checkout-btn" class="checkout-btn">Checkout</button>';
  
  cartContainer.innerHTML = cartHTML;
  
  // Add event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-item-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      removeFromCart(this.getAttribute('data-id'));
    });
  });
  
  // Add event listener to checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      window.location.href = 'payment.html';
    });
  }
}

// Function to remove item from cart
function removeFromCart(itemId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Find the item in the cart
  const itemIndex = cart.findIndex(item => item._id === itemId);
  
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      // If quantity is more than 1, decrement it
      cart[itemIndex].quantity -= 1;
    } else {
      // If quantity is 1, remove the item from cart
      cart.splice(itemIndex, 1);
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the cart display
    displayCart();
  }
}
