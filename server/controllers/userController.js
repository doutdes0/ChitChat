const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const unExists = await User.findOne({ username });
    if (unExists) return res.status(401).json({ msg: 'Username is taken' });
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(401).json({ msg: 'User with this email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ msg: 'Incorrect username or password' });
    const isPwValid = await bcrypt.compare(password, user.password);
    if (!isPwValid) return res.status(401).json({ msg: 'Incorrect username or password' });

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s',
    });
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });
    await User.updateOne({ username }, { refreshToken });
    user._id = user._id.toString();
    user.accessToken = accessToken;
    delete user.password;
    delete user.email;
    delete user.isAvatarSet;
    delete user.refreshToken;
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
};

module.exports = { signup, login };
