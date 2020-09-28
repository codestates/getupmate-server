// const { user } = require('../../models');
const { alarm } = require('../../models');
const { mission } = require('../../models');

//의논 필요!

module.exports = {
    get : async (req,res) => {
        //1. session_id와 동일한 id를 가진 알람을 alarm table에서 모두 가져온다.
        // const session_id = req.session.userid;
        const session_id = req.params.id; // 임의의 userid값으로 test실행
        // console.log('req : ',req);
        await alarm.findAll({
            where : {
                user_id : session_id
            },
            attributes : ['id', 'time', 'updatedAt', 'user_id', 'mission_id']
        }).then(result => {
            res.status(200).json(result);
        }).catch(err => res.sendStatus(404));
    },

    post : async (req,res) => {
        const { time, question } = req.body;
        const session_id = req.params.id; // 임의의 userid값으로 test실행
        // console.log('session_id', session_id)
        // const session_id = req.session.userid;
        // console.log('req.session : ',req.session);
        //1. mission table에서 { mission }과 같은 미션의 id를 알아내서 mission_id에 넣는다.
        const mission_result = await mission.findOne({
            where : {
                question : question
            }
        });

        // console.log('mission_result : ',mission_result);
        //2. user_id도 동일하게 찾아서 넣는다.
        // const user_result = await user.findOne({
        //     where : {
        //         id : session_id
        //     }
        // });
        // console.log('user_result : ',user_result);
        //alarm table에 생성 : 필요한 것 --> mission_id(FK), user_id(FK), time
        await alarm.create({
            time : time,
            mission_id : mission_result.dataValues.id,
            user_id : session_id
        }).then(result => {
            res.status(201).send(result);
        }).catch(err => {
            res.status(404).send(err);
        })
    },

    delete : async (req,res) => {
        const session_id = req.params.id;
        // const session_id = 3; // 임의의 userid값으로 test실행
        const id = req.query.id;
        console.log(req.query.id)
        
        await alarm.destroy({
            where : {
                id : id,
                user_id : session_id
            }
        }).then(result => {
          console.log(result)
            res.status(200).send("successfully deleted")
        }).catch(err => res.status(500).send(err))
    }
}