const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    const sess = req.session;
    if(sess.userid) {
      req.session.destroy(err => {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/signin');
        }
      })
    } else {
      res.redirect('/signin');
    }
  },
};