const express = require("express");
const router = express.Router();

const {
  validateSignup: authValidatorMiddleware,
} = require("../validators/auth");

const { login, register } = require("../controllers/auth");

router.route("/register").post(authValidatorMiddleware, register);
router.route("/login").post(login);

module.exports = router;
