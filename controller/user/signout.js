module.exports = {
  post: async (req, res) => {
    await req.session.destroy(function(){ 
      req.session;
      }); // 세션 삭제
    await res.clearCookie('connect.sid') // 세션 쿠키 삭제
    await res.send({"messsage" : "succesfully logout!"});
  },
};