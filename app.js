// // Import Sequelize constructor and datatypes
// const { Sequelize, DataTypes } = require("sequelize");

// // Create connection to database
// const sequelize = new Sequelize("blooddonation", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// // Define User model
// const User = sequelize.define("User", {
//   userId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//   },
//   password: {
//     type: DataTypes.STRING,
//   },
//   bloodtype: {
//     type: DataTypes.STRING,
//   },
//   contactinformation: {
//     type: DataTypes.STRING,
//   },
//   location: {
//     type: DataTypes.STRING,
//   },
// });

// // Define BloodDonor model
// const BloodDonor = sequelize.define("BloodDonor", {
//   donorId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User, // 'User' model
//       key: "userId", // Foreign key
//     },
//   },
//   lastDonated: {
//     type: DataTypes.DATE,
//   },
// });

// // Define BloodRequest model
// const BloodRequest = sequelize.define("BloodRequest", {
//   requestId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User, // 'User' model
//       key: "userId", // Foreign key
//     },
//     requestdate: {
//       type: DataTypes.DATE,
//     },
//     bloodtype: {
//       type: DataTypes.STRING,
//     },
//     reason: {
//       type: DataTypes.STRING,
//     },
//   },
// });

// const Admin = sequelize.define("Admin", {
//   adminid: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User, // 'User' model
//       key: "userId", // Foreign key
//     },
//   },
// });

// // Sync models to database
// sequelize.sync();const express = require('express');
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
    },
    requestdate: {
      type: DataTypes.DATE,
    },
    bloodtype: {
      type: DataTypes.STRING,
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
});

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
  console.log("dgfh")
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
