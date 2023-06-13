const bcrypt = require('bcrypt');
const User = require('../model/userModel');

const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const unExists = await User.findOne({ username });
    if (unExists) return res.status(401).json({ msg: 'Username is taken' });
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(401).json({ msg: 'User with this email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return res.status(200).send();
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: 'Incorrect username or password', status: 401 });
    const isPwValid = await bcrypt.compare(password, user.password);
    if (!isPwValid) return res.json({ msg: 'Incorrect username or password', status: 401 });
    delete user.password;
    return res.json({ user, status: 200 });
  } catch (e) {
    next(e);
  }
};

module.exports = { signup, login };
