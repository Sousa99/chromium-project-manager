import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./EditDialog.scss";
import "./EditProjectDialog.scss";
import { IProject } from "@models/project/IProject";
import { EditProjectModesDialog } from "@dialogs/edit-dialog/EditProjectModesDialog";
import { IProjectModes } from "@models/project/IProjectModes";

interface IProps {
  open: boolean;
  curr_project_info: Omit<IProject, "tickets">;
  onSave: (project_info: Omit<IProject, "tickets">) => void;
  onCancel: () => void;
}

export const EditProjectDialog = (props: IProps) => {
  const { open, curr_project_info, onSave, onCancel } = props;

  const [modeDialogOpen, setModeDialogOpen] = React.useState<boolean>(false);

  const [projectMain, setProjectMain] = React.useState<boolean>(
    curr_project_info.main_project,
  );
  const [projectCode, setProjectCode] = React.useState<string>(
    curr_project_info.code,
  );
  const [projectName, setProjectName] = React.useState<string>(
    curr_project_info.name,
  );
  const [projectHidden, setProjectHidden] = React.useState<boolean>(
    curr_project_info.hidden,
  );
  const [projectModesConfiguration, setProjectModesConfiguration] =
    React.useState<IProjectModes>(curr_project_info.modes);

  const validInfo = React.useMemo(() => {
    return projectCode !== "" && projectName !== "";
  }, [projectCode, projectName]);

  React.useEffect(() => {
    setProjectMain(curr_project_info.main_project);
    setProjectCode(curr_project_info.code);
    setProjectName(curr_project_info.name);
    setProjectHidden(curr_project_info.hidden);
    setProjectModesConfiguration(curr_project_info.modes);
  }, [curr_project_info, open]);

  const _onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validInfo) {
      return;
    }

    e.stopPropagation();
    onSave({
      id: curr_project_info.id,
      main_project: projectMain,
      code: projectCode,
      name: projectName,
      hidden: projectHidden,
      modes: projectModesConfiguration,
    });
  };

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  };

  const change_project_modes = (new_project_modes: IProjectModes | null) => {
    setModeDialogOpen(false);

    if (new_project_modes !== null) {
      setProjectModesConfiguration(new_project_modes);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={_onCancel} className="edit-dialog">
        <DialogTitle>{`Edit Project`}</DialogTitle>
        <DialogContent>
          <Box component="form" className="dialog-content">
            <div id="main-info">
              <Tooltip
                title={projectMain ? "Main Project" : "Not Main Project"}
              >
                <ToggleButton
                  value="check"
                  selected={projectMain}
                  onChange={() => setProjectMain((value) => !value)}
                >
                  {projectMain ? (
                    <TurnedInIcon color="success" />
                  ) : (
                    <TurnedInNotIcon color="error" />
                  )}
                </ToggleButton>
              </Tooltip>
              <TextField
                id="project-code"
                variant="outlined"
                label="Project Code"
                value={projectCode}
                onChange={(event) => setProjectCode(event.target.value)}
                required
              />
              <Tooltip
                title={projectHidden ? "Hiding Project" : "Showing Project"}
              >
                <ToggleButton
                  value="check"
                  selected={!projectHidden}
                  onChange={() => setProjectHidden((value) => !value)}
                >
                  {projectHidden ? (
                    <VisibilityOffIcon color="error" />
                  ) : (
                    <VisibilityIcon color="success" />
                  )}
                </ToggleButton>
              </Tooltip>
            </div>
            <TextField
              id="project-name"
              variant="outlined"
              label="Project Name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              required
            />
            <Button variant="text" onClick={() => setModeDialogOpen(true)}>
              Advanced Options
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="text" onClick={_onCancel}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="outlined"
            disabled={!validInfo}
            onClick={_onSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <EditProjectModesDialog
        open={modeDialogOpen}
        curr_project_modes={projectModesConfiguration}
        onClose={change_project_modes}
      />
    </>
  );
};
