import { connect } from "react-redux";
import { unsetFirstTimeUser, updateUser } from "../actions";
import { AVATARS } from "../constants";

function AccountAvatar({ handleEdit, user, firstTimeUser, dispatch }) {
  const handleClick = (e) => {
    const { user_id } = user;
    dispatch(updateUser({ uploaded_image: e.target.name }, user_id));
    firstTimeUser && dispatch(unsetFirstTimeUser());
  };
  return (
    <div className="modal-wrapper">
      <div className="edit-modal">
        <nav>
          <img
            className="icon"
            onClick={!firstTimeUser && handleEdit}
            src="../../images/close.png"
            alt="close"
          />
        </nav>
        <p>Select your avatar</p>
        <div className="avatars">
          {AVATARS.map((avatar) => {
            return (
              <img
                onClick={handleClick}
                className="avatar temp-placeholder"
                name={avatar}
                src={avatar}
                alt="avatar"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return ({ 
    user: state.user,
    firstTimeUser: state.firstTimeUser 
  });
}
export default connect(mapStateToProps)(AccountAvatar);
