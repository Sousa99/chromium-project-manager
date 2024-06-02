import { Button, Icon } from "@mui/material";

import "./LineItemButton.scss";

interface IProps {
  title: string;
  icon?: JSX.Element;
  sub_buttons?: JSX.Element[];
  // Button specific interactions
  button_styling?: React.CSSProperties;
  button_function: () => void;
}

export const LineItemButton = (props: IProps) => {
  const { title, icon, sub_buttons, button_styling, button_function } = props;

  return (
    <Button
      component="div"
      variant="outlined"
      className="line-button-item"
      onClick={button_function}
      style={button_styling}
    >
      <section className="header">
        {icon && (
          <Icon aria-label="expand" className="icon">
            {icon}
          </Icon>
        )}
        <p className="header-title">{title}</p>
      </section>
      <section className="buttons">{sub_buttons}</section>
    </Button>
  );
};
