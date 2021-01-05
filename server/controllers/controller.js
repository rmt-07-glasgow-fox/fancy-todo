class Controller {
  static async landing(req,res){
    await res.send('OK!');
  };
};

module.exports = Controller;