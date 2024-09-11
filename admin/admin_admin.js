const loadCategories = (category) => {
    fetch('https://flowerworld.onrender.com/categories/')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById("flower_category");
            data.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.text = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading categories:', error));
};

// const addflower = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('name', document.getElementById("flower_name").value);
//     formData.append('price', document.getElementById("flower_price").value);
//     formData.append('stock', document.getElementById("flower_quantity").value);
//     formData.append('image', document.getElementById("flower_image").files[0]);
//     formData.append('description', document.getElementById("flower_description").value);
//     formData.append('category', document.getElementById("flower_category").value);

//     fetch('https://flowerworld.onrender.com/flowers/flowers/', {
//         method: "POST",
//         body: formData,
//     })
//         .then((res) => {
//             if (!res.ok) {
//                 return res.json().then((err) => {
//                     console.error('Error:', res.status, err);
//                     throw new Error('Bad Request');
//                 });
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log('Flower added successfully:', data);
//             window.location.href = `allflowers.html`;
//         })
//         .catch((error) => {
//             console.error('Fetch error:', error);
//         });
// };

// window.onload = () => {
//     const param = new URLSearchParams(window.location.search).get("Id");

//     if (!param) {
//         console.error('No ID found in the URL');
//         return;
//     }

//     fetch(`https://flowerworld.onrender.com/flowers/${param}`)
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error(`Error: ${res.status} - ${res.statusText}`);
//             }
//             return res.json();
//         })
//         .then((data) => {
//             if (!data) {
//                 throw new Error('No flower data found');
//             }
//             document.getElementById("edit_flower_name").value = data.flower_name;
//             document.getElementById("edit_flower_price").value = data.price;
//             document.getElementById("edit_flower_quantity").value = data.stock;
//             document.getElementById("edit_flower_description").value = data.description;
//             document.getElementById("select_category").value = data.category.id;  // Use category ID
//             document.getElementById("preview_image").src = data.image;  // Display the image preview
//         })
//         .catch((error) => {
//             console.error('Error fetching flower data:', error);
//             alert('There was an issue loading the flower data. Please try again later.');
//         });
// };

document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM fully loaded and parsed');
    fetchFlowers();
});

const fetchFlowers = () => {
    const flowerTableBody = document.getElementById('flower_table');
    console.log('Flower table body:', flowerTableBody);

    if (!flowerTableBody) {
        console.error('Element with ID "flower_table" not found');
        return;
    }

    fetch('https://flowerworld.onrender.com/flowers/')
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            flowerTableBody.innerHTML = ''; // Clear existing rows

            data.forEach(flower => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = flower.flower_name;
                row.appendChild(nameCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = `$${flower.price}`;
                row.appendChild(priceCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = flower.stock;
                row.appendChild(quantityCell);

                const categoryCell = document.createElement('td');
                categoryCell.textContent = flower.category.name;
                row.appendChild(categoryCell);

                const imageCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = flower.image;
                img.alt = flower.flower_name;
                img.style.width = '100px';
                imageCell.appendChild(img);
                row.appendChild(imageCell);

                const actionsCell = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('btn', 'btn-primary', 'mr-2');
                editButton.onclick = () => {
                    window.location.href = `edit_flower.html?Id=${flower.id}`;
                };

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('btn', 'btn-danger');
                deleteButton.onclick = () => deleteFlower(flower.id);

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                flowerTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching flower data:', error);
        });
};

const deleteFlower = (id) => {
    if (confirm('Are you sure you want to delete this flower?')) {
        fetch(`https://flowerworld.onrender.com/flowers/${id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                alert('Flower deleted successfully.');
                fetchFlowers(); // Refresh the list
            })
            .catch(error => {
                console.error('Error deleting flower:', error);
                alert('Failed to delete flower. Please try again later.');
            });
    }
};


const ordersUrl = 'https://flowerworld.onrender.com/orders/orders/';

fetch(ordersUrl, {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-admin-token-here',  // Replace with actual token if using JWT or session management
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {
    let ordersHTML = '';
    data.forEach(order => {
      ordersHTML += `
        <div class="order-item">
          <h5>Order ID: ${order.id}</h5>
          <p>Customer: ${order.user}</p>
          <p>Product: ${order.flower_name}</p>
          <p>Quantity: ${order.quantity}</p>
          <p>Total Amount: ${order.total_amount}</p>
          <p>Status: 
            <select id="status-${order.id}" onchange="updateOrderStatus(${order.id})">
              <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </p>
          <p>Placed At: ${new Date(order.placed_time).toLocaleString()}</p>
        </div>
      `;
    });
    document.getElementById('admin-orders').innerHTML = ordersHTML;
  })
  .catch(error => console.error('Error fetching orders:', error));

// Function to update order status
function updateOrderStatus(orderId) {
  const newStatus = document.getElementById(`status-${orderId}`).value;
  
  fetch(`${ordersUrl}${orderId}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer your-admin-token-here',  // Replace with actual token
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order_status: newStatus
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert(`Order status updated to ${newStatus}`);
    } else {
      alert('Failed to update order status');
    }
  })
  .catch(error => console.error('Error updating order status:', error));
}

// const ordersUrl = 'https://flowerworld.onrender.com/orders/orders/';

// fetch(ordersUrl, {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Bearer your-admin-token-here',  // Replace with actual token if using JWT or session management
//     'Content-Type': 'application/json',
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     let ordersHTML = '';
//     data.forEach(order => {
//       ordersHTML += `
//         <div class="order-item">
//           <h5>Order ID: ${order.id}</h5>
//           <p>Customer: ${order.user}</p>
//           <p>Flower: ${order.flower_name}</p>
//           <p>Quantity: ${order.quantity}</p>
//           <p>Total Amount: ${order.total_amount}</p>
//           <p>Status: ${order.status}</p>
//           <p>Placed At: ${new Date(order.placed_time).toLocaleString()}</p>
//         </div>
//       `;
//     });
//     document.getElementById('admin-orders').innerHTML = ordersHTML;
//   })
//   .catch(error => console.error('Error fetching orders:', error));

// const allOrders = () => {
//     fetch('https://flowerworld.onrender.com/orders/orders/')
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return res.json();
//         })
//         .then((data) => {
//             displayAllOrders(data);
//         })
//         .catch((error) => console.error('Fetch error:', error));
// };

// const displayAllOrders = (orders) => {
//     parent.innerHTML = '';
//     let i = 1;
//     orders.forEach(order => {
//         fetch(`https://flowerworld.onrender.com/flowers/${order.flower}/`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then((flowerData) => {
//                 const parent = document.getElementById("order_data");
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${i + 1}</td>
//                     <td>${order.user}</td>
//                     <td>${flowerData.flower_name}</td>
//                     <td>
//                         <select id="status-${order.id}" class="form-select">
//                             <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
//                             <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
//                             <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
//                             <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
//                         </select>
//                     </td>
//                     <td>
//                         <button class="btn btn-success" onclick="updateOrderStatus(${order.id})">Update Status</button>
//                     </td>
//                 `;
//                 parent.appendChild(row);
//             })
//             .catch(error => {
//                 console.error('Error fetching flower data:', error);
//             });
//     });
// };

// allOrders();

// const updateOrderStatus = (orderId) => {
//     // Get the selected status from the dropdown
//     const newStatus = document.getElementById(`status-${orderId}`).value;

//     // API URL to update the order status
//     const updateStatusApiUrl = `https://flowerworld.onrender.com/orders/${orderId}/`;

//     // Send the updated status to the server using a PATCH request
//     fetch(updateStatusApiUrl, {
//         method: 'PATCH',
//         headers: {
//             'Authorization': `Token ${localStorage.getItem("token")}`,  // Ensure token is available
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ status: newStatus })  // Send the new status as a JSON payload
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error updating order status');
//             }
//             return response.json();
//         })
//         .then(updatedOrder => {
//             alert(`Order status updated to ${updatedOrder.status}`);
//             // Optionally refresh the table or row to reflect the updated status
//         })
//         .catch(error => console.error('Error updating order status:', error));
// };

function loadAllUsers() {
    fetch('https://flowerworld.onrender.com/user/users/')
        .then(response => response.json())
        .then(data => {
            const parent = document.getElementById("user_table");
            parent.innerHTML = '';

            data.forEach((user, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-warning">
                            <a href="edituser.html?Id=${user.id}" class="text-decoration-none text-white">Edit</a>
                        </button>
                    </td>
                `;
                parent.appendChild(row);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}

window.onload = loadAllUsers;

const handleLogout = () => {
    const token = localStorage.getItem('token')

    fetch("https://flowerworld.onrender.com/user/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.removeItem("token")
            localStorage.removeItem("user_id")

            window.location.href = "../login.html"
        })
        .catch((err) => console.log("logout error:: ", err))

}