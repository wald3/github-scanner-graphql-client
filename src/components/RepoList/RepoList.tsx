import { useQuery } from '@apollo/client';
import { CircularProgress, List, MenuItem, Paper, Select } from '@mui/material';
import { useState } from 'react';
import { GET_REPOS } from '../../graphql/queries';
import Repo from '../Repo/Repo';
import { useSnackbar } from '../sub-components/SnackbarAlert/SnackbarAlert';
import './RepoList.css';

function RepoList() {
  const [pageItems, setPageItems] = useState(10);
  const { showSnackbar } = useSnackbar();

  const { loading, data, error } = useQuery(GET_REPOS, {
    variables: { pageItems, page: 1 },
    onError: (error) => {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => console.error(message));
      }
      showSnackbar(error.message);
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return null;

  return (
    <div className="repo-list">
      <Paper style={{ maxHeight: '800px', overflow: 'auto' }}>
        <List>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {data?.repositories.map((repo: any) => (
            <Repo
              key={repo.name}
              name={repo.name}
              size={repo.size}
              owner={repo.owner}
            />
          ))}
        </List>
      </Paper>

      <div className="pagination">
        <Select
          className="page-items"
          value={pageItems}
          onChange={(e) => setPageItems(e.target.value as number)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>
    </div>
  );
}

export default RepoList;
