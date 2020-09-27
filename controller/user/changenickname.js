const { user } = require('../../models');
module.exports = {
  change: async (req, res) => {
    const userid = req.params.id;
    const { nickname } = req.body;
    await user
      .update({
        nickname: nickname,
      },{
        where: {
          id: userid
        }
      })
      .then(result => {
        console.log(result)
        async function findUser () {
          await user.findOne({
            where : {
              id : userid,
              nickname : nickname
            }
          }).then(data => {
            console.log(data)
            res.status(200).json(data)
          })
        }
        findUser();
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};