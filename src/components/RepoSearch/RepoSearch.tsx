import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import RepoList from '../RepoList/RepoList';
import './RepoSearch.css';

type SearchProps = {
  onRefetch: (token: string) => void;
  setRefetchFunction: (refetchFunction: (variables?: any) => void) => void;
};

function RepoSearch({ onRefetch, setRefetchFunction }: SearchProps) {
  const [pageItems, setPageItems] = useState(10);
  const [inputValue, setInputValue] = useState('');
  const [token, setToken] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleRefetchClick = () => {
    setToken(inputValue);
    onRefetch(inputValue);
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
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button id="search" variant="contained" onClick={handleRefetchClick}>
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
        token={token}
        setRefetchFunction={setRefetchFunction}
      />
    </div>
  );
}

export default RepoSearch;
