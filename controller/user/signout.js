const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const sess = req.session;
    if(sess.userid) {
      req.session.destroy(err => {
        console.log(err)
      })
    }
  },
};