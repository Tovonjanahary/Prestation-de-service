import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [newUser, setNewUser] = useState(
    {
      name: '',
      birthdate: '',
      photo: '',
    }
  );
  
  const[users, setUsers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', newUser.photo);
    formData.append('birthdate', newUser.birthdate);
    formData.append('name', newUser.name);

    axios.post('http://localhost:5000/users/addUser', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setNewUser({ ...newUser, photo: e.target.files[0] });
  }

  const getUser = async() => {
    const { data } = await axios.get('http://localhost:5000/users/getUser');
    setUsers(data);
  }
  useEffect(() => {
    getUser();
  })

  return (
    <>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          onChange={handlePhoto}
        />

        <input
          type="text"
          placeholder="name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthdate"
          value={newUser.date}
          onChange={handleChange}
        />

        <input
          type="submit"
        />
      </form>
      {
        users && users.map(u => 
          <div>
            <p>{u.name}</p>
            <img src={`/img/${u.photo}`} alt="photo"/>
          </div>
        )
      }
    </>
  );
}

export default User;