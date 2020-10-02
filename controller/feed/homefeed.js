const { feed } = require('../../models');
const { follow } = require('../../models');
const { user } = require('../../models');

//자신의 친구 아이디들을 [2,3,4]처럼 받는다.
async function find_friends_id(my_id){
    let friends_list = [];
    let list = await follow.findAll({
        where : {
            my_id : my_id
        }
    })

    list.forEach(element => {
        friends_list.push(element.dataValues.friend_id);
    })
    //나의 피드도 받기 위해₩
    friends_list.push(my_id);

    console.log('friends_list : ',friends_list);
    return friends_list;
}

//친구들의 아이디에 대응하는 피드들을 obj에 담아 내보낸다.
async function find_friends_feed(friend_id){

    let result = [];

    let feeds_list = await feed.findAll({
        where : {
            user_id : friend_id
        },
        attributes : ['id','text','createdAt']
    }); //[{id, text},{id, text},{id, text},{id, text}]

    let nickname = await user.findOne({
        where: {
            id : friend_id
        }
    })

    console.log('feeds_list : ',feeds_list);
    
    for (let i = 0; i < feeds_list.length; i++) {
        const element = feeds_list[i];
        let obj = {};
        obj.id = element.dataValues.id;
        obj.text = element.dataValues.text;
        obj.time = element.dataValues.createdAt;
        obj.nickname = nickname.nickname;
        obj.photo = `http://www.gijigae.com:3000/upload/${nickname.id}-photo.jpeg`

        result.push(obj);
    }

    return result;
}

async function make_feed_list(friends_list) {
    let result = [];
    for (let i = 0; i < friends_list.length; i++) {
        const element = await find_friends_feed(friends_list[i]);
        result = result.concat(element);
    }
    return result;
}

function quickSort(arr) {
    const len = arr.length;
    if(len === 0) return [];
    
    let left = [];
    let right = [];
    let pivot = arr[0];
    for(let i=1; i<len; i++) {
      if (arr[i].time > pivot.time) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return quickSort(left).concat(pivot, quickSort(right));
  }


module.exports = {
    gethome : async function (req,res) {
        let friends_list = await find_friends_id(req.params.id)
        let feeds_list = await make_feed_list(friends_list);
//         const result = findFollowingIdFeeds(my_following_list);
//         res.status(200).send(result);

        let quickSorted_list = quickSort(feeds_list);
        res.send(quickSorted_list);
    }
}
