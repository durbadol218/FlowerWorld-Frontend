// // add_flower.js
// document.getElementById('addFlowerForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form from submitting the traditional way
  
//     // Get the flower details from the form inputs
//     const flowerName = document.getElementById('flower_name').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const category = document.getElementById('category').value;
  
//     // URL for your flower creation API
//     const addFlowerUrl = 'https://flowerworld.onrender.com/flowers/';
  
//     const token = localStorage.getItem("token");  // Retrieve the token from local storage
  
//     // Make the POST request to create the flower
//     fetch(addFlowerUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,  // Authorization header with token
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         flower_name: flowerName,
//         description: description,
//         price: price,
//         category: category
//       }),
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }
//       return response.json().then(err => { throw new Error(err.detail); });
//     })
//     .then(data => {
//       // Show success message
//       document.getElementById('success-message').style.display = 'block';
//       document.getElementById('error-message').style.display = 'none';
  
//       // Clear the form
//       document.getElementById('flower_name').value = '';
//       document.getElementById('description').value = '';
//       document.getElementById('price').value = '';
//       document.getElementById('category').value = '';
//     })
//     .catch(error => {
//       // Show error message
//       document.getElementById('success-message').style.display = 'none';
//       document.getElementById('error-message').style.display = 'block';
//       console.error('Error:', error);
//     });
//   });


// add_flower.js
// document.getElementById('addFlowerForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form from submitting the traditional way

//     // Get the flower details from the form inputs
//     const flowerName = document.getElementById('flower_name').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const category = document.getElementById('category').value;

//     // URL for your flower creation API
//     const addFlowerUrl = 'https://flowerworld.onrender.com/flowers/';

//     const token = localStorage.getItem("token");  // Retrieve the token from local storage

//     // Make the POST request to create the flower
//     fetch(addFlowerUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,  // Authorization header with token
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         flower_name: flowerName,
//         description: description,
//         price: price,
//         category: category
//       }),
//     })
//     .then(response => response.json().then(data => ({status: response.status, body: data}))) // Parse JSON response
//     .then(({status, body}) => {
//       if (status >= 200 && status < 300) { // Check for successful response
//         // Show success message
//         document.getElementById('success-message').style.display = 'block';
//         document.getElementById('error-message').style.display = 'none';

//         // Clear the form
//         document.getElementById('flower_name').value = '';
//         document.getElementById('description').value = '';
//         document.getElementById('price').value = '';
//         document.getElementById('category').value = '';
//       } else {
//         // Handle HTTP errors
//         throw new Error(body.detail || 'Failed to add flower');
//       }
//     })
//     .catch(error => {
//       // Show error message
//       document.getElementById('success-message').style.display = 'none';
//       document.getElementById('error-message').style.display = 'block';
//       console.error('Error:', error);
//     });
// });


// add_flower.js

// document.addEventListener('DOMContentLoaded', function() {
//     // URL for your category API
//     const categoriesUrl = 'https://flowerworld.onrender.com/categories/';
  
//     // Fetch categories and populate the select element
//     fetch(categoriesUrl)
//       .then(response => response.json())
//       .then(categories => {
//         const categorySelect = document.getElementById('category');
//         categories.forEach(category => {
//           const option = document.createElement('option');
//           option.value = category.id;
//           option.textContent = category.name;
//           categorySelect.appendChild(option);
//         });
//       })
//       .catch(error => console.error('Error fetching categories:', error));
//   });
  
//   document.getElementById('addFlowerForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form from submitting the traditional way
  
//     // Get the flower details from the form inputs
//     const flowerName = document.getElementById('flower_name').value;
//     const description = document.getElementById('description').value;
//     const price = document.getElementById('price').value;
//     const category = document.getElementById('category').value;
  
//     // URL for your flower creation API
//     const addFlowerUrl = 'https://flowerworld.onrender.com/flowers/';
  
//     const token = localStorage.getItem("token");  // Retrieve the token from local storage
  
//     // Make the POST request to create the flower
//     fetch(addFlowerUrl, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,  // Authorization header with token
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         flower_name: flowerName,
//         description: description,
//         price: price,
//         category: category
//       }),
//     })
//     .then(response => response.json().then(data => ({status: response.status, body: data}))) // Parse JSON response
//     .then(({status, body}) => {
//       if (status >= 200 && status < 300) { // Check for successful response
//         // Show success message
//         document.getElementById('success-message').style.display = 'block';
//         document.getElementById('error-message').style.display = 'none';
  
//         // Clear the form
//         document.getElementById('flower_name').value = '';
//         document.getElementById('description').value = '';
//         document.getElementById('price').value = '';
//         document.getElementById('category').value = '';
//       } else {
//         // Handle HTTP errors
//         throw new Error(body.detail || 'Failed to add flower');
//       }
//     })
//     .catch(error => {
//       // Show error message
//       document.getElementById('success-message').style.display = 'none';
//       document.getElementById('error-message').style.display = 'block';
//       console.error('Error:', error);
//     });
//   });

// add_flower.js
document.getElementById('addFlowerForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form from submitting the traditional way

  // Get the flower details from the form inputs
  const flowerName = document.getElementById('flower_name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const stock = document.getElementById('stock').value;
  const category = document.getElementById('category').value;
  const image = document.getElementById('image').files[0];  // Get the file

  const token = localStorage.getItem("token");  // Retrieve the token from local storage

  const formData = new FormData();
  formData.append('flower_name', flowerName);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('stock', stock);
  formData.append('category', category);
  if (image) formData.append('image', image);

  // URL for your flower creation API
  const addFlowerUrl = 'https://flowerworld.onrender.com/flowers/';

  // Make the POST request to create the flower
  fetch(addFlowerUrl, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`  // Authorization header with token
      },
      body: formData
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      }
      return response.json().then(err => { throw new Error(err.detail); });
  })
  .then(data => {
      // Show success message
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';

      // Clear the form
      document.getElementById('flower_name').value = '';
      document.getElementById('description').value = '';
      document.getElementById('price').value = '';
      document.getElementById('stock').value = '';
      document.getElementById('category').value = '';
      document.getElementById('image').value = '';
  })
  .catch(error => {
      // Show error message
      document.getElementById('success-message').style.display = 'none';
      document.getElementById('error-message').style.display = 'block';
      console.error('Error:', error);
  });
});

  