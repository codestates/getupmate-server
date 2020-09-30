const { follow } = require('../../models');

/*
1. follow 테이블에서 my_id에 해당하는것을 모두 찾는다.
2. my_id에 해당하는 모든 row의 friend_id를 가져온다.
*/

module.exports = {
  get: async (req, res) => {
    const user_id = req.params.id; // 본인(나)

    await follow.findAll({
      where: {
        my_id: user_id
      }
    }).then(result => {
      res.status(200).json(result);
    }).catch(err => res.sendStatus(404));
  }
}
