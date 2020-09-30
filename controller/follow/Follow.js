const { follow } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const user_id = req.params.id; // 본인(나)
    const id = req.query.id; // 친구 아이디(너)

    await follow.create({
      my_id: user_id, // 나
      friend_id: id // 너
    }).then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.status(500).send(err);
  })
  }
}