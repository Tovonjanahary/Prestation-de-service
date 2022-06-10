const Post = require('../models/postModel');
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
      const post = await Post.find();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(404).json({ error: "donnees introuvable" });
    }
  },
  getSingleService: async (req, res) => {
    try {
      let id = req.params.id;
      const post = await Post.findById(id).populate('user');
      if(!post) return res.status(404).json({msg: "donnee introuvable"});
      return res.status(200).json(post);
    } catch (error) {
      return res.status(404).json({ error: "donnees introuvable" })
    }
  },
  addPost: async (req, res) => {
    try {
      const { description } = req.body;
      const image = req.file?.filename;
      const errMsg = serviceValidation(description);
      if(errMsg) return res.status(406).json({ error: errMsg });
      let userId = req.params.id;
      const post = await Post.create({ image, description });
      const userById = await User.findById(userId);
      userById.post.push(post);
      await userById.save();
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).json({error: error.message});
    }
  },
  deleteService: async (req, res) => {
    try {
      let postId = req.params.id;
      const userDeleted = await Post.findByIdAndDelete(postId);
      if(!userDeleted) return res.status(404).json({ error: "ce service n'existe pas" });
      return res.status(200).json({ msg: "service suprime avec succes" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = service;