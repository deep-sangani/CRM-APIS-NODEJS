const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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

const createHashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashpassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return { salt, hashpassword };
};

const checkHashPass = (salt, password) => {
  const hashpassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hashpassword;
};
module.exports = { createJwt, validateJwt, createHashPassword, checkHashPass };
