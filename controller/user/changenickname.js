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
<<<<<<< HEAD
      .then(() => {
=======
      .then(result => {
        console.log(result)
>>>>>>> 25861d2b780d36593457bb054a14222a478c3e6b
        async function findUser () {
          await user.findOne({
            where : {
              id : userid,
              nickname : nickname
            }
          }).then(data => {
<<<<<<< HEAD
=======
            console.log(data)
>>>>>>> 25861d2b780d36593457bb054a14222a478c3e6b
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