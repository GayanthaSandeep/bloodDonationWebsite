document.addEventListener('DOMContentLoaded', () => {
  fetch('/bloodrequests')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the data to the console for debugging
    
    const table = document.getElementById("table1");
    
    data.forEach(request => {
      console.log(request.reason); // Log the reason field to check its value
      
      const row = table.insertRow();

      // Create cells
      const nameCell = row.insertCell(0);
      const telephoneCell = row.insertCell(1);
      const needDateCell = row.insertCell(2);
      const bloodTypeCell = row.insertCell(3);
      const reasonCell = row.insertCell(4);

      // Populate cells
      nameCell.textContent = request.User.name;
      telephoneCell.textContent = request.User.contactinformation;
      needDateCell.textContent = request.requestdate; 
      bloodTypeCell.textContent = request.User.bloodtype;
      // Check if the reason is empty or falsy, display "N/A"
      reasonCell.textContent = request.reason ? request.reason : "N/A";
    });
  });




  // Fetch and populate Blood Donors table
  fetch('/blooddonors')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const table = document.getElementById("table2");
      data.forEach(donor => {
        const row = table.insertRow();
        console.log(donor.weight)

        // Create cells
        const nameCell = row.insertCell(0);
        const telephoneCell = row.insertCell(1);
        const lastDonationDateCell = row.insertCell(2);
        const bloodTypeCell = row.insertCell(3);
        const weightCell = row.insertCell(4);

        // Populate cells
        nameCell.textContent = donor.User.name;
        telephoneCell.textContent = donor.User.contactinformation;
        lastDonationDateCell.textContent = donor.lastDonated;
        bloodTypeCell.textContent = donor.User.bloodtype;
        weightCell.textContent = donor.weight;
      });
    });

});