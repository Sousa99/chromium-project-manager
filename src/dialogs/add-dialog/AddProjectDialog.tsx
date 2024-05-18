import React from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, Tooltip } from "@mui/material";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import './AddDialog.scss';
import './AddProjectDialog.scss';
import { IProject } from "@models/project/IProject";
import { DEFAULT_FEATURE_BRANCH_MODE, DEFAULT_PULL_REQUEST_MODE, DEFAULT_REPORT_MODE } from '@helpers/project-modes-helper';

interface IProps {
  open: boolean,
  onSave: (project_info: Omit<IProject, "id">) => void,
  onCancel: () => void
}

export const AddProjectDialog = (props: IProps) => {
  const {
    open,
    onSave,
    onCancel
  } = props;

  const [ projectMain, setProjectMain ] = React.useState<boolean>(false);
  const [ projectCode, setProjectCode ] = React.useState<string>("");
  const [ projectName, setProjectName ] = React.useState<string>("");
  const [ projectHidden, setProjectHidden ] = React.useState<boolean>(false);

  const validInfo = React.useMemo(() => {
    return projectCode !== "" &&
      projectName !== "";
  }, [projectCode, projectName]);

  React.useEffect(() => {
    setProjectMain(true);
    setProjectCode("");
    setProjectName("");
    setProjectHidden(false);
  }, [open]);

  const _onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validInfo) {
      return;
    }

    e.stopPropagation();
    onSave({
      main_project: projectMain,
      code: projectCode,
      name: projectName,
      hidden: projectHidden,
      tickets: [],
      modes: {
        feature_branch: DEFAULT_FEATURE_BRANCH_MODE,
        pull_request: DEFAULT_PULL_REQUEST_MODE,
        report: DEFAULT_REPORT_MODE
      }
    });
  }

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  }

  return (
    <Dialog open={open} onClose={_onCancel} className="add-dialog">
      <DialogTitle>
        {`Add Project`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          className="dialog-content"
        >
          <div id="main-info">
            <Tooltip title={projectMain ? "Main Project" : "Not Main Project"}>
              <ToggleButton
                value="check"
                selected={projectMain}
                onChange={() => setProjectMain((value) => !value)}
              >
                { projectMain ?
                  <TurnedInIcon color="success"/> :
                  <TurnedInNotIcon color="error"/>  
                }
              </ToggleButton>
            </Tooltip>
            <TextField
              id='project-code'
              variant="outlined"
              label="Project Code"
              value={projectCode}
              onChange={(event) => setProjectCode(event.target.value)}
              required
            />
            <Tooltip title={projectHidden ? "Hiding Project" : "Showing Project"}>
              <ToggleButton
                value="check"
                selected={!projectHidden}
                onChange={() => setProjectHidden((value) => !value)}
              >
                { projectHidden ?
                  <VisibilityOffIcon color="error"/> :
                  <VisibilityIcon color="success"/>  
                }
              </ToggleButton>
            </Tooltip>
          </div>
          <TextField
              id='project-name'
              variant="outlined"
              label="Project Name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              required
            />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='text' onClick={_onCancel}>
          Cancel
        </Button>
        <Button color='success' variant='outlined' disabled={!validInfo} onClick={_onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}