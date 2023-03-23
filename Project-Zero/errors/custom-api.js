class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;

// class CustomAPIError extends Error {
//   constructor(message) {
//     super(message)
//   }
// }

// module.exports = CustomAPIError
