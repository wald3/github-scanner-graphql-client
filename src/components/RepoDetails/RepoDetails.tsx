import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAILS } from './../../graphql/queries';
import { CircularProgress, Typography, List, ListItem, Snackbar } from '@mui/material';
import './RepoDetails.css';

interface RepoDetailsProps {
  owner: string;
  repoName: string;
}

function RepoDetails({ owner, repoName }: RepoDetailsProps) {
  const [error, setError] = useState<string | null>(null);
  const { loading, data, error: queryError } = useQuery(GET_REPO_DETAILS, {
    variables: { owner, repoName },
  });

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [queryError]);

  if (loading) return <CircularProgress />;
  
  if (queryError) return null;

  const { name, size, private: isPrivate, fileCount, fileContent, webhooks } = data.repositoryDetails;

  return (
    <div className="repo-details">
      {error && (
        <Snackbar
          open={true}
          message={error}
          autoHideDuration={5000}
        />
      )}
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">Size: {size}</Typography>
      <Typography variant="body1">Private: {isPrivate ? 'Yes' : 'No'}</Typography>
      <Typography variant="body1">File Count: {fileCount}</Typography>
      <Typography variant="body1">File Content: {fileContent}</Typography>
      <Typography variant="body1">Webhooks:</Typography>
      <List>
        {webhooks?.map((hook: string, index: number) => (
          <ListItem key={index}>{hook}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default RepoDetails;
