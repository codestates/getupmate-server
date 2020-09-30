const { user } = require('../../models');

//수정 필요!
module.exports = {
    change: async (req, res) => {

        const photo = req.file.originalname;
        const userid = req.params.id;
        await user.update(
            { photo : photo },
            {
                where : {
                    id : userid
                }
            }).then(() => {
            req.session.photo = `http://www.gijigae.com:3000/upload/${nickname.id}-photo.jpeg`;
            req.session.save(() => {
                res.redirect('http://get-up-mate.s3-website.ap-northeast-2.amazonaws.com/mypage')
            })
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }
  };