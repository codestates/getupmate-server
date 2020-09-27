const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    
    const { email, password } = req.body;
    const sess = req.session;
    await user
      .findOne({
        where: {
          email: email,
          password: password
        }
      })
      .then(result => {
        if(result === null) {
          res.status(401).send("Unauthorized")
        } else {
          sess.userid = result.id;
          //test --start
          // console.log(req.session);
          /*
          Session {                                                                 │
            ││ index >   cookie:                                                                 │
            ││ index >    { path: '/',                                                           │
            ││ index >      _expires: 2020-09-26T13:12:30.032Z,                                  │
            ││ index >      originalMaxAge: -45803,                                              │
            ││ index >      httpOnly: true },                                                    │
            ││ index >   userid: 13 }      
          */
          sess.save(function () {
            res.status(200).json(result);
          })
          // --end
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
};