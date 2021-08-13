import {useState} from 'react';
import {useEffect} from 'react';
import FormInput from './FormInput';
import Button from '@material-ui/core/Button';

const MovieForm = ({addMovie, editMode, editMovie, closeSidebar}) => {
  const [movieData, setMovieData] = useState ({
    name: '',
    rating: '',
  });

  useEffect (
    () => {
      setMovieData ({
        name: editMode.isOn ? editMode.movie.name : '',
        rating: editMode.isOn ? editMode.movie.rating : '',
      });
    },
    [editMode]
  );

  const [errors, setErrors] = useState ({});

  const closeHandler = () => {
    closeSidebar ();
    setMovieData ({
      name: '',
      rating: '',
    });
  };

  const onChangeHandler = e => {
    setMovieData ({
      ...movieData,
      [e.target.name]: e.target.value,
    });

    let name = e.target.name;

    if (e.target.value === '') {
      setErrors ({
        ...errors,
        [e.target.name]: `Enter Enter Movie${e.target.name}`,
      });
    } else {
      let newList = {...errors};
      delete newList[name];
      setErrors (newList);
    }
  };

  const submitHandler = e => {
    e.preventDefault ();

    let err = {};
    if (!movieData.name) err.name = 'Please enter Movie name';
    if (!movieData.rating) err.rating = 'Please enter Movie rating';
    setErrors (err);

    if (Object.getOwnPropertyNames (err).length !== 0) return;

    if (editMode.isOn) {
      editMovie ({
        id: editMode.movie.id,
        ...movieData,
      });
    } else {
      addMovie (movieData);
    }

    setMovieData ({
      name: '',
      rating: '',
    });
  };

  return (
    <div className="sidebar-content">
      <h3>Add Your Favorite Movie</h3>
      <form onSubmit={submitHandler}>
        <FormInput
          id="movie name"
          label="Movie Name"
          name="name"
          type="text"
          onChange={onChangeHandler}
          value={movieData.name}
          error={errors.name}
        />
        <FormInput
          id="movie rating"
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
            type="button"
          >
            Submit Movie
            {/* <input type="submit" value="Submit" /> */}
          </Button>
          <Button
            color="secondary"
            size="small"
            variant="contained"
            onClick={closeHandler}
            type="button"
            style={{marginLeft: '10px'}}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
