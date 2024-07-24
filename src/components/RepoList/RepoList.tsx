import { ApolloError, useQuery } from '@apollo/client';
import { Error, Search } from '@mui/icons-material';
import { CircularProgress, List, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { GET_REPOS } from '../../graphql/queries';
import Repo from '../Repo/Repo';
import { useSnackbar } from '../sub-components/SnackbarAlert/SnackbarAlert';
import './RepoList.css';

interface RepoListProps {
  pageItems: number;
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefetchFunction: (refetchFunction: (variables?: any) => void) => void;
}

function RepoList({ pageItems, token, setRefetchFunction }: RepoListProps) {
  const { showSnackbar } = useSnackbar();
  const [queryError, setQueryError] = useState<ApolloError | null>(null);

  // console.log({
  //   useQuery: token ? `calling + ${token}` : `skip + refresh`,
  // });
  const { loading, data, error, refetch } = useQuery(GET_REPOS, {
    variables: { pageItems, page: 1, token },
    skip: !token,
    onError: (error) => {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => console.error(message));
      }
      showSnackbar(error.message);
      setQueryError(error);
    },
  });

  useEffect(() => {
    setRefetchFunction(() => refetch);
    // console.log({ 'refresh with token': token });
  }, [setRefetchFunction, refetch]);

  return (
    <div className="repo-list">
      <Paper
        style={{
          width: '100%',
          height: '1000px',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: !data?.repositories ? 'center' : 'flex-start',
        }}
      >
        {!data?.repositories && (
          <div id="icons">
            {loading ? (
              <CircularProgress />
            ) : error?.message ? (
              <Error style={{ fontSize: 100 }} />
            ) : (
              <Search style={{ fontSize: 100 }} />
            )}
          </div>
        )}

        <List style={{ justifySelf: 'start' }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.repositories?.map((repo: any) => (
            <Repo
              key={`${repo.owner.login}:${repo.name}`}
              name={repo.name}
              size={repo.size}
              owner={repo.owner}
              accessToken={token}
            />
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default RepoList;
