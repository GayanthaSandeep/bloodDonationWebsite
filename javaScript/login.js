document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("login-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const userData = {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        };
  
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });
  
          if (response.status === 200) {
            // Successful login, redirect to the root route, which serves "index.html"
            window.location.href = '/home.html';
          } else if (response.status === 400) {
            // Bad request, handle error
            const errorText = await response.text();
            alert("Error: " + errorText);
          } else {
            // Handle other status codes as needed
            alert("An unexpected error occurred.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
  });
  