import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Inscription = () => {
  const [newService, setNewService] = useState(
    {
      title: "",
      categorie: "",
      sous_categorie: "",
      image: "",
      description: "",
      site_web: "",
      phone: "",
      adresse: "",
      ville: ""
    }
  );
  const [picture, setPicture] = useState('');
  const history = useHistory();
  const { id } = useParams();

  const classStyle = {
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
    select: "block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    input: `text-sm text-gray-base w-full
        mr-3 py-5 px-4 h-3 focus:outline-none border-b-2 border-gray-200
        border-gray-200 mb-2`,
    selectIcon: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
  };

  const axiosProvider = require("axios").create({
    timeout: 120000, // 2 min
    baseURL: 'http://localhost:5000'
  });

  const datas = (data, arg = "application/json") => {
    if (arg === "application/json") {
      return JSON.stringify(data);
    } else if (arg === "multipart/form-data") {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      return formData;
    } else {
      return data;
    }
  };

  const sendService = async (params) => {
    const result = await axiosProvider({
      method: "POST",
      url: `/service/addService/${id}`,
      data: datas(params, "multipart/form-data"),
      headers: { 'Access-Control-Allow-Origin': true }
    });
    return result;
  }

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setNewService({ ...newService, image: e.target.files[0] });
    setPicture(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendService(newService)
    history.push('/services');
  };



  return (
    <div className="create-service">
      <div className="flex flex-col
					items-center justify-center">
        <p className="text-indigo-500 text-xl uppercase tracking-wider mb-3">
          Ajout de nouvel service
        </p>

        <form onSubmit={handleSubmit} className="shadow-xl px-5 py-5" encType='multipart/form-data'>
          <div className="flex flex-wrap -mx-3 mb-6">
            <label className={classStyle.label} htmlFor="title">
              Title
            </label>
            <input aria-label="Enter title"
              type="text" placeholder="Title"
              id="title"
              className={classStyle.input}
              name="title"
              value={newService.title}
              onChange={handleChange}

            />
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className={classStyle.label} htmlFor="grid-state">
                Categories
              </label>
              <div className="relative mb-2">
                <select className={classStyle.select} id="grid-state"
                  name="categorie"
                  value={newService.categorie}
                  onChange={handleChange}
                >
                  <option value="">selectionnez...</option>
                  <option value="education">Education</option>
                  <option value="home service">Service Maison</option>
                  <option value="sport-loisir">Sports et Loisirs</option>
                </select>
                <div className={classStyle.selectIcon}>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className={classStyle.label} htmlFor="grid-state">
                Sous-categorie
              </label>
              <div className="relative mb-2">
                <select className={classStyle.select} id="grid-state"
                  name="sous_categorie"
                  value={newService.sous_categorie}
                  onChange={handleChange}
                  required
                >
                  <option value="">selectionnez...</option>
                  <option value="universite" className="uppercase">universite</option>
                  <option value="lycee" className="uppercase">lycee</option>
                  <option value="formation" className="uppercase">formation</option>
                  <option value="electricien" className="uppercase">electricien</option>
                  <option value="reparation phone" className="uppercase">reparation de telephone</option>
                  <option value="danse club" className="uppercase">Club de danse</option>
                </select>
                <div className={classStyle.selectIcon}>
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <label className={classStyle.label} htmlFor="description">
            Description
          </label>
          <textarea aria-label="Description de métier"
            type="text" placeholder="Decrire votre métier"
            id="description"
            className={classStyle.input}
            name="description"
            value={newService.description}
            onChange={handleChange}
            required
          ></textarea>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className={classStyle.label} htmlFor="adresse">
                Adresse
              </label>
              <input aria-label="Enter l'url de votre site web"
                type="text" placeholder="domaine site web (facultatif)"
                id="adresse"
                className={classStyle.input}
                name="adresse"
                value={newService.adresse}
                onChange={handleChange}

              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className={classStyle.label} htmlFor="ville">
                Ville
              </label>
              <input aria-label="Enter your city"
                type="text" placeholder="ville"
                id="ville"
                className={classStyle.input}
                name="ville"
                value={newService.ville}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className={classStyle.label} htmlFor="site_web">
                Site web
              </label>
              <input aria-label="Enter l'url de votre site web"
                type="text" placeholder="domaine site web (facultatif)"
                id="site_web"
                className={classStyle.input}
                name="site_web"
                value={newService.site_web}
                onChange={handleChange}

              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className={classStyle.label} htmlFor="phone">
                Phone
              </label>
              <input aria-label="Enter your phone"
                type="text" placeholder="Phone"
                id="phone"
                className={classStyle.input}
                name="phone"
                value={newService.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label className={classStyle.label} htmlFor="image">
            Image
          </label>
          <input aria-label="Enter your image"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handlePhoto}
            className="mb-2"
            name="image"
            required
          />
          <div className="previewProfilePic w-1/4 md:w-1/2" >
            {picture && <img className="playerProfilePic_home_tile w-1/4 " alt="Votre logo" src={picture && picture}></img>}
          </div>

          <button type="submit"
            className="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4">
            Enregistrer
          </button>
        </form>

      </div>
    </div>
  );
}

export default Inscription;