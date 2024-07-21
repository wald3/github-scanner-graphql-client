import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import RepoList from './components/RepoList/RepoList';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
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
