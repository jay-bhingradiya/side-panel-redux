import React from "react";
import Sidebar from "react-sidebar";
import { useState } from "react";
import MovieForm from "./MovieForm";
import { useDispatch, useSelector } from "react-redux";
import movieActions from "../redux/movies/actions";
import Button from "@material-ui/core/Button";
import MovieTable from "./MovieTable";

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [showSidebar, setshowSidebar] = useState(false);

  const deleteHandler = (id) => {
    dispatch(movieActions.deleteMovie(id));
  };

  const setOpenHandler = (data = false) => {
    setshowSidebar(data);
  };

  return (
    <Sidebar
      sidebar={<MovieForm closeSidebar={setOpenHandler} />}
      open={showSidebar}
      onSetOpen={(data) => setOpenHandler(data)}
      pullRight={true}
      sidebarClassName={"sidebarContentMain"}
      overlayClassName={"sidebarOverlay"}
    >
      <div className="tableContent">
        <header>
          <h1>Movie List</h1>
        </header>
        <MovieTable movies={movies} onDelete={deleteHandler} />
        <Button
          onClick={() => setshowSidebar(true)}
          color="primary"
          variant="contained"
          style={{ marginTop: "16px" }}
        >
          Add Movie
        </Button>
      </div>
    </Sidebar>
  );
};

export default SidebarComponent;
