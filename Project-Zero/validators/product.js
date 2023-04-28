const { body, validationResult } = require("express-validator");
const { BadRequestError } = require("../errors");

const nameRegex = /^[a-zA-Z0-9]+$/;
const productNameRegex = /^[a-zA-Z0-9\s]+$/;
const productDescriptionRegex = /^[a-zA-Z0-9\s.,!?"'-:]+$/i;
const priceRegex = /^(\d+|\d{1,3}(,\d{3})*)(\.\d{1,2})?$/;
const productReviewRegex = /^[a-zA-Z0-9\s,.!?'-]{1,500}$/;
const productDiscountRegex = /^([1-9]|[1-9][0-9]|100)$/;

// Add validation rules using express-validator
const createProductValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("productName").notEmpty().withMessage("Product name is required"),
  body("productDescription")
    .notEmpty()
    .withMessage("Product description is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isDecimal()
    .withMessage("Price must be a decimal"),
  body("productReview").notEmpty().withMessage("Product review is required"),
  body("productDiscount")
    .notEmpty()
    .withMessage("Product discount is required")
    .isDecimal()
    .withMessage("Product discount must be a decimal"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

// function
function validateValue(value, regex) {
  return regex.test(value);
}

function validateProducts(req, res, next) {
  const {
    name,
    productName,
    productDescription,
    price,
    productReview,
    productDiscount,
  } = req.body;

  if (!validateValue(name, nameRegex)) {
    throw new BadRequestError(
      "Invalid name, valid names can be: JohnDoe123, jow_doe92 ,Doe007, Jow-Doe"
    );
  }

  if (!validateValue(productName, productNameRegex)) {
    throw new BadRequestError(
      "Invalid product name, valid product names can be: JohnDoe123, jow_doe92 ,Doe007, Jow-Doe"
    );
  }

  if (!validateValue(productDescription, productDescriptionRegex)) {
    throw new BadRequestError(
      "Invalid product description, valid description can be: this is an example, 12345, hello, world!, I'm a programmer, What's the time now?, This product is priced at $99.99, 1st place"
    );
  }

  if (!validateValue(price, priceRegex)) {
    throw new BadRequestError(
      "Invalid price, valid price values can be: 123, '1,234.56', '1,23' , '456.78', '0.99', '99999999.99', The following strings would not match: '123,456,789', '12.345', '$1,234.56', '-12.34'"
    );
  }

  if (!validateValue(productReview, productReviewRegex)) {
    throw new BadRequestError(
      "Invalid product reviews, valid product reviews value can be: 'The quick brown fox jumps over the lazy dog.', '123 Main Street, Apt #3B', 'It's a beautiful day outside!', 'This product is exactly what I was looking for.', 'I can't believe how fast this item shipped!', 'The price is a bit high for my budget.', 'This book is a must-read for anyone interested in the topic.' "
    );
  }

  if (!validateValue(productDiscount, productDiscountRegex)) {
    throw new BadRequestError("Invalid product discount");
  }

  console.log("No error in validation");
  next();
}

module.exports = { validateProducts, createProductValidationRules, validate };
