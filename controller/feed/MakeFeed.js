const { feed } = require('../../models');

module.exports = {
    makeFeed : async function (req,res) {
        const user_id = req.params.id; //개인 확인 필요
        const text = req.body.text;
        
        //2. feed table에 저장을 한다.

        await feed.create({
            text : text,
            user_id : user_id
        }).then(() => {
            console.log('make feed!');
        }).catch(err => {
            console.error(err);
        })

        //3. socket.io로 HomeFeed에 올라가도록 한다.
    }
}