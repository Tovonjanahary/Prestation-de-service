import React from 'react'
import PostAddIcon from '@mui/icons-material/PostAdd';
import PhoneIcon from '@mui/icons-material/Phone';
import moment from 'moment';
import localization from 'moment/locale/fr';

const Post = ({ user }) => {
  
  return (
    <>
      <div>
        <section className="bg-white rounded-md border border-indigo-200 p-3">
          <div className="flex items-end text-sm">
            <PhoneIcon />
            Contact:<span className='font-bold'> +261{user.phone}</span>
          </div>
          <div className="font-bold italic">{user.categorie}</div>
          <div className="text-sm mt-2">membre depuis: <br />{moment(user.createdAt).locale('fr', localization).format('LL')}</div>
          <div className="flex items-end text-indigo-500 font-bold">
            <PostAddIcon />
            <h2 className='mt-5 ml-1'>PUBLICATIONS</h2>
          </div>
        </section>
      </div>
      <section>
        {
          user && user.post.length <= 0 ? <div>Vous n'avez aucune publication</div>
          :
          user && user.post.map(u => (
            <div key={u._id} className="mt-3 bg-white p-2 rounded-md border border-indigo-200">
              <p className='text-sm mt-2'>{u.description}</p>
              <img src={`/img/${u.image}`} alt="service" width="100%" height="100%" className="mt-2 m-auto border-2 border-white" />
            </div>
          ))
        }
      </section>
    </>
  )
}

export default Post