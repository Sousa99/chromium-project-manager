import { Button, Icon, Tooltip } from "@mui/material";

import "./LineItemIconButton.scss";

interface IProps {
  tooltip: string;
  icon: JSX.Element;
  color: "primary" | "lowKey";
  // Button specific interactions
  button_styling?: React.CSSProperties;
  button_function: () => void;
}

export const LineItemIconButton = (props: IProps) => {
  const { tooltip, icon, color, button_styling, button_function } = props;

  return (
    <Tooltip title={tooltip}>
      <Button
        color={color}
        variant="outlined"
        className="line-icon-button-item"
        onClick={button_function}
        style={button_styling}
      >
        <Icon aria-label="expand" className="icon">
          {icon}
        </Icon>
      </Button>
    </Tooltip>
  );
};
