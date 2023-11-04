// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and populate Blood Requests table
    fetch('/bloodrequests')
      .then((response) => response.json())
      .then((data) => {
        const table = document.querySelector('table:nth-child(2)');
        data.forEach((request) => {
          const row = table.insertRow();

        // Create table cells for each data item
        const nameCell = row.insertCell(0);
        const telephoneCell = row.insertCell(1);
        const needDateCell = row.insertCell(2);
        const bloodTypeCell = row.insertCell(3);
        const reasonCell = row.insertCell(4);

        // Populate the cells with data
        nameCell.textContent = request.name;
        telephoneCell.textContent = request.contactinformation;
        needDateCell.textContent = request.requestdate;
        bloodTypeCell.textContent = request.bloodtype;
        reasonCell.textContent = request.reason;
        });
      });
  
    // Fetch and populate Blood Donors table
    fetch('/blooddonors')
      .then((response) => response.json())
      .then((data) => {
        const table = document.querySelector('table:nth-child(3)');
        data.forEach((donor) => {
          // Create a new table row
        const row = table.insertRow();

        // Create table cells for each data item
        const nameCell = row.insertCell(0);
        const telephoneCell = row.insertCell(1);
        const lastDonationDateCell = row.insertCell(2);
        const bloodTypeCell = row.insertCell(3);
        const weightCell = row.insertCell(4);

        // Populate the cells with data
        nameCell.textContent = donor.User.name;  // Assuming the User model has a 'name' property
        telephoneCell.textContent = donor.User.contactinformation;  // Assuming the User model has 'contactinformation'
        lastDonationDateCell.textContent = donor.lastDonated;
        bloodTypeCell.textContent = donor.User.bloodtype;
        weightCell.textContent = donor.User.weight;  // Assuming the User model has 'weight'
      });
      });
  });
  