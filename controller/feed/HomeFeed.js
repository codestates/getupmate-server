const { feed } = require('../../models');
const { follow } = require('../../models');

async function findFollowingIdFeeds(user_info_list) {
    let result = [];
    user_info_list.forEach(element => {
        
        const feed_list = await feed.findAll({
            where : {
                user_id : element.following_id
            }
        })

        result.concat(feed_list);
    })

    return result;
}

module.exports = {
    getHome : function (req,res) {
        
        const my_id = req.params.id;

        const my_following_list = await follow.findAll({
            where : {
                followed_id : my_id
            }
        })
        const result = findFollowingIdFeeds(my_following_list);
        res.status(200).send(result);
    }
}