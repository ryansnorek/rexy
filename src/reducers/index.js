import { FETCH_START, FETCH_QUERY, FETCH_ERROR, ADD_REXY, DELETE_REXY, FIND_REXY_MOVIE, FIND_MOVIE, FIND_TV, GET_FRIENDS, DISCOVER_MOVIE, DISCOVER_TV, TRENDING } from "../actions";

const initialState = {
    data: [],
    rexyIDs: [],
    rexys: {
        movies: [],
        tvShows: []
    },
    item: {
        movie: "",
        tvShow: ""
    },
    friends: [],
    discover: {
        movies: [],
        tvShows: [],
        trending: [] 
    },
    isFetching: false,
    errors: ""
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case (FETCH_START):
            return ({ ...state, isFetching: true })
        case (FETCH_QUERY):
            return ({ ...state, data: action.payload, isFetching: false })
        case (FETCH_ERROR): 
            return ({ ...state, errors: action.payload })
        case (ADD_REXY): 
            return ({ ...state, rexyIDs: [...state.rexyIDs, action.payload] })
        case (DELETE_REXY):
            const filteredIDs = state.rexyIDs.filter(id => id !== action.payload);
            const filteredRexys = state.rexys.movies.filter(rexy => rexy.id !== action.payload);
            return ({ ...state, 
                        rexyIds: [...filteredIDs],
                        rexys: { movies: [...filteredRexys] } 
                    })
        case (FIND_REXY_MOVIE):
            return ({ ...state, rexys: { movies: [...state.rexys.movies, action.payload] }})
        case (FIND_MOVIE):
            return ({ ...state, item: { movie: action.payload }})
        case (FIND_TV):
            return ({ ...state, item: { tvShow: action.payload }})
        case (GET_FRIENDS):
            return ({ ...state, friends: action.payload })
        case (DISCOVER_MOVIE): 
            return ({ ...state, discover: { movies: [...action.payload] }})
        case (DISCOVER_TV): 
            return ({ ...state, discover: { tvShows: [...action.payload] }})
        case (TRENDING):
            return ({ ...state, discover: { trending: [...action.payload] }})
        default:
            return state;
    }
}