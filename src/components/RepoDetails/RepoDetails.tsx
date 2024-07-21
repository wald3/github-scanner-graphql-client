import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPO_DETAILS } from './../../graphql/queries';
import { CircularProgress, Typography, List, ListItem, Snackbar, Chip, Box } from '@mui/material';
import './RepoDetails.css';

import { 
  FindInPageOutlined as FindInPageOutlinedIcon, 
  InsertDriveFileOutlined as InsertDriveFileOutlinedIcon, 
  LockOpenOutlined as LockOpenOutlinedIcon,
   LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import WebhookList from '../sub-components/WebHookList/WebhookList';
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

      <div className='repo-details-header'>
        <div className='repo-private'>



          <Chip label={<Box sx={{ color: "var(--color-fg-muted)" }}>        {isPrivate ? (
          <LockOutlinedIcon />
        ) : (
          <LockOpenOutlinedIcon />
        )}{isPrivate ? 'Private' : 'Public'}</Box>} variant="outlined"/>
        </div>
        <div className='repo-file-count'>
          <InsertDriveFileOutlinedIcon/>
          <Chip label={<Box sx={{ color: "var(--color-fg-muted)" }}>{fileCount}</Box>} variant="outlined" />
        </div>
        <div className='repo-file-exists'>
          <FindInPageOutlinedIcon />
          <Chip label={<Box sx={{ color: "var(--color-fg-muted)" }}>{fileContent ? 'Exists' : 'Not Found'}</Box>} variant="outlined" />
        </div>
      </div>

      <WebhookList webhooks = {['a'.repeat(30), 'b'.repeat(30)]}></WebhookList>

      <List>
        {webhooks?.map((hook: string, index: number) => (
          <ListItem key={index}>{hook}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default RepoDetails;
