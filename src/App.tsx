import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import RepoList from './components/RepoList/RepoList';
import { SnackbarProvider } from './components/sub-components/SnackbarAlert/SnackbarAlert';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <SnackbarProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <RepoList />
        </div>
      </ApolloProvider>
    </SnackbarProvider>
  );
}

export default App;
