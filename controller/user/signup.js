const { user, Sequelize } = require('../../models');
const OP = Sequelize.Op;

module.exports = {
  post: async (req, res) => {
    let new_nickname = req.body.nickname;
    let new_email = req.body.email;
    let new_passowrd = req.body.email;

    // 이메일이나 닉네임이 동일한 것이 있을 때 에러!
    const newUser = await user.findOne({
        where : {
            [OP.or] : [{nickname : new_nickname}, {email : new_email}]
        }
    })
    
    if(newUser !== null){
        // 닉네임, 이메일 분기 필요!
        res.status(409);
        res.send("already exist!")
    }else{
        await user.create({
            nickname : new_nickname,
            email : new_email,
            password : new_passowrd
        }).then(result => {
            res.status(201);
            res.send(result.dataValues);
        })
    }

  },
};