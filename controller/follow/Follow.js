// const { follow } = require('../../models');

/*
follow버튼을 누르면 친구의 id가 follow 테이블의 following_id에 추가 된다.
1. 닉네임으로 친구 검색
2. 해당 닉네임을 가진 user 찾기
3. 그 user의 id(pk)를 
*/

// const follow = require("../../models/follow");

// module.exports = {
//   post: async (req, res) => {
//     const user_id = req.params.id; // 본인(나)
//     const id = req.query.id; // 친구 아이디(너)

//     await follow.create({
//       my_id: id, // 나
//       friend_id: user_id // 너
//     })
//   }
// }