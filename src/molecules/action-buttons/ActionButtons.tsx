import * as React from "react";

import "./ActionButtons.scss";

import { AddButton } from "@atoms/action-button/AddButton";
import { EditButton } from "@atoms/action-button/EditButton";
import { RemoveButton } from "@atoms/action-button/RemoveButton";

export enum ActionButtonEnum {
  Add,
  Edit,
  Remove,
}

interface IProps {
  item_key: string;
  sub_item_key: string;
  active_actions: Set<ActionButtonEnum>;
  onClick: (action: ActionButtonEnum) => void;
}

export const ActionButtons = (props: IProps) => {
  const { item_key, sub_item_key, active_actions, onClick } = props;

  return (
    <section className="action-buttons">
      {active_actions.has(ActionButtonEnum.Add) && (
        <AddButton
          item_key={sub_item_key}
          onAdd={() => onClick(ActionButtonEnum.Add)}
        />
      )}
      {active_actions.has(ActionButtonEnum.Edit) && (
        <EditButton
          item_key={item_key}
          onEdit={() => onClick(ActionButtonEnum.Edit)}
        />
      )}
      {active_actions.has(ActionButtonEnum.Remove) && (
        <RemoveButton
          item_key={item_key}
          onRemove={() => onClick(ActionButtonEnum.Remove)}
        />
      )}
    </section>
  );
};
