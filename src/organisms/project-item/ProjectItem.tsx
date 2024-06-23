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
import { RemoveProjectDialog } from "@dialogs/remove-dialog/RemoveProjectDialog";
import { NotificationContext } from "@contexts/NotificationContext";
import { ITicket } from "@models/ticket/ITicket";
import { AddTicketDialog } from "@dialogs/add-dialog/AddTicketDialog";
import { EditProjectDialog } from "@dialogs/edit-dialog/EditProjectDialog";
import { ProjectContext } from "@contexts/data/ProjectContext";
import { TicketContext } from "@contexts/data/TicketContext";
import { FilterContext } from "@contexts/FilterContext";

interface IProps {
  project: string;
}

export const ProjectItem = (props: IProps): JSX.Element => {
  const { project: project_id } = props;

  const [dialogOpen, setDialogOpen] = React.useState<ActionButtonEnum | null>(
    null,
  );

  const { getProject, editProject, removeProject, getProjectTickets } =
    React.useContext(ProjectContext);
  const { addTicket } = React.useContext(TicketContext);
  const { filter } = React.useContext(FilterContext);
  const { selection, toggleProject } = React.useContext(SelectionContext);
  const { setNotification } = React.useContext(NotificationContext);

  const projectInfo = getProject(project_id);

  const childrenGenerator = React.useCallback(() => {
    if (projectInfo === null) {
      return <></>;
    }

    const projectTickets = getProjectTickets(project_id, filter);
    return (
      <div className="children-box">
        {projectTickets.map((ticket) => (
          <TicketItem
            key={ticket}
            project_id={projectInfo.id}
            project_main={projectInfo.main_project}
            project_code={projectInfo.code}
            project_modes={projectInfo.modes}
            ticket={ticket}
          />
        ))}
      </div>
    );
  }, [project_id, filter, getProjectTickets, projectInfo]);

  // If project can't be found then render nothing
  if (projectInfo === null) {
    return <></>;
  }

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

  const add_ticket_action = (
    new_ticket_info: Omit<ITicket, "id" | "links">,
  ) => {
    setNotification("success", `Link added successfully!`);
    addTicket(projectInfo.id, new_ticket_info);
    setDialogOpen(null);
  };

  const edit_project_action = (new_project_info: Omit<IProject, "tickets">) => {
    setNotification("success", `Project changed successfully!`);
    editProject(projectInfo.id, new_project_info);
    setDialogOpen(null);
  };

  const remove_project_action = () => {
    setNotification("success", `Project removed successfully!`);
    removeProject(projectInfo.id);
    setDialogOpen(null);
  };

  return (
    <>
      <LineItemCollapsable
        title={projectInfo.code}
        iconOpened={<FolderIconOff />}
        iconClosed={<FolderIcon />}
        sub_buttons={sub_buttons}
        expanded={selection.project_id === projectInfo.id}
        children_generator={childrenGenerator}
        button_function={() => toggleProject(projectInfo.id)}
      />
      <AddTicketDialog
        open={dialogOpen === ActionButtonEnum.Add}
        onSave={add_ticket_action}
        onCancel={() => setDialogOpen(null)}
      />
      <EditProjectDialog
        open={dialogOpen === ActionButtonEnum.Edit}
        curr_project_info={projectInfo}
        onSave={edit_project_action}
        onCancel={() => setDialogOpen(null)}
      />
      <RemoveProjectDialog
        open={dialogOpen === ActionButtonEnum.Remove}
        project_info={{ name: projectInfo.name }}
        onRemove={remove_project_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  );
};
