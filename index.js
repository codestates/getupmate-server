const express = require('express');
const express_session = require('express-session');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

//.gitignore 다시 한번 보기

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})