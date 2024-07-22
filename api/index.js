require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// Enable CORS for all origins
app.use(cors());

// Use body-parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const salarySlipRoutes = require('./routes/salarySlipRoutes');
const birthdayRoutes = require('./routes/birthdayRoutes');


// Use routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/salary-slips', salarySlipRoutes);
app.use('/api/birthdays', birthdayRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
