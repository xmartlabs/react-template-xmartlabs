var express = require("express");
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submission" });
  }
  fs.readFile("users.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
    } else {
      const users = data.split("\n");
      const info = users.map((user) => {
        return user.split(",");
      });
      const valid = info.some((user) => {
        return user[0] === email && user[1] === password;
      });
      if (!valid) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid credentials" });
      }
      return res.json({ status: "success", message: "Login success" });
    }
  }); //remove later
});

module.exports = router;
