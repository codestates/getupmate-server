const { user } = require('../../models');

module.exports = {
    login : async function (req,res) {
        console.log('Profile : ',req.body);
        //얘만 하면 된다.
        const session = req.session;
        const User = await user.findOne({
            where : {
                email : req.body.email
            }
        })

        if(User === null){
            const newUser = await user.create({
                email : req.body.email,
                photo : req.body.photo,
                nickname : req.body.name
            })
            console.log(
                'newUser : ', newUser
            )
            session.userid = newUser.dataValues.id;
            session.nickname = newUser.dataValues.nickname;
            session.email = newUser.dataValues.email;
            session.save(function () {
                res.status(200).json({
                  "id": newUser.dataValues.id,
                  "nickname": newUser.dataValues.nickname,
                  "email": newUser.dataValues.email,
                });
            })
        }
        else{
            console.log(
                'User : ', User
            )
            session.userid = User.dataValues.id;
            session.nickname = User.dataValues.nickname;
            session.email = User.dataValues.email;
            session.save(function () {
                res.status(200).json({
                  "id": User.dataValues.id,
                  "nickname": User.dataValues.nickname,
                  "email": User.dataValues.email,
                  "photo": User.photo
                });
            })
        }
    }
}