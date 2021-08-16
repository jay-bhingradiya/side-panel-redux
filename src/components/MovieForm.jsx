import Form from "./Form";

const MovieForm = ({ closeSidebar }) => {
  const initialData = {
    id: "",
    name: "",
    rating: "",
  };

  return (
    <div className="sidebar-content">
      <Form
        initialMovieData={initialData}
        title="Add Your Favorite Movie"
        closeSidebar={closeSidebar}
      />
    </div>
  );
};

export default MovieForm;
