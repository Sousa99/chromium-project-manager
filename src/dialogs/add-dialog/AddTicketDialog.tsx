import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./AddDialog.scss";
import "./AddTicketDialog.scss";
import { ITicket } from "@models/ticket/ITicket";
import { ITicketType } from "@models/ticket/ITicketType";

interface IProps {
  open: boolean;
  onSave: (ticket_info: Omit<ITicket, "id">) => void;
  onCancel: () => void;
}

export const AddTicketDialog = (props: IProps) => {
  const { open, onSave, onCancel } = props;

  const [ticketType, setTicketType] = React.useState<ITicketType>(
    ITicketType.Feature,
  );
  const [ticketCode, setTicketCode] = React.useState<string>("");
  const [ticketName, setTicketName] = React.useState<string>("");
  const [ticketUrl, setTicketUrl] = React.useState<string | undefined>(
    undefined,
  );
  const [ticketHidden, setTicketHidden] = React.useState<boolean>(false);

  const validInfo = React.useMemo(() => {
    return (
      Object.values(ITicketType).includes(ticketType) &&
      ticketCode !== "" &&
      ticketName !== ""
    );
  }, [ticketType, ticketCode, ticketName]);

  React.useEffect(() => {
    setTicketType(ITicketType.Feature);
    setTicketCode("");
    setTicketName("");
    setTicketUrl("");
    setTicketHidden(false);

    if (chrome && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs.length > 0 && tabs[0].url) {
          setTicketUrl(tabs[0].url);
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
      type: ticketType as ITicketType,
      code: ticketCode as string,
      name: ticketName as string,
      url: ticketUrl as string,
      hidden: ticketHidden as boolean,
      links: [],
    });
  };

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={_onCancel} className="edit-dialog">
      <DialogTitle>{`Add Ticket`}</DialogTitle>
      <DialogContent>
        <Box component="form" className="dialog-content">
          <div id="main-info">
            <TextField
              id="ticket-code"
              variant="outlined"
              label="Ticket Code"
              value={ticketCode}
              onChange={(event) => setTicketCode(event.target.value)}
              required
            />
            <Select
              id="ticket-type"
              label="Ticket Type"
              value={ticketType}
              onChange={(event) =>
                setTicketType(event.target.value as ITicketType)
              }
              required
            >
              {Object.entries(ITicketType).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key}
                </MenuItem>
              ))}
            </Select>
            <Tooltip title={ticketHidden ? "Hiding Ticket" : "Showing Ticket"}>
              <ToggleButton
                value="check"
                selected={!ticketHidden}
                onChange={() => setTicketHidden((value) => !value)}
              >
                {ticketHidden ? (
                  <VisibilityOffIcon color="error" />
                ) : (
                  <VisibilityIcon color="success" />
                )}
              </ToggleButton>
            </Tooltip>
          </div>
          <TextField
            id="ticket-name"
            variant="outlined"
            label="Ticket Name"
            value={ticketName}
            onChange={(event) => setTicketName(event.target.value)}
            required
          />
          <TextField
            id="ticket-url"
            variant="outlined"
            label="Ticket Url"
            value={ticketUrl}
            onChange={(event) =>
              setTicketUrl(
                event.target.value === "" ? undefined : event.target.value,
              )
            }
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
