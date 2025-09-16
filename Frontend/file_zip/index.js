// index page JavaScript to handle button clicks and navigation
document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.querySelector('.nav-link.home');
  const loginButton = document.querySelector('.nav-link.login');
  const signupButton = document.querySelector('.nav-link.signup');
  const orderButton = document.querySelector('.order-button');

  // Event listener for the "Home" button
  homeButton.addEventListener('click', () => {
     window.location.href = 'index.html'; 
  });

  // Event listener for the "Login" button
  loginButton.addEventListener('click', () => {
   window.location.href = 'login.html';
  });

  // Event listener for the "Signup" button
  signupButton.addEventListener('click', () => {
    window.location.href = "signup.html";
  });

  // Event listener for the "Order Now" button
  orderButton.addEventListener('click', () => {
    window.location.href = "login.html";
  });
});




// login page JavaScript to handle form submission

document.addEventListener('DOMContentLoaded', () => {
    // Only run this code if we're on the login page
    if (window.location.href.includes('login.html')) {
        const studentButton = document.querySelector('.toggle-btn[data-role="student"]');
        const staffButton = document.querySelector('.toggle-btn[data-role="staff"]');
        const studentForm = document.getElementById('student-form');
        const staffForm = document.getElementById('staff-form');

        // Toggle between Student and Staff
        studentButton?.addEventListener('click', () => {
            studentButton.classList.add('active');
            staffButton.classList.remove('active');
            studentForm.classList.remove('hidden');
            staffForm.classList.add('hidden');
        });

        staffButton?.addEventListener('click', () => {
            staffButton.classList.add('active');
            studentButton.classList.remove('active');
            staffForm.classList.remove('hidden');
            studentForm.classList.add('hidden');
        });
        
        // Don't add form submission handlers - they're in login.html
    }
});

// signup page JavaScript to handle form submission
//in html file

// student dashboard JavaScript to handle menu and notifications
//in html file

//payment page JavaScript to handle payment form submission
//in html file