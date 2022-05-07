import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_SONG } from '../mutations';
import { GET_SONGS } from '../queries';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

const SongList = () => {
  const { loading, error, data, refetch } = useQuery(GET_SONGS, {
    // fetchPolicy: 'cache-and-network',
  });
  const [deleteSong] = useMutation(DELETE_SONG);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return `Error ${error.message}`;
  }

  console.log(data);

  const handleDelete = async (id) => {
    await deleteSong({
      variables: {
        id,
      },
    });
    refetch();
  };
  return (
    <Box width="400px" position="relative" paddingBottom="50px">
      <Button
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
        as={Link}
        to="/songCreate"
        variant="contained"
        color="primary"
        aria-label="upload picture"
        component="span"
        endIcon={<AddIcon />}>
        Create
      </Button>
      <List>
        {data.songs.map((song) => (
          <ListItem
            key={song.id}
            disablePadding
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(song.id)}>
                <DeleteIcon />
              </IconButton>
            }>
            <ListItemButton onClick={() => navigate(`/songDetail/${song.id}`, { replace: true })}>
              <ListItemText primary={song.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SongList;
