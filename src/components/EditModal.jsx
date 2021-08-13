import {Button} from '@material-ui/core';
import React, {useEffect, useState, Fragment} from 'react';
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux';
import movieActions from '../redux/movies/actions';
import FormInput from './FormInput';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement ('#root');

const EditModal = ({movieId}) => {
  const dispatch = useDispatch ();
  const [modalIsOpen, setIsOpen] = useState (false);
  const movies = useSelector (state => state.movies.movies);
  const currentMovie = movies.find (movie => movie.id === movieId);
  const [movieData, setMovieData] = useState ({
    name: '',
    rating: '',
  });

  useEffect (
    () => {
      setMovieData ({
        name: currentMovie.name,
        rating: currentMovie.rating,
      });
    },
    [currentMovie]
  );

  function openModal () {
    setIsOpen (true);
  }

  function closeModal () {
    setIsOpen (false);
  }

  const [errors, setErrors] = useState ({});

  const closeHandler = () => {
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

    let newList = [...movies];
    let updatedMovieIndex = newList.findIndex (
      movie => movie.id === currentMovie.id
    );
    let editedMovie = {
      id: currentMovie.id,
      name: movieData.name,
      rating: movieData.rating,
    };
    newList[updatedMovieIndex] = editedMovie;
    dispatch (movieActions.editMovie (newList));

    setMovieData ({
      name: '',
      rating: '',
    });
    setIsOpen (false);
  };

  return (
    <Fragment>
      <Button
        color="primary"
        onClick={openModal}
        size="small"
        variant="contained"
      >
        Edit
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>Edit Movie - {currentMovie.name}</h3>
        <form onSubmit={submitHandler}>
          <FormInput
            id="name"
            label="Movie Name"
            name="name"
            type="text"
            onChange={onChangeHandler}
            value={movieData.name}
            error={errors.name}
          />
          <FormInput
            id="rating-name"
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
          <input type="submit" value="Submit" />
          <button onClick={() => setIsOpen (false)} type="button">
            Cancel
          </button>
        </form>
      </Modal>
    </Fragment>
  );
};

export default EditModal;
