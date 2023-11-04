document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const userData = {
        name: document.getElementById("username").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        bloodtype: document.getElementById("blood").value,
        contactinformation: document.getElementById("phone").value,
        location: document.getElementById("address").value,
      };

      try {
        const response = await fetch("http://localhost:3000/submitUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("User successfully signed up:", response);
        } else {
          console.error("Error signing up the user.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
});
