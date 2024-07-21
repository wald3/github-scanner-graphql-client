import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Select, MenuItem, List, ListItem, Pagination, CircularProgress, Snackbar } from '@mui/material';
import './RepoList.css';
import RepoDetails from '../RepoDetails/RepoDetails';
import { GET_REPOS } from '../../graphql/queries';

function RepoList() {
  const [pageItems, setPageItems] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loading, data, error: queryError } = useQuery(GET_REPOS,{
    variables: { pageItems, page },
  });

  if (queryError) {
    console.error('Error');
    
    console.error(queryError);
  }
    

  React.useEffect(() => {
    if (queryError) {
      setError(queryError.message);
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [queryError]);

  if (loading) return <CircularProgress />;
  
  if (queryError) return null;

  return (
    <div className="repo-list">
      {error && (
        <Snackbar
          open={true}
          message={error}
          autoHideDuration={5000}
        />
      )}
      <Select
        value={pageItems}
        onChange={(e) => setPageItems(e.target.value as number)}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <List>
        {data?.repositories.map((repo: any) => (
          <ListItem
            key={repo.name}
            onClick={() => setSelectedRepo(selectedRepo === repo.name ? null : repo.name)}
            button
          >
            {repo.name}
            {selectedRepo === repo.name && <RepoDetails owner={repo.owner} repoName={repo.name} />}
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(data?.repositories.length / pageItems)}
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </div>
  );
}

export default RepoList;
