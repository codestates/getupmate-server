const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const port = process.env.SERVER_PORT || 3000;
const missionRouter = require('./routes/mission');
const userRouter = require('./routes/user');
const feedRouter = require('./routes/feed');
const alarmRouter = require('./routes/alarm');
const followRouter = require('./routes/follow')


//test google
const { google } = require('googleapis');
var googleClient = require('../im22project5-server/config/google.json');
 
const googleConfig = {
  clientId: googleClient.web.client_id,
  clientSecret: googleClient.web.client_secret,
  redirect: googleClient.web.redirect_uris[0]
};
 
const oauth2Client =new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

const url = oauth2Client.generateAuthUrl({
  access_type:'offline',  
  scope: 'https://www.googleapis.com/auth/plus.me'
});
 
function getGooglePlusApi(auth) {
  return google.plus({ version:'v1', auth });
}

async function googleLogin(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  oauth2Client.on('tokens', (token) => {
    if(tokens.refresh_token){
      console.log("리프레시 토큰 :", tokens.refresh_token);
    }
    console.log("액세스 토큰:", tokens.access_token);
  });
  const plus = getGooglePlusApi(oauth2Client);
  const res = await plus.people.get({ userId:'me' });
  console.log(`Hello ${res.data.displayName}! ${res.data.id}`);
  return res.data.displayName;
}

app.get('/login',function (req, res) {
  res.redirect(url);
});
 
app.get("/auth/google/callback", async function (req, res) {
 
  const displayName = await googleLogin(req.query.code);
  console.log(displayName);
 
  res.redirect("http://get-up-mate.s3-website.ap-northeast-2.amazonaws.com");
});


//test session sustain
const mysqlStore = require('express-mysql-session')(session);
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
  session({
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
app.use('/follow', followRouter);
app.use('/mission', missionRouter);
app.use('/user', userRouter);
app.use('/alarm', alarmRouter);
app.use('/feed', feedRouter);
// app.use("/auth", require("./routes/user"));
app.use('/upload', express.static(__dirname+'/uploads/images'));
app.use('/img', express.static(__dirname+'/uploads/images'));
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
