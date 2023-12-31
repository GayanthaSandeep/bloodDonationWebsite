const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
const port = 3000;
app.use(cors());

// Create a Sequelize instance with your database connection details
const sequelize = new Sequelize("blooddonation", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
app.use("/css", express.static(__dirname + "/css", { extensions: ["css"] }));
app.use(
  "/javaScript",
  express.static(__dirname + "/javaScript", { extensions: ["js"] })
);

app.use("/images",express.static(__dirname+"/images"));

sequelize
  .authenticate()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database:", err));

// Define the User model
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  bloodtype: {
    type: DataTypes.STRING,
  },
  contactinformation: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  }
});


// Define BloodDonor model
const BloodDonor = sequelize.define("BloodDonor", {
  donorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // 'User' model
      key: "userId", // Foreign key
    },
  },
  lastDonated: {
    type: DataTypes.DATE,
  },
  weight : {
    type: DataTypes.STRING
  }
});


 // Define BloodRequest model
const BloodRequest = sequelize.define("BloodRequest", {
  requestId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // 'User' model
      key: "userId", // Foreign key
    },},
    requestdate: {
      type: DataTypes.DATE,
    },
    bloodtype: {
      type: DataTypes.STRING,
    },
    reason: {
      type: DataTypes.STRING,
    },
  
});


BloodRequest.belongsTo(User, { foreignKey: 'userId' });
BloodDonor.belongsTo(User, { foreignKey: 'userId' }); 


// Sync the User model with the database
sequelize
  .sync()
  .then(() => console.log("User model synced"))
  .catch((err) => console.error("Error syncing User model:", err));

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/home.html", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});
// Route to serve the 'signupPage.html' file
app.get("/signup.html", (req, res) => {
  res.sendFile("/signup.html", { root: __dirname });
});

app.get("/bloodDoner.html", (req, res) => {
  res.sendFile("/bloodDoner.html", { root: __dirname });
});

app.get("/requestBlood.html", (req, res) => {
  res.sendFile("/requestBlood.html", { root: __dirname });
});

app.get("/adminAuthentication.html", (req, res) => {
  res.sendFile("/adminAuthentication.html", { root: __dirname });
});
app.get("/admin.html", (req, res) => {
  res.sendFile("/admin.html", { root: __dirname });
});
app.get("/contactUs.html", (req, res) => {
  res.sendFile("/contactUs.html", { root: __dirname });
});
app.get("/whyDonateBlood.html", (req, res) => {
  res.sendFile("/whyDonateBlood.html", { root: __dirname });
});


//this is for doner html
app.post("/bloodDonor", async (req, res) => {
  const userData = req.body;
  try {
    const existingUser = await User.findOne({
      where: { email: userData.email, name: userData.name }
    });

    if (existingUser) {
      // You should check if the user exists before getting the userId
      const userId = existingUser.userId;
      // Create a new BloodDonor entry in the database
      const donor = await BloodDonor.create({ ...userData, userId }); // Pass the data as an object
      console.log("Donor created:", donor.toJSON());
      res.send("Donor registered successfully!");
    } else {
      res.status(404).send("User not found"); // Updated error message
    }
  } catch (error) {
    console.error("Error creating donor:", error);
    res.status(500).send("Error registering the donor.");
  }
});


// Handle form submission
app.post("/submitUser", async (req, res) => {
  const userData = req.body;

  // Serve your HTML form

  try {
    // Create a new user in the database
    const user = await User.create(userData);
    console.log("User created:", user.toJSON());
    res.send("User registered successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error registering the user.");
  }
});


app.post('/bloodRequest', async (req, res) => {
  // Handle form data
  const userData = req.body;
  try {
    const existingUser = await User.findOne({
      where: { email: userData.email, name: userData.name }
    });

    if (existingUser) {
      // You should check if the user exists before getting the userId
      const userId = existingUser.userId;
      // Create a new BloodDonor entry in the database
      const bloodRequest = await BloodRequest.create({ ...userData, userId }); // Pass the data as an object
      console.log("request created:", bloodRequest.toJSON());
      res.send("request registered successfully!");
    } else {
      res.status(404).send("User not found"); // Updated error message
    }
  } catch (error) {
    console.error("Error creating donor:", error);
    res.status(500).send("Error registering the donor.");
  }
});

app.post('/login', async (req, res) => {
  const userData = req.body;
  try {
    const user = await User.findOne({ where: { email: userData.email } });

    if (!user) {
      return res.status(400).send('User not found');
    }

    if (user.password === userData.password) {
      // Successful login, you can add a user session here if needed
      res.status(200).send('Login successful');
    } else {
      res.status(400).send('Invalid password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while logging in. Please try again later.');
  }
});

app.post('/adminLogin', async (req, res) => {
  const userData = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email: userData.email } });

    if (!user) {
      return res.status(400).send('User not found');
    }

    // Check if the user is an admin
    if (user.admin) { // Check if the 'admin' field is true
      // Login successful
      res.status(200).send('Admin login successful');
    } else {
      // Login failed
      res.status(400).send('You are not authorized to access this page');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An unexpected error occurred.');
  }
});



// Get Blood Requests
app.get('/bloodrequests', async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.findAll({
      include: User, // Include user details
    });
    res.json(bloodRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error',error });
  }
});

// Get Blood Donors
app.get('/blooddonors', async (req, res) => {
  try {
    const bloodDonors = await BloodDonor.findAll({
      include: User, // Include user details
    });
    res.json(bloodDonors);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
