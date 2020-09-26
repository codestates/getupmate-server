const { user } = require('../../models');
//수정 필요!
module.exports = {
    change: async (req, res) => {
        const getPhoto = req.body;
        const userid = req.params.id;
        if(userid){
            await user.update(
                { photo : getPhoto },
                {
                    where : {
                        id : userid
                    }
                }).then(() => {
                async function findUser () {
                    await user.findOne({
                      where : {
                        id : userid,
                      }
                    }).then(data => {
                      res.status(200).json(data)
                    })
                }
                findUser();
            })
            .catch(err => {
                res.status(400).send(err);
            });
        }
        else{
            res.status(400);
            res.send("ChangePhoto error");
        }
    }
  };