import { gql } from '@apollo/client';

export const GET_SONGS = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

export const GET_SONG = gql`
  query GetSong($songId: ID!) {
    song(id: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
