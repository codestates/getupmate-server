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
                    {nickname :{[OP.like] : `%chae%`}}, 
                    {email : {[OP.like] : `%${data}%`}}
                ]
            }
        })
        // console.log(userList[0].dataValues)

        let result = [];
        userList.forEach(element => {
            delete element.dataValues.password
            delete element.dataValues.createdAt
            delete element.dataValues.updatedAt
            element.photo = `http://www.gijigae.com:3000/upload/${element.dataValues.id}-photo.jpeg`
            result.push(element);
        })
        

        if(userList !== null){
            res.status(200);
            res.send(result);
        }else{
            res.status(404);
            res.send("no user");
        }
    }
};
