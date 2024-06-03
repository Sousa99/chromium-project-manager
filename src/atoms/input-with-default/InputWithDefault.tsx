import React from "react";
import { Button, TextField } from "@mui/material";

import "./InputWithDefault.scss";

export interface IProps {
  label: string;
  default_value: string;
  value: string;
  changeValue: (new_value: string) => void;
  error: boolean;
}

export const InputWithDefault = (props: IProps) => {
  const { label, default_value, value, changeValue, error } = props;

  const value_is_default = React.useMemo(
    () => value === default_value,
    [value, default_value],
  );
  const click_default = React.useCallback(
    () => changeValue(default_value),
    [changeValue, default_value],
  );

  return (
    <div className="input-with-default">
      <TextField
        label={label}
        value={value}
        onChange={(event) => changeValue(event.target.value)}
        size="small"
        error={error}
        className="text-field"
      />
      <Button
        variant="text"
        size="small"
        className="reset-button"
        color="advanced"
        disabled={value_is_default}
        onClick={click_default}
      >
        Reset to Default
      </Button>
    </div>
  );
};
