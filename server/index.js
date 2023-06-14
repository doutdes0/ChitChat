const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((e) => console.log(`Connection failed: ${e.message}`));

app.use('/API/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server's running on port ${PORT}`));
