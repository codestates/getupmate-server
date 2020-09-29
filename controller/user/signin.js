const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    
    const { email, password } = req.body;
    const sess = req.session;
    await user
      .findOne({
        where: {
          email: email,
          password: password
        }
      })
      .then(result => {
        console.log('result : ',result.dataValues);
        if(result === null) {
          res.status(401).send("Unauthorized")
        } else {
          sess.userid = result.id;
          sess.save(function () {
            res.status(200).json({
              "id": result.id,
              "nickname": result.nickname,
              "password": result.password,
              "email": result.email,
              "createdAt": result.createdAt,
              "updatedAt": result.updatedAt
            });
          })
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
};