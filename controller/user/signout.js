const { user } = require('../../models');

module.exports = {
  post: async (req, res) => {
    req.session.destory() // 세션 삭제
    res.clearCookie('connect.sid') // 세션 쿠키 삭제
  },
};