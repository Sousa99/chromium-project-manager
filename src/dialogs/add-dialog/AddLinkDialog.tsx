import React from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

import './AddDialog.scss';
import { ITicketLink } from "@models/ticket/ITicketLink";

interface IProps {
  open: boolean,
  onSave: (link_info: ITicketLink) => void,
  onCancel: () => void
}

export const AddLinkDialog = (props: IProps) => {
  const {
    open,
    onSave,
    onCancel
  } = props;

  const [ linkTooltip, setLinkTooltip ] = React.useState<string>("");
  const [ linkUrl, setLinkUrl ] = React.useState<string>("");

  const validInfo = React.useMemo(() => {
    return linkTooltip !== "" && linkUrl !== "";
  }, [linkTooltip, linkUrl]);

  React.useEffect(() => {
    setLinkTooltip("");
    setLinkUrl("");

    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0 && tabs[0].url) {
          setLinkUrl(tabs[0].url);
        }
      });
    }
  }, [open]);

  const _onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validInfo) {
      return;
    }

    e.stopPropagation();
    onSave({
      tooltip: linkTooltip as string,
      url: linkUrl as string,
    });
  }

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  }

  return (
    <Dialog open={open} onClose={_onCancel} className="add-dialog">
      <DialogTitle>
        {`Add Link`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          className="dialog-content"
        >
          <TextField
            id='link-tooltip'
            variant="outlined"
            label="Link Tooltip"
            value={linkTooltip}
            onChange={(event) => setLinkTooltip(event.target.value)}
            required
            />
          <TextField
            id='link-url'
            variant="outlined"
            label="Link Url"
            value={linkUrl}
            onChange={(event) => setLinkUrl(event.target.value)}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='text' onClick={_onCancel}>
          Cancel
        </Button>
        <Button color='success' variant='outlined' disabled={!validInfo} onClick={_onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}