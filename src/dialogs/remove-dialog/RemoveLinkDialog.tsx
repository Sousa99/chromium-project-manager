import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

import './RemoveDialog.scss';

interface ILinkInfo {
  tooltip: string,
  url: string
}

interface IProps {
  open: boolean,
  link_info: ILinkInfo,
  onRemove: () => void,
  onCancel?: () => void
}

export const RemoveLinkDialog = (props: IProps) => {
  const {
    open,
    link_info,
    onRemove,
    onCancel = () => {}
  } = props;

  const _onRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove();
  }

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  }

  return (
    <Dialog open={open} onClose={_onCancel} className="remove-dialog">
      <DialogTitle>
        {`Remove Link`}
      </DialogTitle>
      <DialogContent>
        <p>
          Do you really wish to remove the <b>Link</b>:
          <br/>
          <b>{`${link_info.tooltip} (${link_info.url})`}</b>
        </p>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='text' onClick={_onCancel}>
          Cancel
        </Button>
        <Button color='success' variant='outlined' onClick={_onRemove}>
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  )
}