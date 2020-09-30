const { feed } = require('../../models');

//내 피드를 전체 가져오는 것
module.exports = {
    getMyFeed : async function (req,res) {
        const myFeedList = await feed.findAll({
            where : {
                user_id : req.params.id
            },
            order : [
                ['createdAt', 'DESC']
            ]
        })

        if(myFeedList.length < 1){
            res.status(200).send('no Feed');
        }else{
            res.status(200).send(myFeedList);
        }
    }
}