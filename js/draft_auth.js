// const handleLogin = (event) => {
//     event.preventDefault();
//     const form = document.getElementById("loginForm");
//     const formData = new FormData(form);
//     const loginData = {
//         username: formData.get("username"),
//         password: formData.get("password"),
//     };

//     const loadingMessage = document.getElementById("login-loading-message");
//     const errorMessage = document.getElementById("login-error-message");
//     loadingMessage.innerText = "Logging in...";
//     errorMessage.innerText = "";

//     fetch("https://flowerworld.onrender.com/user/user/login/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data);

//         if (data.error) {
//             throw new Error(data.error);
//         }
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user_id", data.user_id);
//         loadingMessage.innerText = "";
//         window.location.href = "index.html";
//     })
//     .catch((err) => {
//         console.error("Login error:", err);
//         loadingMessage.innerText = "";
//         errorMessage.innerText = "Invalid username or password. Please try again.";
//     });
// };



// Final Login JS
const handleLogin = (event) => {
    event.preventDefault();

    const form = document.getElementById("loginForm");
    const formData = new FormData(form);
    const loginData = {
        username: formData.get("username"),
        password: formData.get("password"),
    };
    const successAlert = document.getElementById("login-alert-success");
    const errorAlert = document.getElementById("login-alert-error");
    successAlert.classList.add("d-none");
    errorAlert.classList.add("d-none");
    fetch("https://flowerworld.onrender.com/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        if (data.error) {
            throw new Error(data.error);
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        successAlert.classList.remove("d-none");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    })
    .catch((err) => {
        console.error("Login error:", err);
        errorAlert.classList.remove("d-none");
        errorAlert.innerText = err.message || "Invalid username or password. Please try again.";
    });
};



// const handleRegistrationn = (event) => {
//     event.preventDefault();

//     const form = document.getElementById("registrationForm");
//     const formData = new FormData(form);

//     const registrationData = {
//         username: formData.get("username"),
//         email: formData.get("email"),
//         firstname: formData.get("firstname"),
//         lastname: formData.get("lastname"),
//         user_type: formData.get("user_type"),
//         phonenumber: formData.get("phonenumber"),
//         password: formData.get("password"),
//         confirm_password: formData.get("confirm_password"),
//     };

//     const successAlert = document.getElementById("regi-alert-success");
//     const errorAlert = document.getElementById("regi-alert-error");

//     successAlert.classList.add("d-none");
//     errorAlert.classList.add("d-none");
//     fetch("https://flowerworld.onrender.com/user/register/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(registrationData),
//     })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         if (data.error) {
//             throw new Error(data.error);
//         }
//         successAlert.classList.remove("d-none");
//         successAlert.innerText = "Registration successful! Redirecting...";
//         setTimeout(() => {
//             window.location.href = "login.html";
//         }, 3000);
//     })
//     .catch((err) => {
//         console.error("Registration error:", err);
//         errorAlert.classList.remove("d-none");
//         errorAlert.innerText = err.message || "Registration failed. Please try again.";
//     });
// }




// Primary For Registration

// const handleRegister = (event) => {
//     event.preventDefault();

//     const form = document.getElementById("registrationForm");
//     const formData = new FormData(form);
//     const registerData = {
//         username: formData.get("username"),
//         email: formData.get("email"),
//         first_name: formData.get("first_name"),
//         last_name: formData.get("last_name"),
//         password: formData.get("password"),
//         confirm_password: formData.get("confirm_password"),
//         user_type: formData.get("user_type"),
//         phone: formData.get("phonenumber"),
//     };

//     const successAlert = document.getElementById("regi-alert-success");
//     const errorAlert = document.getElementById("regi-alert-error");
//     successAlert.classList.add("d-none");
//     errorAlert.classList.add("d-none");

//     fetch("https://flowerworld.onrender.com/user/register/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(registerData),
//     })
//     .then((response) => {
//         console.log("response Status: ", response.status);
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then((data) => {
//         if (data.error) {
//             throw new Error(data.error);
//         }
//         successAlert.classList.remove("d-none");
//         successAlert.innerText = "Registration successful! Redirecting...";
//         setTimeout(() => {
//             window.location.href = "login.html";
//         }, 3000);
//     })
//     .catch((err) => {
//         console.error("Registration error:", err);
//         errorAlert.classList.remove("d-none");
//         errorAlert.innerText = err.message || "Registration failed. Please try again.";
//         return err.json();
//     });
// };



// Final For Registration

const handleRegister = (event) => {
    event.preventDefault();

    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);
    const registerData = {
        username: formData.get("username"),
        email: formData.get("email"),
        first_name: formData.get("firstname"),
        last_name: formData.get("lastname"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        user_type: formData.get("user_type"),
        phone: formData.get("phonenumber"),
    };

    const successAlert = document.getElementById("regi-alert-success");
    const errorAlert = document.getElementById("regi-alert-error");
    successAlert.classList.add("d-none");
    errorAlert.classList.add("d-none");

    console.log("Register Data: ", registerData); // Debugging line

    fetch("https://flowerworld.onrender.com/user/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    })
    .then((response) => {
        console.log("Response Status: ", response.status); // Debugging line
        if (!response.ok) {
            return response.json().then((data) => {
                throw new Error(data.error || "Registration failed");
            });
        }
        return response.json();
    })
    .then((data) => {
        console.log("Response Data: ", data); // Debugging line
        successAlert.classList.remove("d-none");
        successAlert.innerText = "Registration successful! Redirecting...";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
    })
    .catch((err) => {
        console.error("Registration error:", err.message); // Debugging line
        errorAlert.classList.remove("d-none");
        errorAlert.innerText = err.message || "Registration failed. Please try again.";
    });
};
