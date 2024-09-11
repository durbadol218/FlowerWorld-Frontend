document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld.onrender.com/flowers/";
    const categoryApiUrl = "https://flowerworld.onrender.com/categories/";
    const flowerContainer = document.getElementById("flower-container");
    const categorySelect = document.getElementById("category-select");

    // Function to load and display categories in the dropdown
    function loadCategories() {
        fetch(categoryApiUrl)
            .then((response) => response.json())
            .then((categories) => {
                categories.forEach((category) => {
                    const option = document.createElement("option");
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }
    // Function to load and display flowers based on the selected category
    function loadFlowers(categoryId = "") {
        let url = apiUrl;
        if (categoryId) {
            url = `https://flowerworld.onrender.com/flowers/category/${categoryId}/`;
        }

        fetch(url)
            .then((response) => response.json())
            .then((flowers) => {
                flowerContainer.innerHTML = "";
                flowers.forEach((flower) => {
                    const flowerCard = `
                        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <div class="rounded position-relative fruite-item">
                                <div class="fruite-img">
                                    <img src="${flower.image}" class="img-fluid w-100 rounded-top" alt="${flower.flower_name}">
                                </div>
                                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                                    ${flower.category.name || 'No Category'}
                                </div>
                                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                    <h4>${flower.flower_name}</h4>
                                    <p>${flower.description}</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold mb-0">$${flower.price}</p>
                                        <button class="btn border border-secondary rounded-pill px-3 text-primary buy-now-btn" data-flower-id="${flower.id}" data-flower-price="${flower.price}">
                                            <i class="fa-solid fa-cart-shopping text-primary"></i> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    flowerContainer.innerHTML += flowerCard;
                });
                attachBuyNowListeners(); // Re-attach listeners after flowers are loaded
            })
            .catch((error) => {
                console.error("Error fetching flowers:", error);
            });
    }

    // Function to attach event listeners to Buy Now buttons
    function attachBuyNowListeners() {
        document.querySelectorAll('.buy-now-btn').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default button behavior
                const flowerId = this.getAttribute('data-flower-id');
                const flowerPrice = this.getAttribute('data-flower-price');
                const quantity = 1;
                const userId = localStorage.getItem("user_id");
                const token = localStorage.getItem("token");

                fetch('https://flowerworld.onrender.com/orders/orders/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    },
                    body: JSON.stringify({
                        flower: flowerId,
                        user: userId,
                        quantity: quantity,
                        total_amount: flowerPrice * quantity
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Order successfully placed:', data);
                    alert('Order placed successfully!');
                })
                .catch(error => {
                    console.error('Error placing order:', error);
                    alert('Failed to place order.');
                });
            });
        });
    }

    loadCategories();
    loadFlowers();

    // Event listener for category selection
    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        loadFlowers(selectedCategory);
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://flowerworld.onrender.com/flowers/";
    const flowerContainer = document.getElementById("flower-container");
    const searchInput = document.getElementById("modal-flower-search");
    const applyFiltersBtn = document.getElementById("apply-filters");

    function loadFlowers(searchTerm = "") {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((flowers) => {
                flowerContainer.innerHTML = "";
                const filteredFlowers = flowers.filter(flower =>
                    flower.flower_name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                filteredFlowers.forEach((flower) => {
                    const flowerCard = `
                        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <div class="rounded position-relative fruite-item">
                                <div class="fruite-img">
                                    <img src="${flower.image}" class="img-fluid w-100 rounded-top" alt="${flower.flower_name}">
                                </div>
                                <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                                    ${flower.category.name}
                                </div>
                                <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                    <h4>${flower.flower_name}</h4>
                                    <p>${flower.description}</p>
                                    <div class="d-flex justify-content-between flex-lg-wrap">
                                        <p class="text-dark fs-5 fw-bold mb-0">$${flower.price}</p>
                                        <button class="btn border border-secondary rounded-pill px-3 text-primary buy-now-btn" data-flower-id="${flower.id}" data-flower-price="${flower.price}">
                                            <i class="fa-solid fa-cart-shopping text-primary"></i> Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    flowerContainer.innerHTML += flowerCard;
                });

                document.querySelectorAll('.buy-now-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const flowerId = this.getAttribute('data-flower-id');
                        const flowerPrice = this.getAttribute('data-flower-price');

                        const quantity = 1;
                        const userId = localStorage.getItem("user_id");
                        fetch('https://flowerworld.onrender.com/orders/orders/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${localStorage.getItem("token")}`
                            },
                            body: JSON.stringify({
                                flower: flowerId,
                                user: userId,
                                quantity: quantity,
                                total_amount: flowerPrice * quantity
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Order successfully placed:', data);
                            alert('Order placed successfully!');
                        })
                        .catch(error => {
                            console.error('Error placing order:', error);
                            alert('Failed to place order.');
                        });
                    });
                });
            })
            .catch((error) => {
                console.error("Error fetching flowers:", error);
            });
    }

    applyFiltersBtn.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        loadFlowers(searchTerm);
        const modalElement = document.getElementById('searchModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    });
    loadFlowers();
});

document.addEventListener("DOMContentLoaded", () => {
    const ordersApiUrl = "https://flowerworld.onrender.com/orders/orders/";
    const ordersContainer = document.getElementById("orders-container");
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    console.log("Logged-in User ID:", userId);

    function loadOrders() {
        fetch(ordersApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.json())
        .then(orders => {
            console.log("Fetched Orders:", orders);

            ordersContainer.innerHTML = "";

            // Filter orders for the logged-in user
            const user_orders = orders.filter(order => String(order.user) === String(userId));
            console.log("Filtered User Orders:", user_orders);  // Debugging: Verify filtered orders

            if (user_orders.length === 0) {
                ordersContainer.innerHTML = "<p>No orders found for this user.</p>";
            } else {
                user_orders.forEach(order => {
                    const orderCard = `
                        <div class="order-card">
                            <h4>Order ID: ${order.id}</h4>
                            <p>Flower: ${order.flower_name}</p>
                            <p>Quantity: ${order.quantity}</p>
                            <p>Total Amount: $${order.total_amount}</p>
                            <p>Status: ${order.status}</p>
                            <p>Placed Time: ${new Date(order.placed_time).toLocaleString()}</p>
                        </div>
                    `;
                    ordersContainer.innerHTML += orderCard;
                });
            }
        })
        .catch(error => {
            console.error("Error fetching orders:", error);
        });
    }

    loadOrders();
});
