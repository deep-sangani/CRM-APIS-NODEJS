const Emp = require("./models/emp");
const Query = require("./models/inquiry");
const { createJwt, validateJwt } = require("./utlis");
const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const data = await Emp.create({
    name,
    email,
    password,
  });
  let token = null;
  if (data) {
    token = await createJwt(data);
  }

  res.json({ data, token, message: "Emp created successfully" });
};

const loginController = async (req, res) => {
  const data = await Emp.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (data) {
    const token = await createJwt(data);
    res.status(200).json({ token, message: "login successfully" });
  } else {
    res.status(404).json({
      message: "Invalid credentials",
    });
  }
};
const postQueryController = async (req, res) => {
  const { name, email, interest } = req.body;
  await Query.create({ name, email, interest });
  res.status(200).json({ message: "Query raised successfully" });
};

const QueryController = async (req, res) => {
  const data = await Query.find({ asignEmp: { $eq: null } });
  res.status(200).json({ data, message: "Query fetched successfully" });
};

const claimQueryController = async (req, res) => {
  const data = await Query.findOne({ _id: req.body.id });
  if (data) {
    data.asignEmp = decoded.data._id;
    await data.save();
    res.status(200).json({ message: "Query claimed successfully" });
  } else {
    res.status(404).json({ message: "Query not found" });
  }
};

const assignedQueryController = async (req, res) => {
  const { user } = req.app;
  const data = await Query.find({ asignEmp: user._id }).select("-asignEmp");
  if (data) {
    res.status(200).json({ data, message: "Query fetched successfully" });
  } else {
    res.status(404).json({ message: "Query not found" });
  }
};
module.exports = {
  registerController,
  loginController,
  postQueryController,
  QueryController,
  claimQueryController,
  assignedQueryController,
};
