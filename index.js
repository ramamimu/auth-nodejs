const cors = require("cors");
const express = require("express");
const session = require("express-session");
const Bcrypt = require("bcrypt");
const Port = 4444;

const App = express();

const user = {
  username: "admin",
  password: "minad",
};

App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(
  session({
    secret: "secret-key",
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
  })
);

App.get("/", (req, res) => {
  res.send("Hello World");
});

App.get("/api/", (req, res) => {
  res.send("Hello API");
});

App.post("/api/login/", (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && compareHash(user.password, password)) {
    req.session.user = user;
    res.send("Login Successful");
  } else {
    res.send("Login Failed");
  }
});

App.get("/api/logout/", (req, res) => {
  req.session.destroy();
  res.send("Logout Successful");
});

App.get("/api/secret/", (req, res) => {
  console.log("secret: ", req.session.user);
  if (req.session.user) {
    res.send("The secret is: 42");
  } else {
    res.send("Unauthorized");
  }
});

App.listen(Port, () => {
  console.log("Server running on", Port);
});

const getHash = (password) => {
  return Bcrypt.hashSync(password, 10);
};

const compareHash = (password, hash) => {
  return Bcrypt.compareSync(password, hash);
};
