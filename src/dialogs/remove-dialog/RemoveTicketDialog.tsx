import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import "./RemoveDialog.scss";

interface ITicketInfo {
  code: string;
  name: string;
}

interface IProps {
  open: boolean;
  ticket_info: ITicketInfo;
  onRemove: () => void;
  onCancel?: () => void;
}

export const RemoveTicketDialog = (props: IProps) => {
  const { open, ticket_info, onRemove, onCancel = () => {} } = props;

  const _onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove();
  };

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={_onCancel} className="remove-dialog">
      <DialogTitle>{`Remove Ticket`}</DialogTitle>
      <DialogContent>
        <p>
          Do you really wish to remove the <b>Ticket</b>:
          <br />
          <b>{`${ticket_info.code}: ${ticket_info.name}`}</b>
        </p>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={_onCancel}>
          Cancel
        </Button>
        <Button color="success" variant="outlined" onClick={_onRemove}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};
