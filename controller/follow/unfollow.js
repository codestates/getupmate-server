const { follow } = require('../../models');

/*
1. 친구의 unfollow 버튼을 누르면
2. follow table에서 my_id, friend_id에 해당하는 row를 찾아 제거한다.
*/

module.exports = {
  delete: async (req, res) => {
    const user_id = req.params.id; // 본인(나)
    const id = req.query.id;

    await follow.destroy({
      where: {
        my_id: user_id,
        friend_id: id
      }
    }).then(result => {
      console.log(result)
      res.status(200).send("successfullly unfollowed");
    }).catch(err => res.sendStatus(500).send(err));
  }
}
