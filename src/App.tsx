import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import './App.css';
import RepoSearch from './components/RepoSearch/RepoSearch';
import { SnackbarProvider } from './components/sub-components/SnackbarAlert/SnackbarAlert';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

function App() {
  const [refetchFunction, setRefetchFunction] = useState<
    ((variables?: any) => void) | null
  >(null);

  const handleRefetch = (token: string) => {
    if (refetchFunction) {
      refetchFunction({ token });
    }
  };

  return (
    <SnackbarProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <RepoSearch
            onRefetch={handleRefetch}
            setRefetchFunction={setRefetchFunction}
          />
        </div>
      </ApolloProvider>
    </SnackbarProvider>
  );
}

export default App;
