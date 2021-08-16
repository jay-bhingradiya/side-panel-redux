import { Button } from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import Form from "./Form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const EditModal = ({ movieId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const movies = useSelector((state) => state.movies.movies);
  const currentMovie = movies.find((movie) => movie.id === movieId);
  const [movieData, setMovieData] = useState({
    name: "",
    rating: "",
  });

  useEffect(() => {
    setMovieData({
      id: currentMovie.id,
      name: currentMovie.name,
      rating: currentMovie.rating,
    });
  }, [currentMovie]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
        <Form
          initialMovieData={movieData}
          title={`Edit Movie - ${currentMovie.name}`}
          closeSidebar={closeModal}
          mode="edit"
        />
      </Modal>
    </Fragment>
  );
};

export default EditModal;
