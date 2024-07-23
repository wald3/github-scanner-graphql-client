import { Divider, List, ListItem, ListItemText } from '@mui/material';

interface WebhookListProps {
  webhooks: string[];
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
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {props?.webhooks.map((webhook: any) => (
        <ListItem key={webhook}>
          <ListItemText primary={webhook} />
          <Divider className="devider" />
        </ListItem>
      ))}
    </List>
  );
}

export default WebhookList;
