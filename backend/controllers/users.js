const User = require('../models/userModel');

const userController = {
  addUser: async (req, res) => {
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const photo = req.file.filename;

    const newUserData = {
      name,
      birthdate,
      photo
    }
    const newUser = new User(newUserData);

    newUser.save()
      .then(() => res.json('User Added'))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  getUser: async(req, res) => {
    try {
      const data = await User.find()
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).json("error:" + error);
    }
  }
}

module.exports = userController;