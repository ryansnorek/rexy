import { connect } from "react-redux";
import { useState } from "react";
import SearchItem from "./SearchItem";
import useSearch from "../hooks/useSearch";
import ItemDetails from "./ItemDetails";

function Search({ dispatch, queryResults, isFetching }) {
  const [queryType, query, handleSelectQueryType, handleQueryChange] =
    useSearch(dispatch, "movie");

  const [itemClicked, setItemClicked] = useState(false);
  const handleItemClose = () => setItemClicked(false);

  return (
    <div className="search page">
      <div className="nav-bar">
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search content"
            value={query}
            onChange={handleQueryChange}
          />
          <select onChange={handleSelectQueryType}>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </form>
      </div>
        {itemClicked && <ItemDetails handleItemClose={handleItemClose} />}
      <div className={`results  ${itemClicked ? "blur" : ""}`}>
        {
        isFetching && query ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : (
          query &&
          queryResults.map((result) => {
            return (
              <SearchItem
                item={result}
                queryType={queryType}
                setItemClicked={setItemClicked}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    queryResults: state.queryResults,
    discover: state.discover,
    isFetching: state.isFetching,
    errors: state.errors,
  };
};
export default connect(mapStateToProps)(Search);
