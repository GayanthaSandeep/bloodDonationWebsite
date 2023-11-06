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
      if (password !== repassword) {
        alert("Passwords do not match. Please re-enter.");
        return;
      }
       const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!email.match(emailPattern)) {
        alert("Invalid email format. Please enter a valid email address.");
        return;
      }

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
          alert("Successfully Registered!!")
          window.location.href = '/home.html';
        } else {
          console.error("Error signing up the user.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
});
