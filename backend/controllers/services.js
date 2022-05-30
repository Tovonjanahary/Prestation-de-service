// const router = require('express').Router();
const Service = require('../models/serviceModel');
const User = require('../models/userModel');
const serviceValidation = require('../validation/serviceValidation');

// //Get one Service by Categorie
// router.route('/categorie/:cat').get((req, res) => {
//     Service.find({"sous_categorie":req.params.cat})
//         .then((service) => res.json(service))
//         .catch(err => res.status(400).json('Error: '+err));
// });

// //Delete
// router.route('/:id').delete((req, res) => {
//     Service.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Service deleted'))
//         .catch(err => res.status(400).json('Error: '+err));
// });

// //Update
// router.route('/update/:id').post(upload.single('image'), (req, res) => {
//     Service.findById(req.params.id)
//         .then((service) => {
//             service.title = req.body.title;
//             service.categorie = req.body.categorie;
//             service.sous_categorie = req.body.sous_categorie;
//             service.image = req.file.filename;
//             service.description = req.body.description;
//             service.site_web = req.body.site_web;
//             service.phone = req.body.phone;
//             service.ville = req.body.ville;
//             service.adresse = req.body.adresse;
//             service.email = req.body.email;

//             service.save().then(() => {
//                 console.log('hey updated')
//             }).catch((err) => {
//                 console.log(err)
//             })
//         })
//         .catch(err => res.status(400).json('Error: '+err));
// }); 

const service = {
  getService: async (req, res) => {
    try {
      const service = await Service.find();
      return res.status(200).json(service);
    } catch (error) {
      return res.status(404).json({ error: "donnees introuvable" })
    }
  },
  getSingleService: async (req, res) => {
    try {
      let id = req.params.id;
      const service = await Service.findById(id).populate('user');
      return res.status(200).json(service);
    } catch (error) {
      return res.status(404).json({ error: "donnees introuvable" })
    }
  },
  addService: async (req, res) => {
    try {
      const { title, categorie, sous_categorie, description, site_web, phone, ville, adresse } = req.body;
      const image = req.file?.filename;
      const errMsg = serviceValidation(title, categorie, sous_categorie, description, site_web, phone, adresse);
      if(errMsg) return res.status(406).json({ error: errMsg });
      let userId = req.params.id;
      const service = await Service.create({ title, categorie, sous_categorie, image, description, site_web, phone, ville, adresse, user: userId });
      const userById = await User.findById(userId);
      userById.service.push(service);
      await userById.save();
      return res.status(201).json(service);
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  }
}

module.exports = service;