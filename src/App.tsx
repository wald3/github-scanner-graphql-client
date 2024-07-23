import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import RepoSearch from './components/RepoSearch/RepoSearch';
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
          <RepoSearch />
        </div>
      </ApolloProvider>
    </SnackbarProvider>
  );
}

export default App;
