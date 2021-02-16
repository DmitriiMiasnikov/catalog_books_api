const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const usersRoutes = require('./routes/usersRoutes');
const listRoutes = require('./routes/listRoutes');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }))
app.use(cors());
app.options('*', cors());
app.use('/users', usersRoutes);
app.use('/list', listRoutes);

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })

    app.listen(process.env.PORT || config.get('port'), () => {
      console.log('server started...')
    })
  } catch (e) {
    console.log(e);
  }
}
start();