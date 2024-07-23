import { useQuery } from '@apollo/client';
import {
  FindInPageOutlined as FindInPageOutlinedIcon,
  InsertDriveFileOutlined as InsertDriveFileOutlinedIcon,
  LockOpenOutlined as LockOpenOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from '@mui/icons-material';
import { List, ListItem } from '@mui/material';
import { useSnackbar } from '../sub-components/SnackbarAlert/SnackbarAlert';
import WebhookList from '../sub-components/WebHookList/WebhookList';
import { GET_REPO_DETAILS } from './../../graphql/queries';
import './RepoDetails.css';

interface RepoDetailsProps {
  owner: string;
  repoName: string;
  onFetchComplete: (data: any, error: any) => void;
  existingData: any;
}

function RepoDetails({
  owner,
  repoName,
  onFetchComplete,
  existingData,
}: RepoDetailsProps) {
  const { showSnackbar } = useSnackbar();

  const { loading, data, error } = useQuery(GET_REPO_DETAILS, {
    variables: { owner, repoName },
    skip: !!existingData,
    onCompleted: (data) => onFetchComplete(data, null),
    onError: (error) => {
      const msg = (error as any).networkError['result']['errors'][0]['message'];
      showSnackbar(msg);
      onFetchComplete(null, error);
    },
  });

  if (loading) return null;
  if (error) return null;

  const repoData = existingData || data;
  const {
    private: isPrivate,
    fileCount,
    fileContent,
    webhooks,
  } = repoData.repositoryDetails;

  return (
    <div className="repo-details">
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

      <WebhookList webhooks={webhooks} />

      <List>
        {webhooks?.map((hook: string, index: number) => (
          <ListItem key={index}>{hook}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default RepoDetails;
