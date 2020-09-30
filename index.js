const express = require('express');
const express_session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const missionRouter = require('./routes/mission');
const userRouter = require('./routes/user');
const feedRouter = require('./routes/feed');
const passport = require("passport");
const passportConfig = require("./controller/user/passport.js");
const alarmRouter = require('./routes/alarm');

//test session sustain
const mysqlStore = require('express-mysql-session')(express_session);
const options = {
  host : 'get-up-mate.cngyocisb343.ap-northeast-2.rds.amazonaws.com',
  port : 3322,
  user : 'admin',
  password : 'getupmate1',
  database : 'getupmate'
};
const sessionStorage = new mysqlStore(options);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors( { origin : '*' } ));
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
app.use(passport.initialize());
app.use('/mission', missionRouter);
app.use('/user', userRouter);
app.use('/alarm', alarmRouter);
app.use('/feed', feedRouter);
app.use("/auth", require("./routes/user"));
app.use('/upload', express.static(__dirname+'/uploads/images'));
app.use('/img', express.static(__dirname+'/uploads/images'));
// app.use(passport.express_session());
passportConfig();
dotenv.config();

// 구글 로그인 테스트를 위한 index.html 랜더링(client에서 버튼 만들어지면 없앨 예정)
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// app.get('/',function(req,res){
//   res.render('index.html');
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
})
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app;
