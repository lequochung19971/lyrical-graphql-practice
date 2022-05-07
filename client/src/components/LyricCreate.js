import React from 'react';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { ADD_LYRIC_TO_SONG } from '../mutations';

const LyricCreate = (props) => {
  const { songId } = props;
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = e.target.elements.lyric.value;
    e.target.elements.lyric.value = '';

    addLyricToSong({
      variables: {
        content: value,
        songId,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField name="lyric" label="Lyric" variant="standard" style={{ width: '400px' }} />
    </form>
  );
};

export default LyricCreate;
