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
    const user = await User.findOne({ username }).lean();
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
    delete user.isAvatarSet;
    delete user.refreshToken;
    delete user.__v;
    res
      .cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user });
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    // console.log('refreshToken contr: ', req.headers);
    const cookies = req.cookies;
    // console.log('refreshC: logging cookie: ', cookies.jwt);
    if (!cookies.jwt) return res.status(401).json({ msg: 'No refresh token cookie' });
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (!user) res.status(401).json({ msg: 'User with this refresh token not found' });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || user.username !== decoded.username) {
        return res.status(401).json({ msg: 'Invalid token(belongs to another user)' });
      }
      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '30s',
        }
      );
      res.status(200).json({ accessToken });
    });
  } catch (e) {
    next(e);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const avatar = req.body.avatar;
    await User.findOneAndUpdate({ _id }, { avatar });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const username = req.user;
    const list = await User.find({ username: { $ne: username } }).select('avatar username _id');
    return res.status(200).json({ list });
  } catch (e) {
    next(e);
  }
};
module.exports = { signup, login, refreshToken, setAvatar, getAllUsers };
