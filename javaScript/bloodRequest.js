document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("blood-request-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        bloodtype: document.getElementById("bloodtype").value,
        reason: document.getElementById("reason").value,
        requestdate: document.getElementById("date").value,
      };

      try {
        const response = await fetch("http://localhost:3000/bloodRequest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          console.log("Success:", response);
          this.location.reload();
          console.log("Blood Request Success");
        } else if (response.status === 404) {
          alert("Name and Email unmatched!");
          location.reload();
        } else {
          console.error("Error registering the user.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
});
