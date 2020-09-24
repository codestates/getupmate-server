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
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};
