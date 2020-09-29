//Server Setting
const express = require('express');
const express_session = require('express-session');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.SERVER_PORT || 4000;

//Enviroment Setting
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors( { origin : '*' } ));

//Passport - Social Login
const passport = require("passport");
const passportConfig = require("./controller/user/passport.js");
passportConfig();
app.use(passport.initialize());
app.use("/auth", require("./routes/user"));

//Router
const userRouter = require('./routes/user');
const alarmRouter = require('./routes/alarm');
const feedRouter = require('./routes/feed');
app.use('/upload', express.static(__dirname+'/uploads/images'));
app.use('/user', userRouter);
app.use('/alarm', alarmRouter);
app.use('/feed', feedRouter);

//session storage
const mysqlStore = require('express-mysql-session')(express_session);
const options = {
  host : 'get-up-mate.cngyocisb343.ap-northeast-2.rds.amazonaws.com',
  port : 3322,
  user : 'admin',
  password : 'getupmate1',
  database : 'getupmate'
};
const sessionStorage = new mysqlStore(options);
app.use(
  express_session({
    secret: "getupmate",
    resave: false,
    saveUninitialized: true,
    //testing --start
    store: sessionStorage,
    cookie: {
      domain : 'http://get-up-mate.s3-website.ap-northeast-2.amazonaws.com/',
      expires : new Date(Date.now() + (20000)),
      // secure : true
    }
    // --end
  })
);

//io execute
io.on('connection', (socket) => {
  console.log('user connect socket.io');
  socket.on('init', (msg) => {
    console.log('init!',msg);
  })
  socket.on('feed message', (feed) => {
    io.emit('feed message', feed);
  })
  socket.on('welcome', (msg) => {
    console.log(msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

//Home
app.get('/', (req, res) => {
  res.send('Hello World!')
})
  
//Server port listen
http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app;
