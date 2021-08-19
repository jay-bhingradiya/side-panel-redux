import { Fragment, useState } from "react";
import { useEffect } from "react";
import FormInput from "./FormInput";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import movieActions from "../redux/movies/actions";

const Form = ({ initialMovieData, closeSidebar, title, mode }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [movieData, setMovieData] = useState({
    name: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMovieData({
      name: initialMovieData.name,
      rating: initialMovieData.rating,
      id: initialMovieData.id,
    });
  }, [initialMovieData]);

  const closeHandler = () => {
    closeSidebar();
    setMovieData({
      name: "",
      rating: "",
    });
    setErrors({});
  };

  const onChangeHandler = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });

    let name = e.target.name;
    let value = e.target.value;

    if (e.target.value === "") {
      setErrors({
        ...errors,
        [e.target.name]: `Enter Movie ${e.target.name}`,
      });
      return;
    }

    if (name === "rating") {
      if (value < 1 || value > 5) {
        setErrors({
          ...errors,
          [e.target.name]: `Enter Rating between 1 to 5`,
        });
        return;
      }
    }

    let newList = { ...errors };
    delete newList[name];
    setErrors(newList);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length !== 0) return;

    let err = {};
    if (!movieData.name) err.name = "Enter Movie name";
    if (!movieData.rating) err.rating = "Enter Movie rating";
    setErrors(err);

    if (Object.getOwnPropertyNames(err).length !== 0) return;

    if (initialMovieData.id !== "") {
      let newList = [...movies];
      let updatedMovie = newList.find(
        (movie) => movie.id === initialMovieData.id
      );
      let updatedMovieIndex = newList.findIndex(
        (movie) => movie.id === initialMovieData.id
      );
      updatedMovie = movieData;
      newList[updatedMovieIndex] = updatedMovie;

      dispatch(movieActions.editMovie(newList));
      closeSidebar();
    } else {
      const newMovieData = {
        ...movieData,
        id: Math.random(),
      };
      dispatch(movieActions.addMovie(newMovieData));
      closeSidebar();
    }

    setMovieData({
      name: "",
      rating: "",
    });
  };

  return (
    <Fragment>
      <h3>{title}</h3>
      <form onSubmit={submitHandler}>
        <FormInput
          id={mode ? `${mode}-movie name` : "movie name"}
          label="Movie Name"
          name="name"
          type="text"
          onChange={onChangeHandler}
          value={movieData.name}
          error={errors.name}
        />
        <FormInput
          id={mode ? `${mode}-movie rating` : "movie rating"}
          label="Rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          onChange={onChangeHandler}
          value={movieData.rating}
          error={errors.rating}
          step=".01"
        />
        <div className="form-btn">
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={submitHandler}
            type="submit"
          >
            Submit Movie
          </Button>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={closeHandler}
            type="button"
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Form;
