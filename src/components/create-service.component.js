import React, { useState } from 'react';

const CreateService = () => {
    const [newService, setNewService] = useState(
        {
        categorie: "",
        sous_categorie: "",
        image: "",
        description: "",
        site_web: "",
        phone: "",
        adresse: "",
        email: ""
        }
    );
    const [picture, setPicture] = useState('');
    

    const classStyle = {
        label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
        select: "block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
        input:`text-sm text-gray-base w-full
        mr-3 py-5 px-4 h-3 focus:outline-none border-b-2 border-gray-200
        border-gray-200 mb-2`,
        selectIcon: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
    };

   

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newService)
    }

    const handleChange = (e) => {
        setNewService({...newService, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewService({...newService, image: e.target.files[0]});
        setPicture(URL.createObjectURL(e.target.files[0]) );
    }

    return (
        <div className="create-service">
           <div class="flex flex-col
					items-center justify-center">
			<p class="text-indigo-500 text-xl uppercase tracking-wider mb-3">
			Ajout de nouvel service
			</p>

			<form onSubmit={handleSubmit} class="shadow-xl px-5 py-5" encType='multipart/form-data'>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class={classStyle.label} for="grid-state">
                        Categorie
                        </label>
                        <div class="relative mb-2">
                            <select class={classStyle.select} id="grid-state"
                                name="categorie"
                                value={newService.categorie}
                                onChange={handleChange}
                                required
                            >
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div class={classStyle.selectIcon}>
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class={classStyle.label} for="grid-state">
                        Sous-categorie
                        </label>
                        <div class="relative mb-2">
                            <select class={classStyle.select} id="grid-state"
                                name="sous_categorie"
                                value={newService.sous_categorie}
                                onChange={handleChange}
                                required
                            >
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div class={classStyle.selectIcon}>
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <label class={classStyle.label} for="description">
                    Description
                    </label>
                    <textarea aria-label="Description de métier"
                    type="text" placeholder="Decrire votre métier"
                    id="description"
                    class={classStyle.input}
                    name="description"
                    value={newService.description}
                    onChange={handleChange} 
                    required
                    ></textarea>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class={classStyle.label} for="site_web">
                    Site web
                    </label>
                    <input aria-label="Enter l'url de votre site web"
                    type="text" placeholder="domaine site web (facultatif)"
                    id="site_web"
                    class={classStyle.input}
                    name="site_web"
                    value={newService.site_web}
                    onChange={handleChange} 
                    
                    />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                    <label class={classStyle.label} for="phone">
                    Phone
                    </label>
                    <input aria-label="Enter your phone"
                    type="text" placeholder="Phone"
                    id="phone"
                    class={classStyle.input} 
                    name="phone"
                    value={newService.phone}
                    onChange={handleChange} 
                    required
                    />
                    </div>
                </div>
                <label class={classStyle.label} for="image">
                    Image
                    </label>
                    <input aria-label="Enter your image"
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    onChange={handlePhoto}
                    class="mb-2"
                    name="image"
                    required
                    />
                    <div className="previewProfilePic w-1/4 md:w-1/2" >
                        <img className="playerProfilePic_home_tile w-1/4 " src={picture && picture}></img>
                    </div>
                
                <button type="submit"
                class="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4">
                Enregistrer
                </button>
			</form>
            
		</div>
        </div>
    );
}
 
export default CreateService;