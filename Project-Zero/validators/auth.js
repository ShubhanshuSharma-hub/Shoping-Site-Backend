const { BadRequestError } = require("../errors");

const firstNameRegex = /^[a-zA-Z\-]+$/;

const lastNameRegex = /^[a-zA-Z\-]+$/;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userNameRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const countryRegex = /^[a-zA-Z\s]+$/;

const stateRegex = /^[a-zA-Z\-]+$/;

const cityRegex = /^[a-zA-Z\-]+$/;

const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

const phoneNumberRegex =
  /^(\+\d{1,3}\s)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;

// functions
function validateValue(value, regex) {
  return regex.test(value);
}

function validateSignup(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    userName,
    password,
    country,
    state,
    address,
    phoneNumber,
  } = req.body;

  if (!validateValue(firstName, firstNameRegex)) {
    throw new BadRequestError(
      "Invalid firstName, first name can be of Joe Doe, Joe-Doe, Joe_doe."
    );
  }

  if (!validateValue(lastName, lastNameRegex)) {
    throw new BadRequestError(
      "Invalid lastName, first name can be of Joe Doe, Joe-Doe, Joe_doe."
    );
  }

  if (!validateValue(email, emailRegex)) {
    throw new BadRequestError(
      "Invalid email address, the email can be of type john.doe@example.com, jane.doe+1234@gmail.com,user@example.net"
    );
  }

  if (!validateValue(userName, userNameRegex)) {
    throw new BadRequestError(
      "Invalid username, the userName must contain at least lowerCase, at least upperCase, at least special character, at least number - example MyP@ssword123"
    );
  }

  if (!validateValue(password, passwordRegex)) {
    throw new BadRequestError(
      "Invalid password, the password should be in between 6 to 16 characters long, contains at least one number, and at least one special character from the list !@#$%^&*."
    );
  }

  if (!validateValue(country, countryRegex)) {
    throw new BadRequestError(
      "Invalid country, the country name must be of type USA, India, West Indies."
    );
  }

  if (!validateValue(state, stateRegex)) {
    throw new BadRequestError(
      "Invalid state, the state name must be of type West Bengal, example-example, example_example"
    );
  }

  if (!validateValue(contentSecurityPolicy, cityRegex)) {
    throw new BadRequestError(
      "Invalid state, the city name must be of type West Bengal, example-example, example_example"
    );
  }

  if (!validateValue(address, addressRegex)) {
    throw new BadRequestError(
      "Invalid address, address must be string that contains only alphabets (both uppercase and lowercase), numbers, space, comma, period, apostrophe, and hyphen, must be at least three characters long."
    );
  }

  if (!validateValue(phoneNumber, phoneNumberRegex)) {
    throw new BadRequestError(
      "Invalid phone number, phone numbers must be in the format (XXX) XXX-XXXX, XXX-XXX-XXXX, XXX XXX XXXX, or +XX XXX XXX XXXX where X is a digit, must be at least 10 digits long and can be up to 15 digits long if a country code is included."
    );
  }

  console.log("No error in validation");
  next();
}

module.exports = { validateSignup };
