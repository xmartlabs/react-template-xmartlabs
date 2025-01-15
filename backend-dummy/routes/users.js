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
      .json({ status: "error", message: "Invalid form submission" });
  }
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );
  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid credentials" });
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

module.exports = router;
