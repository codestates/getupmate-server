const { user } = require('../../models');

//수정 필요!

module.exports = {
    change: async (req, res) => {
        const getPhoto = req.body;
        const params = req.params.id;
        const session_id = req.session.userid;
        if(params){
            await user.update(
                { photo : getPhoto },
                {
                    where : {
                        id : params
                }
            }).then(result => {
                res.status(200);
                res.send(result);
            })
        }
        else{
            res.status(400);
            res.send("ChangePhoto error");
        }
    }
  };