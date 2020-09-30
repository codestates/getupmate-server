const { alarm } = require('../../models');
const { mission } = require('../../models');

/*
알람 해제 버튼을 누르면 "해당 유저" + "해당 알람의 미션"이 호출된다.
1. user_id와 alarm id에 해당하는 mission아이디를 mission table 에서 문제/답 가져오기
*/

module.exports = {
  get: async (req, res) => {
    const user_id = req.params.id;
    const id = req.query.id;

    const mission_id = await alarm.findOne({
      where: {
        user_id: user_id,
        id: id
      },
      attributes : ['id', 'time', 'updatedAt', 'user_id', 'mission_id']
    })
    console.log("mission_id", mission_id)

    await mission.findOne({
      where: {
        id: mission_id.dataValues.mission_id
      }
    })
    .then(result => {
      console.log("result", result)
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }
}