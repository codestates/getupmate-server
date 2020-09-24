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
          res.status(200).json({ id: result.id });
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
};