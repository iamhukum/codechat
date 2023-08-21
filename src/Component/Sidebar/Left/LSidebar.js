import React, { useState, useMemo } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { ImSwitch } from 'react-icons/im';
import { FiSearch } from 'react-icons/fi';
import {users} from '../../../data/users';
import ContactList from './Contacts/ContactList';
import './index.scss';

function Sidebar({setshow , newcontact}) {
  const [newContacts, setnewContacts] = useState([]);
  const [searchContacts, setsearchContacts] = useState([]);
  const [isSearching, setisSearching] = useState(false);

  useMemo(() => {
     setnewContacts(newcontact);
  },[newcontact]);

  // handle pop modal show
  function handlePopupModal() {
     setshow(true);
  }

  // handleInput Chage modal
  function handleInputChange(e) {
     let val = e.target.value;
     let SearchedUser = users.filter(user => {
      let regex = new RegExp(`^${val}` , 'gi');
      return user.name.match(regex);
     });
     setisSearching(true);
     setsearchContacts(SearchedUser);
  }
  
  return (
    <aside className="left-sidebar">
      <header>
         <div className="header-top">
          <div className="header-add-new-user">
             <button type="button" onClick={handlePopupModal}>
                 <BsPlusLg className="logo"/>
                 <span className="text">New User</span>
             </button>
          </div>
          <p className="logout-btn">
            <span className="title">Logout</span>
            <span className="icon"><ImSwitch /></span>
            </p>
         </div>
         <div className="header-search-input">
           <input placeholder="Search Contacts..." onChange={handleInputChange}/>
           <span className="search-icon">
             <FiSearch />
           </span>
         </div>
      </header>
      <div className="contacts">
          <ul className="users-list-group">
            {
              newContacts && newContacts.map(user => <ContactList key={user.id} user={user} />)
            }
            {
                isSearching ?
                searchContacts.map(user => <ContactList key={user.id} user={user} />) : 
                users.map(user => <ContactList key={user.id} user={user} />)
            }
          </ul>
      </div>
    </aside>
  );
}

export default Sidebar