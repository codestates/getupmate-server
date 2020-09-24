const express = require('express');
const express_session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const userRouter = require('./routes/user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(
  express_session({
    secret : "getupmate",
    resave : false,
    saveUninitialized : true,
  })
)
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter);
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;