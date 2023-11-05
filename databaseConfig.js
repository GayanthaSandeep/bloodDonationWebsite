// Import Sequelize constructor and datatypes
const { Sequelize, DataTypes } = require("sequelize");

// Create connection to database
const sequelize = new Sequelize("blooddonation", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Define User model
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


// Sync models to database
sequelize.sync();
//Create a new user and save it to the User table
User.create({
  name: 'admin',
  email: 'admin@gmail.com',
  password: '1234',
  bloodtype: 'A+',
  contactinformation: '123-456-7890',
  location: 'New York',
  admin: true
})
  .then((user) => {
    console.log('User created:', user.toJSON());
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  });


