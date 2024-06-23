import * as React from "react";

import { LineItemUrl } from "@molecules/line-item/LineItemUrl";
import { ITicketLink } from "@models/ticket/ITicketLink";
import {
  ActionButtonEnum,
  ActionButtons,
} from "@molecules/action-buttons/ActionButtons";
import { NotificationContext } from "@contexts/NotificationContext";
import { RemoveLinkDialog } from "@dialogs/remove-dialog/RemoveLinkDialog";
import { EditLinkDialog } from "@dialogs/edit-dialog/EditLinkDialog";
import { LinkContext } from "@contexts/data/LinkContext";

interface IProps {
  project_id: string;
  ticket_id: string;
  link: string;
}

export const LinkItem = (props: IProps): JSX.Element => {
  const { project_id, ticket_id, link: link_id } = props;

  const [dialogOpen, setDialogOpen] = React.useState<ActionButtonEnum | null>(
    null,
  );

  const { getLink, editLink, removeLink } = React.useContext(LinkContext);
  const { setNotification } = React.useContext(NotificationContext);

  const linkInfo = getLink(project_id, ticket_id, link_id);
  if (linkInfo === null) {
    return <></>;
  }

  const sub_buttons: JSX.Element[] = [
    <ActionButtons
      key="action"
      item_key="Link"
      sub_item_key=""
      active_actions={new Set([ActionButtonEnum.Edit, ActionButtonEnum.Remove])}
      onClick={(action: ActionButtonEnum) => setDialogOpen(action)}
    />,
  ];

  const edit_link_action = (new_link_info: ITicketLink) => {
    setNotification("success", `Link changed successfully!`);
    editLink(project_id, ticket_id, linkInfo.id, new_link_info);
    setDialogOpen(null);
  };

  const remove_link_action = () => {
    setNotification("success", `Link removed successfully!`);
    removeLink(project_id, ticket_id, linkInfo.id);
    setDialogOpen(null);
  };

  return (
    <>
      <LineItemUrl
        title={linkInfo.tooltip}
        url={linkInfo.url}
        sub_buttons={sub_buttons}
      />
      <EditLinkDialog
        open={dialogOpen === ActionButtonEnum.Edit}
        curr_link_info={linkInfo}
        onSave={edit_link_action}
        onCancel={() => setDialogOpen(null)}
      />
      <RemoveLinkDialog
        open={dialogOpen === ActionButtonEnum.Remove}
        link_info={{ tooltip: linkInfo.tooltip, url: linkInfo.url }}
        onRemove={remove_link_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  );
};
