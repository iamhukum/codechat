import React from 'react';
import {IoCloseSharp} from 'react-icons/io5';
import {newUsers} from '../../data/newUsers';
import Avatar from '../Avatar/Avatar';
import './modal.scss';

function Modal(props) {
  // handle pop modal close
  function handleClosePopupModal() {
    props.setshow(false);
  }

  // handleContacts list
  function handleContacts(user) {
    if(props.newcontact.length > 0) {
      let findIndex = props.newcontact.findIndex(prevUser => prevUser.id === user.id);
      if(findIndex >= 0) {
        return;
      }
      else {
        props.setnewcontact([...props.newcontact , user]);
      }
    } 
    else {
      props.setnewcontact([...props.newcontact , user]);
    }
    
  }

  return (
    <div className="modal" style={{
        display: props.show ? 'block' : 'none'
    }}>
       <header>
         <span onClick={handleClosePopupModal}>
            <IoCloseSharp />
         </span>
       </header>
      <div className="modal-body">
        <ul className="contact-list-group">
           {
            newUsers.map(user => (
               <li className="contact-list-item" key={user.id} onClick={() => handleContacts(user)}>
                 <React.Fragment>
                 <Avatar img_url={user.img_url} size="20" />
                 <span> {user.name}</span>
                 </React.Fragment>
               </li>
            ))
           }
        </ul>
      </div>
    </div>
  )
}

export default Modal