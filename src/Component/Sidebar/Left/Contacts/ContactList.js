import "./index.scss";
import { NavLink } from "react-router-dom";
import Avatar from "../../../Avatar/Avatar";

function ContactList(props) {
  const { id , name, msg, time, img_url } = props.user;
  return (
    <NavLink to={`/chats/${id}`} >
      <li className="users-list-item" >
        <div className="left-block">
          {img_url && <Avatar img_url={img_url} size="35"/>}
          <div className="left-block-details">
            {name && <p className="name">{name}</p>}
            {msg && <p className="msg">{msg}</p>}
          </div>
        </div>
            <div className="right-block">
               {time &&  <p className="right-block-time">{time}</p>}
            </div>
      </li>
    </NavLink>
  );
}

export default ContactList;
