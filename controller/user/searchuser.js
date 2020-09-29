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
                    {nickname :{[OP.like] : `%chaeryn%`}}, 
                    {email : {[OP.like] : `%${data}%`}}
                ]
            }
        })
        // console.log(userList[0].dataValues)
        delete userList[0].dataValues.password
        delete userList[0].dataValues.createdAt
        delete userList[0].dataValues.updatedAt
        console.log(userList[0].dataValues)

        if(userList !== null){
            res.status(200);
            res.send(userList[0].dataValues);
        }else{
            res.status(404);
            res.send("no user");
        }
    }
};