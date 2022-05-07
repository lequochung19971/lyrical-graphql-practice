import { useMutation } from '@apollo/client';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_SONG } from '../mutations';
import { GET_SONGS } from '../queries';

const SongCreate = () => {
  const [addSong, { data }] = useMutation(ADD_SONG);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const test = await addSong({
      variables: {
        title,
      },
      refetchQueries: [{ query: GET_SONGS }],
    });
    // navigate('/', { replace: true });
    e.target.elements.title.value = '';
    console.dir(test);
  };

  const back = () => {
    navigate('/', { replace: true });
  };

  return (
    <Box padding={2}>
      <Button color="primary" onClick={back}>
        Back
      </Button>
      <Typography variant="h3">Create a New Song</Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <TextField
          variant="standard"
          name="title"
          label="Song Title"
          style={{ marginRight: '16px' }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SongCreate;
