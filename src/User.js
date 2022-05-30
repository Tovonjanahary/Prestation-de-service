import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [newUser, setNewUser] = useState({ name: '', firstName: '', phone: '', adresse: '', birthdate: '', photo: '' }
  );

  // const[users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newUser.name);
    formData.append('firstName', newUser.firstName);
    formData.append('photo', newUser.photo);
    formData.append('birthdate', newUser.birthdate);
    formData.append('phone', newUser.phone);
    formData.append('adresse', newUser.adresse);

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

  // const getUser = async() => {
  //   const { data } = await axios.get('http://localhost:5000/users/getUser');
  //   setUsers(data);
  // }
  // useEffect(() => {
  //   getUser();
  // })

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
          type="text"
          placeholder="firstName"
          name="firstName"
          value={newUser.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="adresse"
          name="adresse"
          value={newUser.adresse}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="phone"
          name="phone"
          value={newUser.phone}
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
      {/* {
        users && users.map(u => 
          <div>
            <p>{u.name}</p>
            <img src={`/img/${u.photo}`} alt="sary"/>
          </div>
        )
      } */}
    </>
  );
}

export default User;