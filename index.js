const express = require('express');
const express_session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const userRouter = require('./routes/user');
const passport = require("passport");
const passportConfig = require("./controller/user/passport.js");
const alarmRouter = require('./routes/alarm');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(
  express_session({
    secret: "getupmate",
    resave: false,
    saveUninitialized: true,
  })
  );
app.use(passport.initialize());
app.use('/user', userRouter);
app.use("/auth", require("./routes/user"));
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

app.get("/signin", async (req, res) => {
  return res.status(200).send(`Login Page!`);
});

app.use('/alarm', alarmRouter);
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = app;