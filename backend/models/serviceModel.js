const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  title: {
    type: String, required: true
  },
  categorie: {
    type: String
  },
  sous_categorie: {
    type: String, required: true
  },
  image: {
    type: String, 
    default: "sary"
  },
  description: {
    type: String
  },
  site_web: {
    type: String
  },
  phone: {
    type: String, required: true
  },
  ville: {
    type: String, default: "Fianarantsoa"
  },
  adresse: {
    type: String, required: true
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  ]
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;