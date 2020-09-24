const { user, Sequelize } = require('../../models');
const OP = Sequelize.Op;

module.exports = {
  post: async (req, res) => {
    let new_nickname = req.body.nickname;
    let new_email = req.body.email;
    let new_passowrd = req.body.email;

    // 이메일이나 닉네임이 동일한 것이 있을 때 에러!
    await user.findOne({
        where : {
            [OP.or] : [{nickname : new_nickname}, {email : new_email}]
        }
    }).then(result => {
        if(result !== null){
            res.status(409);
            res.send("already exist!")
        }else{
            user.create({
                nickname : new_nickname,
                email : new_email,
                password : new_passowrd
            }).then(result => {
                res.status(201);
                res.send(result.dataValues);
            })
        }
    }).catch(err => {
        res.status(404).send(err);
    })
  },
};