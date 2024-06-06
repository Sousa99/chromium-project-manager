import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import InfoIcon from "@mui/icons-material/Info";

import React from "react";

import { LinkItem } from "@organisms/link-item/LinkItem";
import { LineItemCollapsable } from "@molecules/line-item/LineItemCollapsable";
import { ITicket } from "@models/ticket/ITicket";
import { SelectionContext } from "@contexts/SelectionContext";
import { ModeButtons } from "@molecules/mode-buttons/ModeButtons";
import {
  ActionButtonEnum,
  ActionButtons,
} from "@molecules/action-buttons/ActionButtons";
import { ActionButton } from "@atoms/action-button/ActionButton";
import { DataContext } from "@contexts/DataContext";
import { RemoveTicketDialog } from "@dialogs/remove-dialog/RemoveTicketDialog";
import { NotificationContext } from "@contexts/NotificationContext";
import { AddLinkDialog } from "@dialogs/add-dialog/AddLinkDialog";
import { ITicketLink } from "@models/ticket/ITicketLink";
import { EditTicketDialog } from "@dialogs/edit-dialog/EditTicketDialog";
import { IProjectModes } from "@models/project/IProjectModes";

interface IProps {
  project_id: string;
  project_main: boolean;
  project_code: string;
  project_modes: IProjectModes;
  ticket: ITicket;
}

export const TicketItem = (props: IProps): JSX.Element => {
  const { project_id, project_main, project_code, project_modes, ticket } =
    props;

  const [dialogOpen, setDialogOpen] = React.useState<ActionButtonEnum | null>(
    null,
  );

  const { addLink, editTicket, removeTicket } = React.useContext(DataContext);
  const { selection, toggleTicket } = React.useContext(SelectionContext);
  const { setNotification } = React.useContext(NotificationContext);

  const childrenGenerator = React.useCallback(
    () => (
      <div className="children-box">
        {ticket.links.map((link) => (
          <LinkItem
            key={link.url}
            project_id={project_id}
            ticket_id={ticket.id}
            link={link}
          />
        ))}
      </div>
    ),
    [project_id, ticket.id, ticket.links],
  );

  const sub_buttons: JSX.Element[] = [];

  if (ticket.url !== undefined) {
    sub_buttons.push(
      <ActionButton
        key="action-info"
        tooltip="Ticket Link"
        icon={<InfoIcon />}
        color="info"
        onClick={() => window.open(ticket.url, "_blank")}
      />,
    );
  }

  sub_buttons.push(
    <ModeButtons
      key="mode"
      project_modes={project_modes}
      project_main={project_main}
      project_code={project_code}
      type={ticket.type}
      code={ticket.code}
      name={ticket.name}
    />,
    <ActionButtons
      key="action"
      item_key="Ticket"
      sub_item_key="Link"
      active_actions={
        new Set([
          ActionButtonEnum.Add,
          ActionButtonEnum.Edit,
          ActionButtonEnum.Remove,
        ])
      }
      onClick={(action: ActionButtonEnum) => setDialogOpen(action)}
    />,
  );

  const add_link_action = (new_link_info: ITicketLink) => {
    setNotification("success", `Link added successfully!`);
    addLink(project_id, ticket.id, new_link_info);
    setDialogOpen(null);
  };

  const edit_ticket_action = (new_ticket_info: ITicket) => {
    setNotification("success", `Ticket changed successfully!`);
    editTicket(project_id, ticket.id, new_ticket_info);
    setDialogOpen(null);
  };

  const remove_ticket_action = () => {
    setNotification("success", `Ticket removed successfully!`);
    removeTicket(project_id, ticket.id);
    setDialogOpen(null);
  };

  return (
    <>
      <LineItemCollapsable
        title={ticket.code}
        iconOpened={<ExpandLessIcon />}
        iconClosed={<ExpandMoreIcon />}
        sub_buttons={sub_buttons}
        expanded={selection.ticket_id === ticket.id}
        children_generator={childrenGenerator}
        button_function={() => toggleTicket(ticket.id)}
      />
      <AddLinkDialog
        open={dialogOpen === ActionButtonEnum.Add}
        onSave={add_link_action}
        onCancel={() => setDialogOpen(null)}
      />
      <EditTicketDialog
        open={dialogOpen === ActionButtonEnum.Edit}
        curr_ticket_info={ticket}
        onSave={edit_ticket_action}
        onCancel={() => setDialogOpen(null)}
      />
      <RemoveTicketDialog
        open={dialogOpen === ActionButtonEnum.Remove}
        ticket_info={{ code: ticket.code, name: ticket.name }}
        onRemove={remove_ticket_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  );
};
