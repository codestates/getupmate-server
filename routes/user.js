const express = require('express');
const router = express.Router();
//add multer
const multer  = require('multer');
const storage = multer.diskStorage({
  destination : function (req, file, cb) {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
      console.log('req.file : ',req.file)
      console.log('req.params : ',req.params);
      cb(null, 'uploads/images')
      //텍스트 파일이면
    } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
      console.log("텍스트 파일이네요")
      cb(null, 'uploads/texts')
    }
  },
  filename: function (req, file, cb) {
    //changed
    cb(null,req.params.id+"-photo.jpeg"); // ex) 13-photo
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
router.post('/changephoto/:id', upload.single('photo') ,ChangePhoto.change);
router.post('/changenickname/:id', ChangeNickname.change);

module.exports = router;
