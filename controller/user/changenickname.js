const { user } = require('../../models');

module.exports = {
<<<<<<< HEAD
  post: async (req, res) => {
    const userid = req.params.id;
    const { nickname } = req.body;
    await user
      .update({
        nickname: nickname,
      },{
        where: {
          id: userid
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};
=======
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
>>>>>>> 0b321e5bd4a9e73759d0769a67168b7c93a88d2f
