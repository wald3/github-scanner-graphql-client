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

  const handleToggle = () => {
    if (!isLoading) {
      setIsLoading(true);
      setIsOpen(!isOpen);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="repo-container">
      <ListItem
        button
        onClick={handleToggle}
        disabled={isLoading}
        className="repo-item"
      >
        <div className="repo-name">
          <RepoIcon></RepoIcon>
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
        //   invisible={!isLoading && !isOpen}
      />
      {isOpen && !isLoading && (
        <RepoDetails owner={owner.login} repoName={name} />
      )}
    </div>
  );
}

export default Repo;
