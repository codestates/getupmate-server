const express = require('express');
const router = express.Router();
const passport = require("passport");
//add multer
const multer  = require('multer');
const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      console.log(req.file)
      cb(null, 'uploads/images')
      //텍스트 파일이면
    } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
      console.log("텍스트 파일이네요")
      cb(null, 'uploads/texts')
    }
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname) //  Date.now() + "-" + file.originalname --> file.originalname
  }
})
const upload = multer({ storage: storage });

//add controller
const Signin = require('../controller/user/signin');
const Signout = require('../controller/user/signout');
const Signup = require('../controller/user/signup');
const SearchUser = require('../controller/user/searchuser');
const ChangePhoto = require('../controller/user/changephoto');
const ChangeNickname = require('../controller/user/changenickname');

router.post('/signin', Signin.post);
router.post('/signup', Signup.post);
router.post('/signout', Signout.post);
router.post('/searchuser', SearchUser.search);
router.post('/changephoto/:id', upload.single('file') ,ChangePhoto.change);
router.post('/changenickname/:id', ChangeNickname.change);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/signin" }),
  async (req, res) => {
    res.redirect("/mypage");
  }
);

module.exports = router;