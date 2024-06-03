import * as React from "react";

import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FilterContext } from "@contexts/FilterContext";

interface IProps {}

export const VisibilityButton = (props: IProps) => {
  const { filter, setVisibility } = React.useContext(FilterContext);
  const { tooltip, icon } = React.useMemo(() => {
    if (filter.show_hidden) {
      return {
        tooltip: "Showing Hidden",
        icon: <VisibilityIcon />,
      };
    }

    return {
      tooltip: "Hiding Hidden",
      icon: <VisibilityOffIcon />,
    };
  }, [filter.show_hidden]);

  const onClick = () => setVisibility(!filter.show_hidden);

  return (
    <Tooltip title={tooltip}>
      <IconButton color="primary" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
