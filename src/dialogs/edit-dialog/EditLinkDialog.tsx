import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import "./EditDialog.scss";
import { ITicketLink } from "@models/ticket/ITicketLink";

interface IProps {
  open: boolean;
  curr_link_info: ITicketLink;
  onSave: (link_info: ITicketLink) => void;
  onCancel: () => void;
}

export const EditLinkDialog = (props: IProps) => {
  const { open, curr_link_info, onSave, onCancel } = props;

  const [linkTooltip, setLinkTooltip] = React.useState<string>(
    curr_link_info.tooltip,
  );
  const [linkUrl, setLinkUrl] = React.useState<string>(curr_link_info.url);

  const validInfo = React.useMemo(() => {
    return linkTooltip !== "" && linkUrl !== "";
  }, [linkTooltip, linkUrl]);

  React.useEffect(() => {
    setLinkTooltip(curr_link_info.tooltip);
    setLinkUrl(curr_link_info.url);
  }, [curr_link_info, open]);

  const _onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validInfo) {
      return;
    }

    e.stopPropagation();
    onSave({
      id: curr_link_info.id,
      tooltip: linkTooltip as string,
      url: linkUrl as string,
    });
  };

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={_onCancel} className="edit-dialog">
      <DialogTitle>{`Edit Link`}</DialogTitle>
      <DialogContent>
        <Box component="form" className="dialog-content">
          <TextField
            id="link-tooltip"
            variant="outlined"
            label="Link Tooltip"
            value={linkTooltip}
            onChange={(event) => setLinkTooltip(event.target.value)}
            required
          />
          <TextField
            id="link-url"
            variant="outlined"
            label="Link Url"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="text" onClick={_onCancel}>
          Cancel
        </Button>
        <Button
          color="success"
          variant="outlined"
          disabled={!validInfo}
          onClick={_onSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
