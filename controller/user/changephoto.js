const { user } = require('../../models');
const multer  = require('multer');
const upload = multer({ dest: '../uploads/' });
//수정 필요!
module.exports = {
    change: async (req, res) => {
        //multer
        
        console.log("post")
        console.log('req.file : ',req.file)
        console.log('req.file.path : ',req.file.path)
        console.log('upload : ',upload)
        console.log('upload.storage.getFilename : ',upload.storage.getFilename)

        const photo = req.file.originalname;
        const userid = req.params.id;
        await user.update(
            { photo : photo },
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
  };