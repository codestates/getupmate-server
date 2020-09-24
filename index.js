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
<<<<<<< HEAD
    secret: "getupmate",
    resave: false,
    saveUninitialized: true,
  })
);
=======
    secret : "getupmate",
    resave : false,
    saveUninitialized : true,
  })
)
>>>>>>> 0b321e5bd4a9e73759d0769a67168b7c93a88d2f
dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter);
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;