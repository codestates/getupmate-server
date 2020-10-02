const { user } = require("../../models");

module.exports = {
    login : async function name(req,res) {
        console.log('req : ',req);
        // 유저 존재시
        const User = await user.findOne({
            where : {
                id : req.cookies.userid
            }
        })
        if(User){
            req.session.id = User.id;
            req.session.email = User.email;
            req.session.photo = `http://www.gijigae.com:3000/upload/${User.id}-photo.jpeg`;
            req.session.save(() => {
                res.status(200).send({
                    "id" : User.id,
                    "email" : User.email,
                    "nickname" : User.nickname,
                    "photo" : `http://www.gijigae.com:3000/upload/${User.id}-photo.jpeg`
                })
            })
        }else{
            //
            console.log('new User : ',req);
        }
    }
}