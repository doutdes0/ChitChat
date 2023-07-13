const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
require('dotenv').config();

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((e) => console.log(`Connection failed: ${e.message}`));

app.use('/API/auth', authRouter);
app.use(verifyJWT);
//protected routes
app.use('/API', userRouter);
app.all('*', (req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server's running on port ${PORT}`));
