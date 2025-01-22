var express = require("express");
var fs = require("fs");
var cookieParser = require("cookie-parser");
const { json } = require("stream/consumers");
const { randomUUID } = require("crypto");
var router = express.Router();
var users = JSON.parse(fs.readFileSync("users.json")).users;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid form submission", code: 400 });
  }
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );
  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid credentials", code: 401 });
  }
  const id = randomUUID();
  user["id"] = id;
  res.cookie("cookie-id", id, {
    maxAge: 900000,
    httpOnly: true,
    secure: true,
  });
  fs.writeFileSync("users.json", `{"users":${JSON.stringify(users)}}`);
  return res.json({ status: "success", message: "Login success" });
});

router.post("/signUp", function (req, res, next) {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid form submission", code: 400 });
  }
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.status(412).json({
      status: "error",
      message: "User with this email already exists",
      code: 412,
    });
  }
  const id = randomUUID();
  const newUser = {
    name,
    email,
    password,
    id: randomUUID(),
  };
  res.cookie("cookie-id", id, {
    maxAge: 900000,
    httpOnly: true,
    secure: true,
  });
  users.push(newUser);
  fs.writeFileSync("users.json", `{"users":${JSON.stringify(users)}}`);
  return res.json({ status: "success", message: "User created successfully" });
});

router.get("/me", function (req, res, next) {
  const id = req.cookies["cookie-id"];
  if (!id) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized", code: 401 });
  }
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized", code: 401 });
  }
  const { name, email } = user;
  return res.json({ status: "success", name: name, email: email });
});

router.post("/forgotPassword", function (req, res, next) {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid form submission", code: 400 });
  }
  const user = users.find((user) => user.email === email);
  if (user) {
    const token = randomUUID();
    user["token"] = token;
    fs.writeFileSync("users.json", `{"users":${JSON.stringify(users)}}`);
    console.log("Token to do the reset password:", token);
  }
  return res.json({
    status: "success",
    message: "Token sent",
  });
});

router.post("/setPassword", function (req, res, next) {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({
      status: "error",
      message: "Invalid form submission or token",
      code: 400,
    });
  }
  const user = users.find((user) => user.token === token);
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Invalid form submission or token",
      code: 400,
    });
  }
  user["password"] = password;
  delete user["token"];
  fs.writeFileSync("users.json", `{"users":${JSON.stringify(users)}}`);
  return res.json({ status: "success", message: "Password updated" });
});

module.exports = router;
