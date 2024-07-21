import { Divider, List, ListItem, ListItemText } from '@mui/material';

interface WebhookListProps {
  webhooks: string[];
}

function WebhookList(props: WebhookListProps) {
  return (
    <List className="webhook-list">
      {props?.webhooks.map((webhook: string) => (
        <ListItem key={webhook}>
          <ListItemText primary={webhook} />
          <Divider />
        </ListItem>
      ))}
    </List>
  );
}

export default WebhookList;
