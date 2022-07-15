const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./mock/database.json");
const userdb = JSON.parse(fs.readFileSync("./mock/database.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ username, password }) {
  const isAuthenticated = !!userdb.users.find(
    (user) => user.username === username && user.password === password
  );
  return isAuthenticated;
}

// Register New User
server.post("/api/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;

  if (isAuthenticated({ username, password }) === true) {
    const status = 401;
    const message = "User already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./mock/database.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1]?.id;

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      username: username,
      password: password,
    }); //add some data
    var writeData = fs.writeFile(
      "./mock/users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ username, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/api/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { username, password } = req.body;
  if (isAuthenticated({ username, password }) === false) {
    const status = 401;
    const message = "Incorrect username or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ username, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

//get user info
server.get("/api/user", (req, res) => {
  console.log("user infos");
  console.log(req.body);

  let verifyTokenResult;
  verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

  if (verifyTokenResult instanceof Error) {
    const status = 401;
    const message = "Access token not provided";
    res.status(status).json({ status, message });
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const userInfo = jwt.decode(token);

  const loggedUser = userdb.users.find(
    (user) =>
      user.username === userInfo.username && user.password === userInfo.password
  );

  res.status(200).json({ id: loggedUser?.id, username: loggedUser?.username });
});

//middleware to auth check on all routes except those with /api/auth
server.use(/^(?!\/api\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/:resource/:id": "/:resource/:id",
    "/:resource/:id/:resource": "/:resource/:id/:resource",
  })
);
server.use("/api", router);

server.listen(8000, () => {
  console.log("Running Auth API Server at :8000");
});
