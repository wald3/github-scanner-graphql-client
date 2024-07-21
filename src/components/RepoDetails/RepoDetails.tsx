import { useQuery } from '@apollo/client';
import { CircularProgress, List, ListItem, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { GET_REPO_DETAILS } from './../../graphql/queries';
import './RepoDetails.css';

import {
  FindInPageOutlined as FindInPageOutlinedIcon,
  InsertDriveFileOutlined as InsertDriveFileOutlinedIcon,
  LockOpenOutlined as LockOpenOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from '@mui/icons-material';
import WebhookList from '../sub-components/WebHookList/WebhookList';
interface RepoDetailsProps {
  owner: string;
  repoName: string;
}

function RepoDetails({ owner, repoName }: RepoDetailsProps) {
  const [error, setError] = useState<string | null>(null);
  const {
    loading,
    data,
    error: queryError,
  } = useQuery(GET_REPO_DETAILS, {
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

  const {
    private: isPrivate,
    fileCount,
    fileContent,
    webhooks,
  } = data.repositoryDetails;

  return (
    <div className="repo-details">
      {error && (
        <Snackbar open={true} message={error} autoHideDuration={5000} />
      )}

      <div className="repo-details-header">
        <div className="repo-private">
          {isPrivate ? (
            <LockOutlinedIcon className="svg_icons" />
          ) : (
            <LockOpenOutlinedIcon className="svg_icons" />
          )}
          <div className="repo-details-text">
            {isPrivate ? 'Private' : 'Public'}
          </div>
        </div>
        <div className="repo-file-count">
          <InsertDriveFileOutlinedIcon className="svg_icons" />
          <div className="repo-details-text">{fileCount}</div>
        </div>
        <div className="repo-file-exists">
          <FindInPageOutlinedIcon className="svg_icons" />
          <div className="repo-details-text">
            {fileContent ? 'Exists' : 'Not Found'}
          </div>
        </div>
      </div>

      <WebhookList webhooks={['a'.repeat(30), 'b'.repeat(30)]}></WebhookList>

      <List>
        {webhooks?.map((hook: string, index: number) => (
          <ListItem key={index}>{hook}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default RepoDetails;
