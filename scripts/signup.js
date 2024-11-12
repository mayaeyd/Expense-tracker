document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost/expense-tracker/apis/registerUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "Login Successful") {
            localStorage.setItem("userId", data.id);
            window.location.href = "http://localhost/expense-tracker/dashboard.html";
        } else {
            console.error(data.status);
            alert(data.status); 
        }
    })
    .catch(error => console.error("Error:", error));
});
