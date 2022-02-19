const express = require("express");
const {
  registerController,
  loginController,
  postQueryController,
  QueryController,
  claimQueryController,
  assignedQueryController,
} = require("./controller");
const router = express.Router();
const { jwtTokenChecker } = require("./middleware");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/raise-query", postQueryController);
router.get("/all-queries", QueryController);
router.put("/claim-queries", jwtTokenChecker, claimQueryController);
router.get("/queries", jwtTokenChecker, assignedQueryController);
module.exports = router;
