import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Button} from '@material-ui/core';
import EditModal from './EditModal';

const useStyles = makeStyles ({
  table: {
    maxWidth: '650px',
    backgroundColor: '#f2edff87',
    borderRadius: '10px',
  },
});

const MovieTable = ({movies, onDelete}) => {
  const classes = useStyles ();

  return (
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Movie Name</TableCell>
          <TableCell align="center">Rating</TableCell>
          <TableCell align="center">actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {movies.map ((movie, key) => (
          <TableRow key={movie.id}>
            <TableCell>
              {movie.name}
            </TableCell>
            <TableCell align="center">{movie.rating}</TableCell>
            <TableCell align="center">
              <EditModal movieId={movie.id} />
              <Button
                color="secondary"
                onClick={() => onDelete (movie.id)}
                variant="contained"
                size="small"
                style={{marginLeft: '10px'}}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MovieTable;
