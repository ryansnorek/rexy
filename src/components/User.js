import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getFriendContent, setFriend } from "../actions";

function User({ user, friendContentList, dispatch, handleAddFriend }) {
  const navigate = useNavigate();

  const handleClickUser = () => {
    dispatch(setFriend(user));
    dispatch(getFriendContent(user.user_id));
  };

  if (friendContentList.movies && friendContentList.tvShows) {
    navigate("/userview");
  }
  return (
    <div className="friend">
      <div className="pic" onClick={handleClickUser}>
        <img src={`${user.uploaded_image}`} alt="profile-pic" />
        <h3>{user.display_name || user.username}</h3>
      </div>
      {/* <div className="text">
      </div> */}
      <div className="button-container">
        <button
          className="round-button"
          onClick={() => handleAddFriend(user.user_id)}
        >
          Follow
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    friendContentList: state.friendContentList,
  };
};
export default connect(mapStateToProps)(User);
