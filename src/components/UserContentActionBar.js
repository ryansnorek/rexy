function UserContentActionBar({ handleRating, handleRemove, handleSend, item }) {
  return (
    <div className="actions">
      {/* <img
        className="icon"
        src="../../images/heart.png"
        alt="rate"
        onClick={() => handleRating(item.id)}
      /> */}
      <img
        className="icon"
        src="../../images/paper-plane.png"
        alt="send"
        onClick={() => handleSend(item.id)}
      />
      <img
        className="icon delete"
        src="../../images/close.png"
        alt="delete"
        onClick={() => handleRemove(item.id)}
      />
    </div>
  );
}
export default UserContentActionBar;