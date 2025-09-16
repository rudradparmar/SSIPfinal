// staff-auth.js - Authentication and initialization for Staff Dashboard
document.addEventListener("DOMContentLoaded", function() {
  // Check authentication
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  console.log("Staff Dashboard loading - checking auth");
  console.log("UserID:", userID || "Not found");
  console.log("Token:", token ? "Found" : "Not found");
  console.log("User Role:", userRole || "Not found");
  
  // If user is not authenticated, redirect to login
  if (!userID || !token) {
    console.log("Not authenticated, redirecting to login");
    window.location.href = 'login.html';
    return;
  }
  
  // If user is not an admin, redirect to student dashboard
  if (userRole !== 'admin') {
    console.log("Not admin, redirecting to student dashboard");
    window.location.href = 'student_dashboard.html';
    return;
  }
  
  console.log("Staff Dashboard loaded for admin:", userID);
  
  // Rest of your initialization code
  const addItemForm = document.getElementById('add-item-form');
  
  // Handle form submission
  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const itemName = document.getElementById('item-name').value;
    const price = document.getElementById('price').value;
    const imageUrl = document.getElementById('image-url').value;
    const category = document.getElementById('category').value;
    const prepTime = document.getElementById('prep-time').value;
    const rating = document.getElementById('rating').value;
    
    try {
      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: itemName,
          price: Number(price),
          imageUrl: imageUrl || 'default-image.jpg',
          category: category,
          prepTime: Number(prepTime),
          rating: Number(rating)
        })
      });
      
      if (response.ok) {
        alert('Menu item added successfully!');
        addItemForm.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item');
      }
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error adding item:', error);
    }
  });
});
