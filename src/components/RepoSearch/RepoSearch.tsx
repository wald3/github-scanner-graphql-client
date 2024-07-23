import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import RepoList from '../RepoList/RepoList';
import './RepoSearch.css';

function RepoSearch() {
  const [pageItems, setPageItems] = useState(100);
  const [token, setToken] = useState('');
  const [searchToken, setSearchToken] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);

  const handleSearch = () => {
    setSearchToken(token);
    setSearchInitiated(true);
  };

  return (
    <div className="repo-search">
      <div className="pagination">
        <TextField
          style={{ width: '60%' }}
          id="github-token"
          type="password"
          color="info"
          label="GitHub Access Token"
          placeholder="Paste your GitHub Token here"
          focused
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button id="search" variant="contained" onClick={handleSearch}>
          Find Repositories
        </Button>
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
      <RepoList
        pageItems={pageItems}
        token={searchToken}
        searchInitiated={searchInitiated}
      />
    </div>
  );
}

export default RepoSearch;
