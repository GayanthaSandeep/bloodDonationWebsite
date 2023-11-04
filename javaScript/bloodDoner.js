document.addEventListener("DOMContentLoaded", function () {
    document
    .getElementById('donor-form')
    .addEventListener("submit", async (e) => {
      e.preventDefault();
    const userData={
     name:document.getElementById('name').value,
     email :document.getElementById('email').value,
     bloodTypeInput : document.getElementById('bloodtype').value,
     lastDonated : document.getElementById('lastDonated').value,
     weight : document.getElementById('weight').value
    };

  try {

    // POST request to API endpoint
    const response = await fetch('http://localhost:3000/bloodDonor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)  
    });

    // Handle response    
    if (response.ok) {
      console.log('Donor added successfully!');  
    } else {
      console.error('Error adding donor'); 
    }

  } catch (error) {
    console.error(error);
  }

});
});