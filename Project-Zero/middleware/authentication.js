const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findById(payload.userId);
    // if (!user) {
    //   throw new UnauthenticatedError("Authentication invalid");
    // }
    // if (payload.userId !== user._id.toString()) {
    //   throw new UnauthenticatedError("Authentication invalid");
    // }

    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Error Authentication invalid");
  }
};

module.exports = auth;

// jwt.verify: what is this: const payload = jwt.verify(token, process.env.JWT_SECRET); and how it is able to verify our token does it have the access to our token?

// The jwt.verify() function is used to verify the authenticity of the provided JWT token. It takes two arguments: the token to verify and the secret key used to sign the token. In this case, the secret key is retrieved from the process.env.JWT_SECRET environment variable.

// The payload variable will contain the decoded data from the token if it is successfully verified. The decoded data typically includes the user's ID and any other relevant user data that was added when the token was created.

// The jwt.verify() function does not have access to the token itself. Instead, it uses the secret key to verify the token's signature, which ensures that the token has not been tampered with. If the token's signature is valid, the function returns the decoded payload. If the signature is invalid or the token has expired, an error is thrown.

// The JWT token is signed using a secret key that is known only to the server. When a client sends a token in the authorization header of a request, the server retrieves the secret key from the process.env.JWT_SECRET environment variable and uses it to verify the token's signature.

// To verify the token, the server decodes the token's header and payload, and then generates a hash using the algorithm specified in the header and the secret key. The server then compares this hash to the one contained in the signature portion of the token. If the two hashes match, then the server can be confident that the token has not been tampered with and that the data contained in the payload is authentic.

// If the token is invalid, for example, if it has been tampered with or has expired, then the jwt.verify() function will throw an error. The server can then catch this error and handle it appropriately, such as by returning an HTTP 401 Unauthorized response to the client.
