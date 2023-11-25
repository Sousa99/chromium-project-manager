import * as React from 'react';

import { LineItemUrl } from "@molecules/line-item/LineItemUrl";
import { ITicketLink } from "@models/ticket/ITicketLink";
import { ActionButtonEnum, ActionButtons } from "@molecules/action-buttons/ActionButtons";
import { DataContext } from "@contexts/DataContext";
import { NotificationContext } from '@contexts/NotificationContext';
import { RemoveLinkDialog } from '@dialogs/remove-dialog/RemoveLinkDialog';
import { EditLinkDialog } from '@dialogs/edit-dialog/EditLinkDialog';

interface IProps {
  project_code: string,
  ticket_code: string,
  link: ITicketLink,
}

export const LinkItem = (props: IProps): JSX.Element => {
  const {
    project_code,
    ticket_code,
    link,
  } = props;

  const [ dialogOpen, setDialogOpen ] = React.useState<ActionButtonEnum | null>(null);

  const { editLink, removeLink } = React.useContext(DataContext);
  const { setNotification } = React.useContext(NotificationContext);

  const sub_buttons: JSX.Element[] = [
    <ActionButtons
      key='action'
      item_key='Link'
      sub_item_key=''
      active_actions={new Set([
        ActionButtonEnum.Edit,
        ActionButtonEnum.Remove
      ])}
      onClick={(action: ActionButtonEnum) => setDialogOpen(action)}
    />
  ];

  const edit_link_action = (new_link_info: ITicketLink) => {
    setNotification('success', `Link changed successfully!`);
    editLink(project_code, ticket_code, link.url, new_link_info);
    setDialogOpen(null);
  }

  const remove_link_action = () => {
    setNotification('success', `Link removed successfully!`);
    removeLink(project_code, ticket_code, link.url);
    setDialogOpen(null);
  }

  return (
    <>
      <LineItemUrl
        title={link.tooltip}
        url={link.url}
        sub_buttons={sub_buttons}
      />
      <EditLinkDialog
        open={dialogOpen === ActionButtonEnum.Edit}
        curr_link_info={{ tooltip: link.tooltip, url: link.url }}
        onSave={edit_link_action}
        onCancel={() => setDialogOpen(null)}
      />
      <RemoveLinkDialog
        open={dialogOpen === ActionButtonEnum.Remove}
        link_info={{ tooltip: link.tooltip, url: link.url }}
        onRemove={remove_link_action}
        onCancel={() => setDialogOpen(null)}
      />
    </>
  )
}