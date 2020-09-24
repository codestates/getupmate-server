const { user, Sequelize } = require('../../models');
const OP = Sequelize.Op;

module.exports = {
    search : async (req, res) => {
        let data = req.body.data;

        //session ---> 보류

        //해당되는 이메일 혹은 닉네임을 찾아 검색 ---> 포함되면 나오게하도록
        const userList = await user.findAll({
            where : {
                [OP.or] : [
                    {nickname :{[OP.like] : `%${data}%`}}, 
                    {email : {[OP.like] : `%${data}%`}}
                ]
            }
        })

        if(userList !== null){
            res.status(200);
            res.send(userList);
        }else{
            res.status(404);
            res.send("no user");
        }
    }
};