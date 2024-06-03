import AddCircleIcon from "@mui/icons-material/AddCircle";

import { ActionButton } from "./ActionButton";

export interface IProps {
  item_key: string;
  onAdd: () => void;
}

export const AddButton = (props: IProps) => {
  const { item_key, onAdd } = props;

  return (
    <ActionButton
      tooltip={`Add ${item_key}`}
      icon={<AddCircleIcon />}
      color="success"
      onClick={onAdd}
    />
  );
};
