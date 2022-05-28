const User = require('../models/userModel');
const userValidation = require('../validation/userValidation');

const userController = {
  addUser: async (req, res) => {
    try {
      const { name, firstName, email, birthdate, phone, adresse, password } = req.body;
      const errMsg = userValidation(name, firstName, email, birthdate, phone, adresse, password);
      if(errMsg) return res.status(400).json(errMsg);
        const photo = req.file.filename;
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json('error:' + error);
        const user = await User.create({ name, firstName, email, photo, birthdate, phone, adresse, password });
        return res.status(201).json(user);

    } catch (error) {
      return res.status(400).json('error:' + error);
    }
  },
  getUser: async(req, res) => {
    try {
      const data = await User.find()
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json("error:" + error);
    }
  },
  
}

module.exports = userController;