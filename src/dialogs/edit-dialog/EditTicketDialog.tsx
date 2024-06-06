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

import "./EditDialog.scss";
import "./EditTicketDialog.scss";
import { ITicket } from "@models/ticket/ITicket";
import { ITicketType } from "@models/ticket/ITicketType";

interface IProps {
  open: boolean;
  curr_ticket_info: Omit<ITicket, "links">;
  onSave: (ticket_info: Omit<ITicket, "links">) => void;
  onCancel: () => void;
}

export const EditTicketDialog = (props: IProps) => {
  const { open, curr_ticket_info, onSave, onCancel } = props;

  const [ticketType, setTicketType] = React.useState<ITicketType>(
    curr_ticket_info.type,
  );
  const [ticketCode, setTicketCode] = React.useState<string>(
    curr_ticket_info.code,
  );
  const [ticketName, setTicketName] = React.useState<string>(
    curr_ticket_info.name,
  );
  const [ticketUrl, setTicketUrl] = React.useState<string | undefined>(
    curr_ticket_info.url,
  );
  const [ticketHidden, setTicketHidden] = React.useState<boolean>(
    curr_ticket_info.hidden,
  );

  const validInfo = React.useMemo(() => {
    return (
      Object.values(ITicketType).includes(ticketType) &&
      ticketCode !== "" &&
      ticketName !== ""
    );
  }, [ticketType, ticketCode, ticketName]);

  React.useEffect(() => {
    setTicketType(curr_ticket_info.type);
    setTicketCode(curr_ticket_info.code);
    setTicketName(curr_ticket_info.name);
    setTicketUrl(curr_ticket_info.url);
    setTicketHidden(curr_ticket_info.hidden);
  }, [curr_ticket_info, open]);

  const _onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validInfo) {
      return;
    }

    e.stopPropagation();
    onSave({
      id: curr_ticket_info.id,
      type: ticketType as ITicketType,
      code: ticketCode as string,
      name: ticketName as string,
      url: ticketUrl as string,
      hidden: ticketHidden as boolean,
    });
  };

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  };

  return (
    <Dialog open={open} onClose={_onCancel} className="edit-dialog">
      <DialogTitle>{`Edit Ticket`}</DialogTitle>
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
