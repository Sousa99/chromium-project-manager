import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import "./RemoveDialog.scss";

interface IProjectInfo {
  name: string;
}

interface IProps {
  open: boolean;
  project_info: IProjectInfo;
  onRemove: () => void;
  onCancel?: () => void;
}

export const RemoveProjectDialog = (props: IProps) => {
  const { open, project_info, onRemove, onCancel = () => {} } = props;

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
      <DialogTitle>{`Remove Project`}</DialogTitle>
      <DialogContent>
        <p>
          Do you really wish to remove the <b>Project</b>:
          <br />
          <b>{project_info.name}</b>
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
