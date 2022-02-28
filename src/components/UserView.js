import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { setItemMovie, setItemTvShow } from "../actions";
import UserContent from "./UserContent";
import ItemDetails from "./ItemDetails";


function UserView({ friend, content, dispatch }) {
  const { movies, tvShows } = content;
  const [itemClicked, setItemClicked] = useState(false);
  const handleItemClose = () => setItemClicked(false);
  const navigate = useNavigate();

  const handleClickItem = (id, type) => {
    const content = type === "movie" ? movies : tvShows;
    const item = content.find((di) => di.id === id);
    dispatch(
      type === "movie"
        ? dispatch(setItemMovie(item))
        : dispatch(setItemTvShow(item))
    );
    setItemClicked(true);
  };
  return (
    <div className="page">
      <div className="friend-view">
        {itemClicked && <ItemDetails handleItemClose={handleItemClose} />}
        <div className="card">
          <img
            onClick={() => navigate('/users')}
            className="icon"
            src="../../images/back.png"
            alt="back"
          />
          <div className="pic">
            <img src="../../images/blank_user.png" alt="profile-pic" />
            <h3>{friend.display_name}</h3>
          </div>
        </div>
        <div className={`rexys ${itemClicked ? "blur" : ""}`}>
          <h2>Movies</h2>
          {movies &&
            movies.map((item) => {
              return (
                <UserContent
                  key={item.id}
                  item={item}
                  type={"movie"}
                  handleClickItem={handleClickItem}
                />
              );
            })}
          <h2>Tv Shows</h2>
          {tvShows &&
            tvShows.map((item) => {
              return (
                <UserContent
                  key={item.id}
                  item={item}
                  type={"tv"}
                  handleClickItem={handleClickItem}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    friend: state.friend,
    content: state.friendContentList,
  };
};
export default connect(mapStateToProps)(UserView);