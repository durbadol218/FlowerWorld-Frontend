// const displayProfile = () => {

//     const user_id = localStorage.getItem("user_id")
//     const parent = document.getElementById("profile-info")
//     fetch(`http://flowerworld.onrender.com/user/api/accounts/${user_id}/`)
//     .then((res)=> res.json())
//     .then((user)=> {
//         parent.innerHTML = `
//             <h3>${user.first_name} ${user.last_name}</h3>
//             <hr>
//             <img src="${user.account.image}" class="img-fluid w-100 rounded-top" alt="${user.first_name}">
//             <h5>Username: ${user.username}</h5>
//             <h5>Email: ${user.email}</h5>
//             <h5>User Type: ${user.account.user_type}</h5>
//             <h5>Phone: ${user.account.phone}</h5>

//         `
//     })


// }
// displayProfile();




const displayProfile = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    const parent = document.getElementById("profile-info");

    fetch(`https://flowerworld.onrender.com/user/accounts/${user_id}/`)
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch user profile");
        }
        return res.json();
    })
    .then((user) => {
        parent.innerHTML = `
        <div class="card border-warning shadow-lg">
                <div class="card-body text-center">
                    <h3 class="card-title mb-4">${user.user.first_name} ${user.user.last_name}</h3>
                    <img src="${user.image || 'default-image.jpg'}" class="img-fluid rounded-circle mb-4" style="width: 150px; height: 150px; object-fit: cover;" alt="${user.first_name}">
                    <h5 class="card-text">Username: ${user.user.username}</h5>
                    <h5 class="card-text">Email: ${user.user.email}</h5>
                    <h5 class="card-text">User Type: ${user.user_type || 'N/A'}</h5>
                    <h5 class="card-text">Phone: ${user.phone || 'N/A'}</h5>
                    <button class="btn btn-outline-dark w-100 m-2 p-2">Update Profile</button>
                <button class="btn btn-outline-dark w-100 m-2 p-2">Change Password</button>
                </div>
            </div>
        `;
    })
    .catch((error) => {
        console.error("Error fetching profile:", error);
        parent.innerHTML = `<p class="text-danger">Failed to load profile information.</p>`;
    });
};

displayProfile();
