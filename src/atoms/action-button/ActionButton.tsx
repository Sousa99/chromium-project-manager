import { IconButton, Tooltip } from "@mui/material";

import "./ActionButton.scss";

interface IProps {
  tooltip: string;
  icon: JSX.Element;
  color: "primary" | "info" | "success" | "warning" | "error";
  onClick: () => void;
}

export const ActionButton = (props: IProps) => {
  const { tooltip, icon, color, onClick } = props;

  const _button_click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton
        className="action-button"
        color={color}
        onClick={_button_click}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
