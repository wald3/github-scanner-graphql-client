import React from 'react';
import { useQuery } from '@apollo/client';
import { CircularProgress, Typography, List, ListItem } from '@mui/material';
import './RepoDetails.css';
import { GET_REPO_DETAILS } from '../../graphql/queries';

interface RepoDetailsProps {
  owner: string;
  repoName: string;
}

function RepoDetails({ owner, repoName }: RepoDetailsProps) {
  const { loading, data } = useQuery(GET_REPO_DETAILS, {
    variables: { owner, repoName },
  });

  if (loading) return <CircularProgress />;

  const { name, size, private: isPrivate, fileCount, fileContent, webhooks } = data.repositoryDetails;

  return (
    <div className="repo-details">
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">Size: {size}</Typography>
      <Typography variant="body1">Private: {isPrivate ? 'Yes' : 'No'}</Typography>
      <Typography variant="body1">File Count: {fileCount}</Typography>
      <Typography variant="body1">File Content: {fileContent}</Typography>
      <Typography variant="body1">Webhooks:</Typography>
      <List>
        {webhooks.map((hook: string, index: number) => (
          <ListItem key={index}>{hook}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default RepoDetails;
