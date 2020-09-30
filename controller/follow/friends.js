const { follow } = require('../../models');
const { user } = require('../../models');

/*
1. follow 테이블에서 my_id에 해당하는것을 모두 찾는다.
2. my_id에 해당하는 모든 row의 friend_id를 가져온다.
*/
async function friends_id(my_id){
  const friends_list= [];
  const friends = await follow.findAll({
    where: {
      my_id: my_id
    }
  })

  friends.forEach(friend => {
    friends_list.push(friend.dataValues.friend_id)
  })

  console.log("friends_list", friends_list)
  return friends_list;
}

async function friends_info(friend_id){
  const result = [];
  const friends_info_list = await user.findAll({
    where: {
      id: friend_id
    }
  })

  for(let el of friends_info_list) {
    let obj = {};
    obj.id = el.dataValues.id;
    obj.nickname = el.dataValues.nickname;
    obj.email = el.dataValues.email;
    obj.photo = el.dataValues.photo;

    result.push(obj);
  }
  return result;
}

async function make_friends_list(friends_list) {
  let result = [];
  for(let el of friends_list) {
    result = result.concat(await friends_info(el));
  }
  return result;
}

module.exports = {
  get: async (req, res) => {
    const friends_list = await friends_id(req.params.id)
    const friends_info_list = await friends_info(friends_list);
    res.status(200).send(friends_info_list);
    // const user_id = req.params.id; // 본인(나)

    // const friends = await follow.findAll({
    //   where: {
    //     my_id: user_id
    //   }
    // })

    // friends.forEach(friend => {
    //   user.findOne({
    //     where: {
    //       id: friend.dataValues.friend_id
    //     }
    //   }).then(result => {
    //     res.status(200).json(result);
    //   }).catch(err => res.status(404).send(err));
    // })
  }
}