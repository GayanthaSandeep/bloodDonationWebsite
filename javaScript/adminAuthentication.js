document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const userData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
  
      try {
        const response = await fetch("http://localhost:3000/adminLogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (response.status === 200) {
          // Login successful
          window.location.href = "/admin.html";
        } else if (response.status === 400) {
          // Login failed
          const errorText = await response.text();
          alert("Error: " + errorText);
        } else {
            console.log("Check");
          // Unexpected error
          alert("An unexpected error occurred.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });