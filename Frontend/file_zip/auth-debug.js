// Create a small fix script to include at the end of all pages
// This will monitor localStorage and ensure redirects happen correctly

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add global console logging for authentication checks
  console.log('=== Auth Debug Helper Loaded ===');
  console.log('Current page:', window.location.pathname);
  console.log('UserID:', localStorage.getItem('userID') || 'Not found');
  console.log('User Role:', localStorage.getItem('userRole') || 'Not found');
  console.log('Token:', localStorage.getItem('token') ? 'Found' : 'Not found');
  
  // Add a debugging object to the window for easy console access
  window.authDebug = {
    checkAuth: function() {
      const userID = localStorage.getItem('userID');
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      console.log('=== Auth Check ===');
      console.log('UserID:', userID || 'Not found');
      console.log('User Role:', userRole || 'Not found');
      console.log('Token:', token ? 'Found' : 'Not found');
      
      return {
        isAuthenticated: !!(userID && token),
        userID: userID,
        userRole: userRole,
        hasToken: !!token
      };
    },
    
    clearAuth: function() {
      localStorage.removeItem('userID');
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
      console.log('Auth data cleared');
    },
    
    redirectToLogin: function() {
      window.location.href = 'login.html';
    },
    
    redirectToDashboard: function() {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'admin') {
        window.location.href = 'staff_dashboard.html';
      } else {
        window.location.href = 'student_dashboard.html';
      }
    }
  };
  
  // Add this to the console for easier debugging
  console.log('Auth debug helper available at window.authDebug');
});
