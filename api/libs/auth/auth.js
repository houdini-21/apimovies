const userController = require('../../controllers/users');
const jwt = require('jsonwebtoken');
const { to } = require('../to/to');

const loginUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Missing data' });
  } else if (!req.body.user || !req.body.password) {
    return res.status(400).json({ message: 'Missing data' });
  }
  // Comprobamos credenciales
  let [err, resp] = await to(
    userController.checkUserCredentials(req.body.user, req.body.password)
  );
  // Si no son validas, error
  if (err || !resp) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Si son validas, generamos un JWT y lo devolvemos
  let user = await userController.getUserIdFromUserName(req.body.user);
  const token = jwt.sign({ userId: user.userId }, process.env.KEY);
  res.status(200).json({ token: token });
};


const createUser = async (req, res) => {
    console.log(req.body)
  if (!req.body) {
    return res.status(400).json({ message: 'Missing data' });
  } else if (!req.body.user || !req.body.password) {
    return res.status(400).json({ message: 'Missing data' });
  }

  let [err, resp] = await to(
    userController.registerUser(req.body.user, req.body.password)
  );

  if (err || !resp) {
    return res.status(401).json({ message: err });
  }

  let user = await userController.getUserIdFromUserName(req.body.user);
  const token = jwt.sign({ userId: user.userId }, process.env.KEY);
    res.status(200).json({ message: "User created!", token: token });
};

exports.loginUser = loginUser;
exports.createUser = createUser;
