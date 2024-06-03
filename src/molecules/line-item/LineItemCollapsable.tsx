import React from "react";
import { Collapse } from "@mui/material";

import "./LineItem.scss";

import { LineItemButton } from "@atoms/line-item-button/LineItemButton";

interface IProps {
  title: string;
  iconOpened: JSX.Element;
  iconClosed: JSX.Element;
  sub_buttons?: JSX.Element[];
  // Interaction with collapsible
  expanded: boolean;
  children_generator: () => JSX.Element;
  button_function: () => void;
}

export const LineItemCollapsable = (props: IProps): JSX.Element => {
  const {
    title,
    iconOpened,
    iconClosed,
    sub_buttons,
    expanded: triggerExpand,
    children_generator,
    button_function,
  } = props;

  const [children, setChildren] = React.useState<JSX.Element | null>(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [ongoingTimeout, setOngoingTimeout] =
    React.useState<NodeJS.Timeout | null>();
  React.useEffect(() => {
    if (triggerExpand && !expanded) {
      if (ongoingTimeout) {
        clearTimeout(ongoingTimeout);
        setOngoingTimeout(null);
      }

      setChildren(children_generator());
      setExpanded(true);
    } else if (!triggerExpand && expanded) {
      if (ongoingTimeout) {
        clearTimeout(ongoingTimeout);
        setOngoingTimeout(null);
      }

      let timeout = setTimeout(() => setChildren(null), 10000);
      setOngoingTimeout(timeout);
      setExpanded(false);
    }
  }, [triggerExpand]);

  const gradientStyle = {
    background: `linear-gradient(to right, rgba(216, 202, 85, 0.15), transparent 100%)`,
  };

  return (
    <section className="line-item-atom collapsable">
      <LineItemButton
        title={title}
        icon={expanded ? iconOpened : iconClosed}
        sub_buttons={sub_buttons}
        button_styling={expanded ? gradientStyle : {}}
        button_function={button_function}
      />
      <Collapse in={expanded}>{children}</Collapse>
    </section>
  );
};
