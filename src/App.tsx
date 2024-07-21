import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import RepoList from './components/RepoList/RepoList';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RepoList />
      </div>
    </ApolloProvider>
  );
}

export default App;
