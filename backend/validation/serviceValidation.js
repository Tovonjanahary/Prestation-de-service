const serviceValidation = (title, categorie, sous_categorie, description, site_web, phone, adresse) => {
  if(!title || !categorie || !sous_categorie || !description || !site_web || !phone || !adresse) {
    return "Tous les champs du formulaire sont obligatoires";
  }
}

module.exports = serviceValidation;