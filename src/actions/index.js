import axios from "axios";
import axiosAuthorization from "../utils";
import { API_KEY } from "../config";
import { BASE_URL, BACKEND_URL, TOKEN } from "../constants";

export const FETCH_START = "FETCH_START";
export const FETCH_QUERY = "FETCH_QUERY";
export const FETCH_ERROR = "FETCH_ERROR";
export const SET_USER_MOVIES = "SET_USER_MOVIES";
export const SET_USER_TV_SHOWS = "SET_USER_TV_SHOWS";
export const DELETE_REXY = "DELETE_REXY";
export const FIND_REXY_MOVIE = "FIND_REXY_MOVIE";
export const SET_ITEM_MOVIE = "SET_ITEM_MOVIE";
export const SET_ITEM_TV_SHOW = "SET_ITEM_TV_SHOW";
export const GET_FRIENDS = "GET_FRIENDS";
export const DISCOVER_MOVIE = "DISCOVER_MOVIE";
export const DISCOVER_TV = "DISCOVER_TV";
export const TRENDING = "TRENDING";
export const AUTHORIZE_USER = "AUTHORIZE_USER";
export const LOGIN_COMPLETE = "LOGIN_COMPLETE";
export const SET_USER = "SET_USER";
export const SET_PROFILE = "SET_PROFILE";
export const ADD_USER_MOVIE_CONTENT = "ADD_USER_MOVIE_CONTENT";
export const ADD_USER_TV_CONTENT = "ADD_USER_TV_CONTENT";
export const CLEAR_USER_MOVIE_LIST = "CLEAR_USER_MOVIE_LIST";
export const CLEAR_USER_TV_LIST = "CLEAR_USER_TV_LIST";

export const getQueryResults = (category, query) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get(`${BASE_URL}/3/search/${category}?api_key=${API_KEY}&query=${query}`)
      .then((res) => dispatch(fetchQuery(res.data.results)))
      .catch((err) => dispatch(fetchError(err)));
  };
};
export const fetchQuery = (queryResults) => {
  return { type: FETCH_QUERY, payload: queryResults };
};
export const findContentById = (id, type) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get(`${BASE_URL}/3/${type}/${id}?api_key=${API_KEY}`)
      .then((res) => {
        type === "movie"
          ? dispatch(setItemMovie(res.data))
          : dispatch(setItemTvShow(res.data));
      })
      .catch((err) => dispatch(fetchError(err)));
  };
};
export const getFriends = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((res) => dispatch(friendsList(res.data.results)))
      .catch((err) => dispatch(fetchError(err)));
  };
};
export const discoverContent = (type) => {
  return (dispatch) => {
    dispatch(fetchStart());
    if (type === "trending") {
      axios
        .get(`${BASE_URL}/3/trending/all/day?api_key=${API_KEY}`)
        .then((res) => dispatch(trendingList(res.data.results)))
        .catch((err) => dispatch(fetchError(err)));
    }
    axios
      .get(
        `${BASE_URL}/3/discover/${type}?api_key=${API_KEY}&sort_by=popularity.desc`
      )
      .then((res) => {
        dispatch(
          type === "movie"
            ? discoverMovieList(res.data.results)
            : discoverTvList(res.data.results)
        );
      })
      .catch((err) => dispatch(fetchError(err)));
  };
};
export const loginUser = (credentials) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .post(`${BACKEND_URL}/auth/login`, credentials)
      .then((res) => {
        res.data.authorized = true;
        dispatch(authorizeUser(res.data));
        localStorage.setItem("token", res.data.token);
        return res.data;
      })
      .then((data) => {
        dispatch(getUser(data));
        return data;
      })
      .then((data) => {
        dispatch(getProfile(data));
        return data;
      })
      .then((data) => {
        dispatch(getUserMovies(data.user_id));
        return data;
      })
      .then((data) => {
        dispatch(getUserTvShows(data.user_id));
        return data;
      })
      .catch((err) => dispatch(fetchError(err)))
      .finally(() => dispatch(loginComplete()));
  };
};
export const authorizeUser = (auth) => {
  return { type: AUTHORIZE_USER, payload: auth };
};
export const getUser = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosAuthorization()
      .get(`/users/${data.user_id}`)
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => console.log(err));
  };
};
export const setUser = (user) => {
  return { type: SET_USER, payload: user };
};
export const getProfile = (data) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosAuthorization()
      .get(`/profile/${data.user_id}`)
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .catch((err) => console.log(err));
  };
};
export const setProfile = (profile) => {
  return { type: SET_PROFILE, payload: profile };
};
export const loginComplete = () => {
  return { type: LOGIN_COMPLETE };
};

// USER MOVIES //
export const addUserMovie = (movie_id, user_id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosAuthorization()
      .post(`/profile/movies`, {
        movie_id,
        user_id,
      })
      .then(() => {
        dispatch(getUserMovies(user_id));
      })
      .catch((err) => console.log(err));
  };
};
export const getUserMovies = (user_id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(clearUserMovieList());
    axiosAuthorization()
      .get(`/profile/${user_id}/movies`)
      .then((res) => {
        res.data.forEach((movie) => {
          dispatch(findUserContentById(movie.movie_id, "movie"));
        });
      })
      .catch((err) => console.log(err));
  };
};
export const clearUserMovieList = () => {
  return { type: CLEAR_USER_MOVIE_LIST };
};
export const setUserMovies = (movies) => {
  return { type: SET_USER_MOVIES, payload: movies };
};
export const deleteUserMovie = (content_id, user_id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosAuthorization()
      .delete("/profile/movies", {
        movie_id: content_id,
        user_id: user_id,
      })
      .then((res) => {
        console.log(res);
        dispatch(getUserMovies(user_id));
      })
      .catch((err) => dispatch(fetchError(err)));
  };
};
// USER TV SHOWS //
export const addUserTvShow = (tv_show_id, user_id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosAuthorization()
      .post(`/profile/tv-shows`, {
        tv_show_id,
        user_id,
      })
      .then(() => dispatch(getUserTvShows(user_id)))
      .catch((err) => console.log(err));
  };
};
export const getUserTvShows = (user_id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    dispatch(clearUserTvShowList());
    axiosAuthorization()
      .get(`/profile/${user_id}/tv-shows`)
      .then((res) => {
        res.data.forEach((tvShow) => {
          dispatch(findUserContentById(tvShow.tv_show_id, "tv"));
        });
      })
      .catch((err) => console.log(err));
  };
};
export const clearUserTvShowList = () => {
  return { type: CLEAR_USER_TV_LIST };
};
export const setUserTvShows = (tvShows) => {
  return { type: SET_USER_TV_SHOWS, payload: tvShows };
};
export const deleteUserTvShow = (content_id, user_id) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axiosAuthorization()
      .delete("/profile/tv-shows", {
        tv_show_id: content_id,
        user_id: user_id,
      })
      .then(() => {
        dispatch(getUserMovies(user_id));
      })
      .catch((err) => dispatch(fetchError(err)));
  };
};
export const findUserContentById = (id, type) => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get(`${BASE_URL}/3/${type}/${id}?api_key=${API_KEY}`)
      .then((res) => {
        type === "movie"
          ? dispatch(addUserMovieContent(res.data))
          : dispatch(addUserTvContent(res.data));
      })
      .catch((err) => dispatch(fetchError(err)));
  };
};
export const addUserMovieContent = (movie) => {
  return { type: ADD_USER_MOVIE_CONTENT, payload: movie };
};
export const addUserTvContent = (tvShow) => {
  return { type: ADD_USER_TV_CONTENT, payload: tvShow };
};
export const fetchStart = () => {
  return { type: FETCH_START };
};
export const fetchError = (error) => {
  return { type: FETCH_ERROR, payload: error };
};
export const setItemMovie = (movie) => {
  return { type: SET_ITEM_MOVIE, payload: movie };
};
export const setItemTvShow = (show) => {
  return { type: SET_ITEM_TV_SHOW, payload: show };
};
export const friendsList = (friends) => {
  return { type: GET_FRIENDS, payload: friends };
};
export const discoverMovieList = (movies) => {
  return { type: DISCOVER_MOVIE, payload: movies };
};
export const discoverTvList = (tvShows) => {
  return { type: DISCOVER_TV, payload: tvShows };
};
export const trendingList = (trending) => {
  return { type: TRENDING, payload: trending };
};
