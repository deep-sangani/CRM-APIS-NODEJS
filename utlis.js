const jwt = require("jsonwebtoken");

const createJwt = async (data) => {
  try {
    const token = await jwt.sign(
      {
        data,
      },
      "thisismycrmsecretkey",
      { expiresIn: 60 * 60 }
    );
    return token;
  } catch (error) {
    console.log(error);
  }
};

const validateJwt = async (token) => {
  try {
    const data = await jwt.verify(token, "thisismycrmsecretkey");
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createJwt, validateJwt };
