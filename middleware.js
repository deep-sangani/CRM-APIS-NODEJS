const { validateJwt } = require("./utlis");
const { JsonWebTokenError } = require("jsonwebtoken");

const jwtTokenChecker = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = await validateJwt(token);
    if (decoded) {
      req.app.user = decoded.data;
      next();
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "jwt expired" });
    }
    return res.status(502).json({ error: "something want wrong" });
  }
};

module.exports = { jwtTokenChecker };
