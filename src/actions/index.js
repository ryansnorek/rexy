import axios from "axios";

import { API_KEY } from "../config";
import { BASE_URL } from "../constants";

export const FETCH_START = "FETCH_START";
export const FETCH_QUERY = "FETCH_QUERY";
export const FETCH_ERROR = "FETCH_ERROR";
export const ADD_REXY = "ADD_REXY";
export const FIND_MOVIE = "FIND_MOVIE";

export const getQueryResults = (category, query) => {
    return (dispatch) => {
        dispatch(fetchStart())

        axios.get(`${BASE_URL}/3/search/${category}?api_key=${API_KEY}&query=${query}`)
            .then(res => dispatch(fetchQuery(res.data.results)))
            .catch(err => dispatch(fetchError(err)))
    }
}
export const findMovieById = (id) => {
    return (dispatch) => {
        dispatch(fetchStart())
        axios.get(`${BASE_URL}/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => dispatch(findMovie(res.data)))
            .catch(err => dispatch(fetchError(err)))
    }
}

export const fetchStart = () => {
    return ({ type: FETCH_START });
}
export const fetchQuery = (data) => {
    return ({ type: FETCH_QUERY, payload: data });
}
export const fetchError = (error) => {
    return ({ type: FETCH_ERROR, payload: error });
}
export const addRexy = (id) => {
    return ({ type: ADD_REXY, payload: id });
}
export const findMovie = (data) => {
    return ({ type: FIND_MOVIE, payload: data });
}