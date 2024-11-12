const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

document.getElementById("signup-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData();
    data.append("username", usernameInput.value);
    data.append("password", passwordInput.value);

    try {
        const response = await axios("http://localhost/expense-tracker/apis/registerUser.php", {
            method: "POST",
            data: data,
        });
        console.log(response);
        if (response.data.status === "Login Successful") {
            // Store the user ID in localStorage
            localStorage.setItem("userId", response.data.id);
            // Redirect to the dashboard
            window.location.href = 'http://localhost/expense-tracker/dashboard.html';
        } else {
            // Show the error message from the response
            alert(response.data.status);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login. Please try again.");
    }
}); 
