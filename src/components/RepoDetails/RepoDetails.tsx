import { useQuery } from '@apollo/client';
import {
  FindInPageOutlined as FindInPageOutlinedIcon,
  InsertDriveFileOutlined as InsertDriveFileOutlinedIcon,
  LockOpenOutlined as LockOpenOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
} from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSnackbar } from '../sub-components/SnackbarAlert/SnackbarAlert';
import WebhookList from '../sub-components/WebHookList/WebhookList';
import { GET_REPO_DETAILS } from './../../graphql/queries';
import './RepoDetails.css';

interface RepoDetails {
  repositoryDetails: {
    private: boolean;
    fileCount: number;
    fileContent: string | null;
    webhooks: Webhook[];
  };
}

export interface Webhook {
  id: number;
  url: string;
  type: string;
  name: string;
  active: boolean;
}

interface RepoDetailsProps {
  owner: string;
  repoName: string;
  onFetchComplete: (data: RepoDetails | null, error: any) => void;
  existingData: RepoDetails | null;
}

function RepoDetails({
  owner,
  repoName,
  onFetchComplete,
  existingData,
}: RepoDetailsProps) {
  const { showSnackbar } = useSnackbar();

  const { loading, data, error } = useQuery<RepoDetails>(GET_REPO_DETAILS, {
    variables: { owner, repoName },
    skip: !!existingData,
    onCompleted: (data) => onFetchComplete(data, null),
    onError: (error) => {
      // console.error({ error });
      const msg = (error as any).networkError?.['result']?.['errors']?.[0]?.[
        'message'
      ];

      if (msg) showSnackbar(msg);
      if (error.graphQLErrors && error.graphQLErrors?.[0]?.message) {
        showSnackbar(error.graphQLErrors[0].message);
      }

      onFetchComplete(null, error);
    },
  });

  if (loading) return null;
  if (error) return null;

  const repoData = existingData || data;
  if (!repoData) return null;

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

      <div>
        <div className="repo-webhooks">
          <p>Active Webhooks: {webhooks.length}</p>
          {webhooks.length > 0 && <WebhookList webhooks={webhooks} />}
        </div>
        {fileContent && (
          <div className="repo-file-content">
            <p>File content: </p>

            <SyntaxHighlighter showLineNumbers language="yaml" style={dark}>
              {fileContent}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
}

export default RepoDetails;
