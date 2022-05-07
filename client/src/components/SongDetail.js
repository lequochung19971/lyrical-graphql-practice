import React from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_SONG } from '../queries';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const songId = params.id;

  const { loading, data } = useQuery(GET_SONG, {
    variables: {
      songId,
    },
  });

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Box padding={2}>
      <Button color="primary" onClick={() => navigate('/', { replace: true })}>
        Back
      </Button>
      <Typography variant="h3" color="initial">
        Song Detail
      </Typography>
      <LyricList songId={songId} lyrics={data.song.lyrics} />
      <LyricCreate songId={songId} />
    </Box>
  );
};

export default SongDetail;
