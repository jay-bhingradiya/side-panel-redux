import movieActions from './actions';

const initialState = {
  movies: [
    {
      id: 1,
      name: 'Inception',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Drishyam 2',
      rating: 4.2,
    },
    {
      id: 3,
      name: 'The Star Trek',
      rating: 4.5,
    },
  ],
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case movieActions.ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, {...payload}],
      };
    case movieActions.EDIT_MOVIE:
      return {
        ...state,
        movies: payload,
      };
    case movieActions.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter (movie => movie.id !== payload),
      };
    default:
      return state;
  }
};

export default reducer;
