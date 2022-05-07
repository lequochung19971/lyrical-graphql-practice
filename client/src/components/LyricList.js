import { IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useMutation } from '@apollo/client';
import { LIKE_LYRIC } from '../mutations';

const LyricList = (props) => {
  const { lyrics = [] } = props;
  const [likeLyric] = useMutation(LIKE_LYRIC);

  const like = (id, likes) => {
    likeLyric({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  };

  return (
    <Box width="400px" position="relative" paddingBottom="50px">
      <List>
        {lyrics.map((l) => (
          <ListItem
            key={l.id}
            disablePadding
            secondaryAction={
              <Box display="flex" alignItems="center">
                <span style={{ paddingRight: '16px' }}>{l.likes}</span>
                <IconButton edge="end" aria-label="delete" onClick={() => like(l.id, l.likes)}>
                  <ThumbUpIcon />
                </IconButton>
              </Box>
            }>
            <ListItemButton onClick={() => {}}>
              <ListItemText primary={l.content} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LyricList;
