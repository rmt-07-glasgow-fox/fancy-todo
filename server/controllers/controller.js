class Controller {
  static async landing(req,res){
    await res.send({message: 'Risuto DB OK!'});
  };
};

module.exports = Controller;