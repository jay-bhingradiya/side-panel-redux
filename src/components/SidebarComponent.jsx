import React from 'react';
import Sidebar from 'react-sidebar';
import {useState} from 'react';
import MovieForm from './MovieForm';
import {useDispatch, useSelector} from 'react-redux';
import movieActions from '../redux/movies/actions';
import EditModal from './EditModal';
import Button from '@material-ui/core/Button';
import MovieTable from './MovieTable';

const SidebarComponent = () => {
  const dispatch = useDispatch ();
  const movies = useSelector (state => state.movies.movies);
  const [showSidebar, setshowSidebar] = useState (false);
  const [editMode, setEditMode] = useState ({
    isOn: false,
    movie: null,
    name: '',
  });

  const editHandler = id => {
    const editMovie = movies.find (movie => movie.id === id);

    setEditMode ({
      isOn: true,
      movie: editMovie,
    });
    setshowSidebar (true);
  };

  const editMovie = movieData => {
    let newList = [...movies];
    let updatedMovie = newList.find (movie => movie.id === editMode.movie.id);
    let updatedMovieIndex = newList.findIndex (
      movie => movie.id === editMode.movie.id
    );

    updatedMovie = movieData;
    newList[updatedMovieIndex] = updatedMovie;

    dispatch (movieActions.editMovie (newList));
    setEditMode ({
      isOn: false,
      movie: {},
    });
    setshowSidebar (false);
  };

  const deleteHandler = id => dispatch (movieActions.deleteMovie (id));

  const addMovie = movieData => {
    const newMovie = {
      id: Math.random (),
      ...movieData,
    };

    setshowSidebar (false);
    dispatch (movieActions.addMovie (newMovie));
  };

  const setOpenHandler = (data = false) => {
    setEditMode ({
      isOn: false,
      movie: {},
    });
    setshowSidebar (data);
  };

  return (
    <Sidebar
      sidebar={
        <MovieForm
          editMovie={editMovie}
          addMovie={addMovie}
          editMode={editMode}
          closeSidebar={setOpenHandler}
        />
      }
      open={showSidebar}
      onSetOpen={data => setOpenHandler (data)}
      pullRight={true}
      sidebarClassName={'sidebarContentMain'}
    >
      <div className="tableContent">

        <MovieTable movies={movies} onDelete={deleteHandler} />
        <Button
          onClick={() => setshowSidebar (true)}
          color="primary"
          variant="contained"
          style={{marginTop: '16px'}}
        >
          Add Movie
        </Button>
      </div>
    </Sidebar>
  );
};

export default SidebarComponent;
