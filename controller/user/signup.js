const { user, Sequelize } = require('../../models');
const OP = Sequelize.Op;

module.exports = {

  post: async (req, res) => {
      const { email, nickname, password } = req.body;

    // 이메일이나 닉네임이 동일한 것이 있을 때 에러!
    await user
        .findOne({
            where : {
                nickname : nickname
            }
        })
        .then(result => {
            if(result !== null){
                res.status(409);
                res.send("already exist!")
            }else{
                async function createUser () {
                    await user.create({
                        nickname : nickname,
                        email : email,
                        password : password
                    }).then(result => {
                    res.status(201).json(result);
                    })
                }
                createUser();
            }
        })
        .catch(err => {
            res.status(404).send(err);
        })
  },
};