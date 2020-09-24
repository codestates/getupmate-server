const { user } = require('../../models');

module.exports = {
    change: async (req, res) => {
        console.log('req : ',req);
        const {nickname} = req.body;
        const params = req.params.id;
        const session_id = req.session.userid;
        if(params){
            await user.update(
                { nickname : nickname },
                {
                    where : {
                        id : params
                }
            }).then(result => {
                res.status(200);
                res.json(result);
            })
        }
        else{
            res.status(400);
            res.send("ChangeNickname error");
        }
    }
  };