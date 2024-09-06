const loadCategories = () => {
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

// Load categories when the page loads
window.onload = loadCategories;


function loadAllflowers() {
    fetch('https://flowerworld.onrender.com/flowers/')
        .then(response => response.json())
        .then(data => {
            const parent = document.getElementById("flower_table");
            parent.innerHTML = ''; // Clear any previous content

            data.forEach((flower) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${flower.flower_name}</td>
                    <td>${flower.price}</td>
                    <td>${flower.stock}</td>
                    <td> 
                        <a href="editflower.html?Id=${flower.id}" class="btn btn-warning">Edit</a>
                    </td>
                `;
                parent.appendChild(row);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}

window.onload = loadAllflowers;


const addflower = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById("flower_name").value);
    formData.append('price', document.getElementById("flower_price").value);
    formData.append('quantity', document.getElementById("flower_quantity").value);
    formData.append('image', document.getElementById("flower_image").files[0]);
    formData.append('description', document.getElementById("flower_description").value);
    formData.append('category', document.getElementById("flower_category").value);

    fetch('https://flowerworld.onrender.com/flowers/flowers/', {
        method: "POST",
        body: formData,
    })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((err) => {
                    console.error('Error:', res.status, err);
                    throw new Error('Bad Request');
                });
            }
            return res.json();
        })
        .then((data) => {
            console.log('Flower added successfully:', data);
            window.location.href = `allflowers.html`;
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
};


window.onload = () => {
    const param = new URLSearchParams(window.location.search).get("Id");

    if (!param) {
        console.error('No ID found in the URL');
        return;
    }

    fetch(`https://flowerworld.onrender.com/flowers/${param}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            if (!data) {
                throw new Error('No flower data found');
            }
            document.getElementById("edit_flower_name").value = data.flower_name || '';
            document.getElementById("edit_flower_price").value = data.flower_price || '';
            document.getElementById("edit_flower_quantity").value = data.flower_quantity || '';
            document.getElementById("edit_flower_description").value = data.flower_description || '';
            document.getElementById("select_category").value = data.category || '';
            document.getElementById("preview_image").src = data.flower_image || 'default_image.jpg';
        })
        .catch((error) => {
            console.error('Error fetching flower data:', error);
            alert('There was an issue loading the flower data. Please try again later.');
        });
};


const editflower = (event) => {
    event.preventDefault();
    const param = new URLSearchParams(window.location.search).get("Id");
    const formData = new FormData();
    formData.append('flower_name', document.getElementById("edit_flower_name").value);
    formData.append('flower_price', document.getElementById("edit_flower_price").value);
    formData.append('flower_quantity', document.getElementById("edit_flower_quantity").value);
    formData.append('flower_image', document.getElementById("edit_flower_image").files[0]);
    formData.append('flower_description', document.getElementById("edit_flower_description").value);
    formData.append('category', document.getElementById("select_category").value);

    fetch(`https://flowerworld.onrender.com/flowers/flowers/${param}/`, {
        method: "PATCH",
        body: formData,
    })
        .then((res) => {
            if (!res.ok) {
                return res.text().then((text) => {
                    console.error('Error:', res.status, text);
                    throw new Error('Bad Request');
                });
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            window.location.href = `allflowers.html`;
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
};



//ADD New Category
const addCategory = (event) => {
    event.preventDefault();
    const category = document.getElementById("add_category").value;
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    const info = {
        category_name: category,
        category_slug: slug,
    };

    fetch('https://flowerworld.onrender.com/categories/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then((data) => {
            window.location.href = `category.html`;
            console.log(data);
        })
        .catch((error) => console.error('Fetch error:', error));
};

const allOrders = () => {
    fetch('https://flowerworld.onrender.com/orders/orders/')
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            displayAllOrders(data);
        })
        .catch((error) => console.error('Fetch error:', error));
};

const displayAllOrders = (orders) => {
    const parent = document.getElementById("order_data");
    parent.innerHTML = ''; // Clear previous content

    orders.forEach((order, index) => {
        fetch(`https://flowerworld.onrender.com/flowers/${order.flower}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((flowerData) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${order.user.first_name}</td>
                    <td>${flowerData.flower_name}</td>
                    <td>
                        <select id="status_${order.id}" class="form-select">
                            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Successful" ${order.status === 'Successful' ? 'selected' : ''}>Successful</option>
                            <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            <option value="Canceled" ${order.status === 'Canceled' ? 'selected' : ''}>Canceled</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-success" onclick="changeStatus(${order.id})">Change Status</button>
                    </td>
                    <td>
                        <a href="vieworder.html?Id=${order.id}" class="btn btn-warning">View Detail</a>
                    </td>
                `;
                parent.appendChild(row);
            })
            .catch(error => console.error('Error fetching flower data:', error));
    });
};

const changeStatus = (orderId) => {
    const statusSelect = document.getElementById(`status_${orderId}`);
    const selectedItem = statusSelect.value;  // Get the selected status

    const info = {
        order_status: selectedItem,
    };

    fetch(`https://flowerworld.onrender.com/orders/orders/${orderId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((error) => {
                throw new Error(`Network response was not ok: ${res.status} - ${error.message}`);
            });
        }
        return res.json();
    })
    .then((data) => {
        console.log('Order status updated:', data);
        alert(`Order ${orderId} status updated to ${selectedItem}`);
        allOrders();  // Re-fetch all orders to update the table
    })
    .catch((error) => {
        console.error('Error updating order status:', error);
    });
};

allOrders();

//Display All Orders
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
//     const parent = document.getElementById("order_data");
//     parent.innerHTML = '';

//     orders.forEach((order, index) => {
//         fetch(`https://flowerworld.onrender.com/flowers/${order.flower}/`)
//             .then((res) => {
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return res.json();
//             })
//             .then((flowerData) => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${index + 1}</td>
//                     <td>${order.user.first_name}</td>
//                     <td>${flowerData.flower_name}</td>
//                     <td>${order.status}</td>
//                     <td>
//                         <a href="vieworder.html?Id=${order.id}" class="btn btn-warning">View Detail</a>
//                     </td>
//                 `;
//                 parent.appendChild(row);
//             })
//             .catch(error => console.error('Error fetching flower data:', error));
//     });
// };
// allOrders();




function loadAllUsers() {
    fetch('https://flowerworld.onrender.com/user/users/')
        .then(response => response.json())
        .then(data => {
            const parent = document.getElementById("user_table");
            parent.innerHTML = ''; // Clear any previous data
            
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

// Load users when the page is loaded
window.onload = loadAllUsers;

const handleLogout = () => {
    const token = localStorage.getItem('token')

    fetch("https://flowerworld.onrender.com/user/logout/", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Token ${token}`,
        }
    })
    .then((res)=> res.json())
    .then((data)=> {
        console.log(data);
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")

        window.location.href ="index.html"
    })
    .catch((err)=> console.log("logout error:: ",err))

}