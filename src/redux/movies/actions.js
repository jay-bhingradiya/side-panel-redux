const movieActions = {
  ADD_MOVIE: "ADD_MOVIE",
  REMOVE_MOVIE: "REMOVE_MOVIE",
  EDIT_MOVIE: "EDIT_MOVIE",
  DELETE_MOVIE: "DELETE_MOVIE",

  addMovie: (data) => ({
    type: movieActions.ADD_MOVIE,
    payload: data,
  }),

  editMovie: (data) => ({
    type: movieActions.EDIT_MOVIE,
    payload: data,
  }),
  deleteMovie: (id) => ({
    type: movieActions.DELETE_MOVIE,
    payload: id,
  }),
};

export default movieActions;
