import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { Webhook } from '../../RepoDetails/RepoDetails';

interface WebhookListProps {
  webhooks: Webhook[];
}

const style = {
  p: 0,
  width: '100%',
  borderRadius: 'var(--border-radius-medium)',
  border: 'var(--border-width-thin)solid',
  borderColor: 'var(--main-border-color)',
  backgroundColor: 'var(--main-background-color)',
};

function WebhookList(props: WebhookListProps) {
  return (
    <List sx={style}>
      {props?.webhooks.map((webhook: Webhook) => (
        <ListItem key={webhook.id}>
          <ListItemText primary={webhook.url} />
          <Divider className="devider" />
        </ListItem>
      ))}
    </List>
  );
}

export default WebhookList;
