import * as React from "react";

import "./TopBar.scss";

import { AppBar, InputBase, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { VisibilityButton } from "@atoms/visibility-button/VisibilityButton";
import { FilterContext } from "@contexts/FilterContext";

interface IProps {}

export const TopBar = (props: IProps) => {
  const { filter, setSearch } = React.useContext(FilterContext);

  return (
    <AppBar position="static" className="top-bar">
      <Toolbar className="toolbar">
        <div className="search-box">
          <div className="search-icon-wrapper">
            <SearchIcon />
          </div>
          <InputBase
            className="input-box"
            placeholder="Search ticket…"
            inputProps={{ "aria-label": "search" }}
            value={filter.search_string}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <VisibilityButton />
      </Toolbar>
    </AppBar>
  );
};
