import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Select, MenuItem, List, Pagination, CircularProgress, Snackbar, Paper, Theme, createStyles } from '@mui/material';
import './RepoList.css';
import { GET_REPOS } from '../../graphql/queries';
import Repo from '../Repo/Repo';

function RepoList() {
  const [pageItems, setPageItems] = useState(10);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const { loading, data, error: queryError } = useQuery(GET_REPOS, {
    variables: { pageItems, page },
  });

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

    
        <Paper style={{ maxHeight: '800px', overflow: 'auto' }}>
            <List>
                {data?.repositories.map((repo: any) => (
                <Repo key={repo.name} name={repo.name} size={repo.size} owner={repo.owner} />
                ))}
            </List>
        </Paper>


        <div className='pagination'>
            <Pagination
                count={Math.ceil(data?.repositories.length / pageItems)}
                page={page}
                onChange={(e, value) => setPage(value)}
            />
            <Select
                className='page-items'
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
