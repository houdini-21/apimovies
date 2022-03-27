const uuid = require('uuid');
const crypt = require('../libs/crypt/crypt');
const UserModel = require('../models/UserModel');
const { to } = require('../libs/to/to');

const cleanUpUsers = () => {
  return new Promise(async (resolve, reject) => {
    await UserModel.deleteMany({}).exec();
    resolve();
  });
};

const registerUser = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    UserModel.find({
      username: userName,
    }).then((user) => {
      if (user.length > 0) {
        return reject('Username already in use');
      } else {
        let hashedPwd = crypt.hashPasswordSync(password);
        // Guardar en la base de datos nuestro usuario
        let userId = uuid.v4();
        let newUser = new UserModel({
          userId: userId,
          userName: userName,
          password: hashedPwd,
        });
        newUser.save();
      }
      resolve(resolve);
    });
  });
};

const getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(UserModel.findOne({ userId: userId }).exec());
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

const getUserIdFromUserName = (userName) => {
  return new Promise(async (resolve, reject) => {
    let [err, result] = await to(
      UserModel.findOne({ userName: userName }).exec()
    );
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
};

const checkUserCredentials = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(getUserIdFromUserName(userName));
    if (!err || user) {
      crypt.comparePassword(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else {
      reject(err);
    }
  });
};
exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;
