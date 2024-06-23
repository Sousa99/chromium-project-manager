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
import { RemoveTicketDialog } from "@dialogs/remove-dialog/RemoveTicketDialog";
import { NotificationContext } from "@contexts/NotificationContext";
import { AddLinkDialog } from "@dialogs/add-dialog/AddLinkDialog";
import { ITicketLink } from "@models/ticket/ITicketLink";
import { EditTicketDialog } from "@dialogs/edit-dialog/EditTicketDialog";
import { IProjectModes } from "@models/project/IProjectModes";
import { TicketContext } from "@contexts/data/TicketContext";
import { LinkContext } from "@contexts/data/LinkContext";
import { FilterContext } from "@contexts/FilterContext";

interface IProps {
  project_id: string;
  project_main: boolean;
  project_code: string;
  project_modes: IProjectModes;
  ticket: string;
}

export const TicketItem = (props: IProps): JSX.Element => {
  const {
    project_id,
    project_main,
    project_code,
    project_modes,
    ticket: ticket_id,
  } = props;

  const [dialogOpen, setDialogOpen] = React.useState<ActionButtonEnum | null>(
    null,
  );

  const { getTicket, editTicket, removeTicket, getTicketLinks } =
    React.useContext(TicketContext);
  const { addLink } = React.useContext(LinkContext);
  const { filter } = React.useContext(FilterContext);
  const { selection, toggleTicket } = React.useContext(SelectionContext);
  const { setNotification } = React.useContext(NotificationContext);

  const ticketInfo = getTicket(project_id, ticket_id);

  const childrenGenerator = React.useCallback(() => {
    if (ticketInfo === null) {
      return <></>;
    }

    const ticketLinks = getTicketLinks(project_id, ticket_id, filter);
    return (
      <div className="children-box">
        {ticketLinks.map((link) => (
          <LinkItem
            key={link}
            project_id={project_id}
            ticket_id={ticketInfo.id}
            link={link}
          />
        ))}
      </div>
    );
  }, [project_id, ticket_id, filter, getTicketLinks, ticketInfo]);

  if (ticketInfo === null) {
    return <></>;
  }

  const sub_buttons: JSX.Element[] = [];

  if (ticketInfo.url !== undefined) {
    sub_buttons.push(
      <ActionButton
        key="action-info"
        tooltip="Ticket Link"
        icon={<InfoIcon />}
        color="info"
        onClick={() => window.open(ticketInfo.url, "_blank")}
      />,
    );
  }

  sub_buttons.push(
    <ModeButtons
      key="mode"
      project_modes={project_modes}
      project_main={project_main}
      project_code={project_code}
      type={ticketInfo.type}
      code={ticketInfo.code}
      name={ticketInfo.name}
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

  const add_link_action = (new_link_info: Omit<ITicketLink, "id">) => {
    setNotification("success", `Link added successfully!`);
    addLink(project_id, ticketInfo.id, new_link_info);
    setDialogOpen(null);
  };

  const edit_ticket_action = (new_ticket_info: Omit<ITicket, "links">) => {
    setNotification("success", `Ticket changed successfully!`);
    editTicket(project_id, ticketInfo.id, new_ticket_info);
    setDialogOpen(null);
  };

  const remove_ticket_action = () => {
    setNotification("success", `Ticket removed successfully!`);
    removeTicket(project_id, ticketInfo.id);
    setDialogOpen(null);
  };

  return (
    <>
      <LineItemCollapsable
        title={ticketInfo.code}
        iconOpened={<ExpandLessIcon />}
        iconClosed={<ExpandMoreIcon />}
        sub_buttons={sub_buttons}
        expanded={selection.ticket_id === ticketInfo.id}
        children_generator={childrenGenerator}
        button_function={() => toggleTicket(ticketInfo.id)}
      />
      <AddLinkDialog
        open={dialogOpen === ActionButtonEnum.Add}
        onSave={add_link_action}
        onCancel={() => setDialogOpen(null)}
      />
      <EditTicketDialog
        open={dialogOpen === ActionButtonEnum.Edit}
        curr_ticket_info={ticketInfo}
        onSave={edit_ticket_action}
        onCancel={() => setDialogOpen(null)}
      />
      <RemoveTicketDialog
        open={dialogOpen === ActionButtonEnum.Remove}
        ticket_info={{ code: ticketInfo.code, name: ticketInfo.name }}
        onRemove={remove_ticket_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  );
};
