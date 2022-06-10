import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const AddPost = () => {

  const [post, setPost] = useState({ description: "", image: "" });
  const [picture, setPicture] = useState('');
  const { userid } = useParams();
  const [error, setError] = useState(false);

  
  const classStyle = {
    label: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
    select: "block appearance-none w-full bg-gray-200 border  border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    input: `text-sm text-gray-base w-full
        mr-3 py-5 px-4 h-3 focus:outline-none border-b-2 border-gray-200
        border-gray-200 mb-2`,
    selectIcon: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setPost({ ...post, image: e.target.files[0] });
    setPicture(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', post.description);
      formData.append('image', post.image);
      const { data } = await axios.post(`http://localhost:5000/service/addPost/${userid}`, formData);
      console.log(data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  return (
    <form action="" onSubmit={handleSubmit} encType='multipart/form-data'>
      <h2>PUBLIER QUELQUE CHOSE</h2>
      <div className="relative mb-2">
        <div>
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
      <div>
        <label className={classStyle.label} htmlFor="description">
          Description
        </label>
        <textarea aria-label="Description de métier"
          type="text" placeholder="Decrire votre métier"
          id="description"
          className={classStyle.input}
          name="description"
          required
          value={post.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className={classStyle.label} htmlFor="image">
          Image
        </label>
        <input aria-label="Enter your image"
          type="file"
          accept=".png, .jpg, .jpeg"
          className="mb-2"
          name="image"
          required
          onChange={handlePhoto}
        />
      </div>
      { picture && <img src={ picture && picture } alt="post pic" width="100px" height="100px"/> }
      { error && <div className='text-danger'>{ error }</div>}
      <button type="submit"
        className="bg-indigo-400 py-2 rounded-bl-lg w-full mt-4">
        Publier
      </button>
    </form>
  )
}

export default AddPost