import React from "react";

import FolderIcon from "@mui/icons-material/Folder";
import FolderIconOff from "@mui/icons-material/FolderOff";

import { TicketItem } from "@organisms/ticket-item/TicketItem";
import { LineItemCollapsable } from "@molecules/line-item/LineItemCollapsable";
import { IProject } from "@models/project/IProject";
import { SelectionContext } from "@contexts/SelectionContext";
import {
  ActionButtonEnum,
  ActionButtons,
} from "@molecules/action-buttons/ActionButtons";
import { DataContext } from "@contexts/DataContext";
import { RemoveProjectDialog } from "@dialogs/remove-dialog/RemoveProjectDialog";
import { NotificationContext } from "@contexts/NotificationContext";
import { ITicket } from "@models/ticket/ITicket";
import { AddTicketDialog } from "@dialogs/add-dialog/AddTicketDialog";
import { EditProjectDialog } from "@dialogs/edit-dialog/EditProjectDialog";

interface IProps {
  project: IProject;
}

export const ProjectItem = (props: IProps): JSX.Element => {
  const { project } = props;

  const [dialogOpen, setDialogOpen] = React.useState<ActionButtonEnum | null>(
    null,
  );

  const { addTicket, editProject, removeProject } =
    React.useContext(DataContext);
  const { selection, toggleProject } = React.useContext(SelectionContext);
  const { setNotification } = React.useContext(NotificationContext);

  const children: JSX.Element = (
    <div className="children-box">
      {project.tickets.map((ticket) => (
        <TicketItem
          key={ticket.id}
          project_id={project.id}
          project_main={project.main_project}
          project_code={project.code}
          project_modes={project.modes}
          ticket={ticket}
        />
      ))}
    </div>
  );

  const sub_buttons: JSX.Element[] = [
    <ActionButtons
      key="action"
      item_key="Project"
      sub_item_key="Ticket"
      active_actions={
        new Set([
          ActionButtonEnum.Add,
          ActionButtonEnum.Edit,
          ActionButtonEnum.Remove,
        ])
      }
      onClick={(action: ActionButtonEnum) => setDialogOpen(action)}
    />,
  ];

  const add_ticket_action = (new_ticket_info: Omit<ITicket, "id">) => {
    setNotification("success", `Link added successfully!`);
    addTicket(project.id, new_ticket_info);
    setDialogOpen(null);
  };

  const edit_project_action = (new_project_info: IProject) => {
    setNotification("success", `Project changed successfully!`);
    editProject(project.id, new_project_info);
    setDialogOpen(null);
  };

  const remove_project_action = () => {
    setNotification("success", `Project removed successfully!`);
    removeProject(project.id);
    setDialogOpen(null);
  };

  return (
    <>
      <LineItemCollapsable
        title={project.code}
        iconOpened={<FolderIconOff />}
        iconClosed={<FolderIcon />}
        children={children}
        sub_buttons={sub_buttons}
        expanded={selection.project_id === project.id}
        button_function={() => toggleProject(project.id)}
      />
      <AddTicketDialog
        open={dialogOpen === ActionButtonEnum.Add}
        onSave={add_ticket_action}
        onCancel={() => setDialogOpen(null)}
      />
      <EditProjectDialog
        open={dialogOpen === ActionButtonEnum.Edit}
        curr_project_info={project}
        onSave={edit_project_action}
        onCancel={() => setDialogOpen(null)}
      />
      <RemoveProjectDialog
        open={dialogOpen === ActionButtonEnum.Remove}
        project_info={{ name: project.name }}
        onRemove={remove_project_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  );
};
