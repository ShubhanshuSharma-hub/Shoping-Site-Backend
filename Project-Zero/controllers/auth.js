const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const mysqlConnection = require("../utils/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    country,
    state,
    city,
    address,
    phoneNumber,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !userName ||
    !email ||
    !password ||
    !country ||
    !state ||
    !city ||
    !address ||
    !phoneNumber
  ) {
    throw new BadRequestError(
      "Please provide firstName,lastName, userName, email, password, country, state, city, address, and phoneNumber."
    );
  }

  const [result] = await mysqlConnection.query(
    "SELECT email, userName FROM users WHERE email = ? OR userName = ?",
    [email, userName]
  );
  if (result.length > 0) {
    throw new BadRequestError("Either Email or Username already exists.");
  }

  // Hash the password
  salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save the new user to the database
  const insertResult = await mysqlConnection.query(
    "INSERT INTO users (firstName, lastName, userName, email, password, country, state, city, address, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      firstName,
      lastName,
      userName,
      email,
      hashedPassword,
      country,
      state,
      city,
      address,
      phoneNumber,
    ]
  );

  // Generate a JWT token for the new user
  const token = jwt.sign(
    { email, userId: insertResult.insertId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  // Send the token and user data back to the client
  res.status(StatusCodes.CREATED).json({
    message: "User created successfully.",
    token,
    user: {
      id: insertResult.insertId,
      firstName,
      lastName,
      userName,
      email,
      country,
      state,
      city,
      address,
      phoneNumber,
    },
  });
};

const login = async (req, res, next) => {
  const { emailORusername, password } = req.body;
  if (!emailORusername || !password) {
    throw new BadRequestError("Please provide Email/Username and Password");
  }

  const [result] = await mysqlConnection.query(
    "SELECT * FROM users WHERE email = ? OR userName= ?",
    [emailORusername, emailORusername]
  );
  if (result.length === 0) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, result[0].password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = jwt.sign(
    { email: result[0].email, userId: result[0].insertId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res.status(StatusCodes.OK).json({
    message: "User created successfully.",
    token,
    user: {
      email: result[0].email,
      username: result[0].userName,
    },
  });
};

module.exports = { register, login };
