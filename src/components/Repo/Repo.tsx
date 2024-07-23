import { Badge, Box, Chip, CircularProgress, ListItem } from '@mui/material';
import { useState } from 'react';
import RepoDetails from '../RepoDetails/RepoDetails';
import './Repo.css';

interface User {
  login: string;
}

interface RepoProps {
  name: string;
  size: number;
  owner: User;
}

const RepoIcon = () => {
  return (
    <img
      src="https://icongr.am/octicons/repo.svg?size=20&color=f2f2f2"
      alt="GitHub Repo Icon"
      style={{ width: '20px', height: '20px', padding: '5px' }}
    />
  );
};

function Repo({ name, size, owner }: RepoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleToggle = () => {
    if (isLoading) return;

    if (data) {
      setIsOpen(!isOpen);
    } else if (error) {
      setError(null);
      setIsOpen(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setIsOpen(true);
    }
  };

  const handleFetchComplete = (fetchedData: any, fetchError: any) => {
    if (fetchError) {
      setIsLoading(false);
      setIsOpen(false);
      setError(fetchError);
    } else {
      setIsLoading(false);
      setData(fetchedData);
      setError(null);
    }
  };

  return (
    <div className={`repo-container ${error ? 'shake' : ''}`}>
      <ListItem
        button
        onClick={handleToggle}
        disabled={isLoading}
        className="repo-item"
      >
        <div className="repo-name">
          <RepoIcon />
          <p>{name}</p>
        </div>
        <div className="repo-info">
          <div>{owner.login}</div>
          <Chip
            label={<Box sx={{ color: 'gray' }}>{size + ' KB'}</Box>}
            variant="outlined"
            className="repo-size"
          />
        </div>
      </ListItem>
      <Badge
        className="repo-badge"
        badgeContent={isLoading ? <CircularProgress size={10} /> : '✔'}
        color={isLoading ? 'warning' : 'success'}
        invisible={!isLoading && !data}
      />
      {isOpen && (
        <RepoDetails
          owner={owner.login}
          repoName={name}
          onFetchComplete={handleFetchComplete}
          existingData={data}
        />
      )}
    </div>
  );
}

export default Repo;
