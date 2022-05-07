import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SongList from './components/SongList';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      SongType: {
      },
    },
  }),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route index element={<Navigate to="/songList" replace />} />
          <Route path="/songList" element={<SongList />} />
          <Route path="/songCreate" element={<SongCreate />} />
          <Route path="/songDetail/:id" element={<SongDetail />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
