const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    const session = req.session;
    console.log('req.session : ', session);

    let User = await user.findOne({
      where: {
        email: email,
        password: password
      }
    });
    if(User === null){
      res.status(401).send("Unauthorized")
    }else{
      console.log('User : ',typeof User.dataValues);
      session.userid = User.dataValues.id;
      session.nickname = User.dataValues.nickname;
      session.email = User.dataValues.email;
      session.save(function () {
        res.status(200).json({
          "id": User.dataValues.id,
          "nickname": User.dataValues.nickname,
          "email": User.dataValues.email,
        });
      })
    }
  },
};
