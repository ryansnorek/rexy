import { connect } from "react-redux";
import { POSTER_URL, UNAVAILABLE } from "../constants";
import { useNavigate } from "react-router-dom";
import { addWatchlistMovie, addWatchlistShow } from "../actions";

function SearchItem({ dispatch, item, queryType, user, handleClickItem }) {
  const navigate = useNavigate();
  const type = queryType === "tv" ? "Show" : "movie";
  const title = item.original_name || item.title;
  const date = item.first_air_date || item.release_date;
  const poster = `${POSTER_URL}${item.poster_path}` || UNAVAILABLE;

  const handleAddContent = (contentId) => {
    if (!user.user_id) {
      alert("login to add content");
      navigate("/login");
      return;
    }
    dispatch(
      type === "movie"
        ? addWatchlistMovie(contentId, user.user_id)
        : addWatchlistShow(contentId, user.user_id)
    );
  };
  return (
    <div className="item">
      <div
        className="poster"
        onClick={() => handleClickItem(item.id, queryType)}
      >
        <img className="temp-placeholder" src={poster} alt="poster" />
      </div>
      <div className="text" onClick={() => handleClickItem(item.id, queryType)}>
        <div className="title">
          <h2>{title}</h2>
          <p>
            {queryType === "tv" ? "First aired: " : "Released: "}
            {date}
          </p>
        </div>
        <div className="actions">
          {/* <img
            className="icon"
            onClick={() => handleAddContent(item.id)}
            src="../../images/add.png"
            alt="add"
          /> */}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  userContent: state.userContent,
});
export default connect(mapStateToProps)(SearchItem);
