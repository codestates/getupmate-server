const { feed } = require('../../models');

module.exports = {
    getMyFeed : async function (req,res) {
        let myFeeds = await feed.findAll({
            where : {
                user_id : req.params.id
            },
            //최신순을 가장 위로 정렬
            order : [
                ['createdAt', 'DESC']
            ]
        })
        if(myFeeds.length < 1){
            res.status(200).send("no Feed");
        }else{
            res.status(200).json(myFeeds);
        }
    }
}