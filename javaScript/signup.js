document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("signup-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const userData = {
        name: document.getElementById("username").value,
        password: document.getElementById("password").value,
        repassword: document.getElementById("repassword").value,
        email: document.getElementById("email").value,
        bloodtype: document.getElementById("blood").value,
        contactinformation: document.getElementById("phone").value,
        location: document.getElementById("address").value,
      };
      console.log(password.value)
      console.log(repassword.value)
      if (password.value !== repassword.value) {
        alert("Passwords do not match. Please re-enter.");
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
