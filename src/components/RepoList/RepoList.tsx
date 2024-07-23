import { useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, List, Paper } from '@mui/material';
import { GET_REPOS } from '../../graphql/queries';
import Repo from '../Repo/Repo';
import { useSnackbar } from '../sub-components/SnackbarAlert/SnackbarAlert';
import './RepoList.css';

interface RepoListProps {
  pageItems: number;
  token: string;
  searchInitiated: boolean;
}

function RepoList({ pageItems, token, searchInitiated }: RepoListProps) {
  const { showSnackbar } = useSnackbar();

  const { loading, data, error } = useQuery(GET_REPOS, {
    variables: { pageItems, page: 1, token },
    skip: !searchInitiated,
    onError: (error) => {
      console.log(`RepoList ${':'}`, { error });

      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => console.error(message));
      }
      showSnackbar(error.message);
    },
  });

  if (!searchInitiated || (searchInitiated && loading)) {
    return (
      <div className="icon-holder">
        <Paper
          className="icon-holder"
          style={{ minHeight: '1000px', overflow: 'auto' }}
        >
          <div className="search-icon">
            {loading ? (
              <CircularProgress />
            ) : (
              <SearchIcon style={{ fontSize: 100, color: 'gray' }} />
            )}
          </div>
        </Paper>
      </div>
    );
  }

  if (error) return null;

  return (
    <div className="repo-list">
      <Paper style={{ maxHeight: '1000px', overflow: 'auto' }}>
        <List>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.repositories.map((repo: any) => (
            <Repo
              key={`${repo.owner.login}:${repo.name}`}
              name={repo.name}
              size={repo.size}
              owner={repo.owner}
            />
          ))}
        </List>
      </Paper>
    </div>
  );
}

export default RepoList;
