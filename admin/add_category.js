document.getElementById('addCategoryForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    // Get the category name from the form input
    const categoryName = document.getElementById('add_category').value;

    // URL for your category creation API
    const addCategoryUrl = 'https://flowerworld.onrender.com/categories/';

    const token = localStorage.getItem("token");
    // Make the POST request to create the category
    fetch(addCategoryUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,  // Replace with your actual token or session
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: categoryName  // Send category name as payload
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to add category');
    })
    .then(data => {
      // Show success message
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';
      
      // Clear the form
      document.getElementById('add_category').value = '';
    })
    .catch(error => {
      // Show error message
      document.getElementById('success-message').style.display = 'none';
      document.getElementById('error-message').style.display = 'block';
      console.error('Error:', error);
    });
  });