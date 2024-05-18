import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { InputWithDefault } from "@atoms/input-with-default/InputWithDefault";

import './EditDialog.scss';
import './EditProjectModesDialog.scss';
import { IProjectModes } from "@models/project/IProjectModes";
import { DEFAULT_FEATURE_BRANCH_MODE, DEFAULT_PULL_REQUEST_MODE, DEFAULT_REPORT_MODE, checkValidityMode } from '@helpers/project-modes-helper';

export interface IProps {
  open: boolean,
  curr_project_modes: IProjectModes,
  onClose: (mode_info: IProjectModes | null) => void,
}

export const EditProjectModesDialog = (props: IProps) => {
  const {
    open,
    curr_project_modes,
    onClose
  } = props;

  const [ modeFeatureBranch, setModeFeatureBranch ] = React.useState<string>(curr_project_modes.feature_branch);
  const [ modePullRequest, setModePullRequest ] = React.useState<string>(curr_project_modes.pull_request);
  const [ modeReport, setModeReport ] = React.useState<string>(curr_project_modes.report);

  const validModeFeatureBranch = React.useMemo(() => checkValidityMode(modeFeatureBranch), [modeFeatureBranch]);
  const validModePullRequest = React.useMemo(() => checkValidityMode(modePullRequest), [modePullRequest]);
  const validModeReport = React.useMemo(() => checkValidityMode(modeReport), [modeReport]);

  const validInfo = React.useMemo(() => {
    return validModeFeatureBranch && validModePullRequest && validModeReport;
  }, [validModeFeatureBranch, validModePullRequest, validModeReport]);

  React.useEffect(() => {
    setModeFeatureBranch(curr_project_modes.feature_branch);
    setModePullRequest(curr_project_modes.pull_request);
    setModeReport(curr_project_modes.report);
  }, [curr_project_modes, open]);

  const _onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validInfo) {
      onClose(null);
      return;
    }

    e.stopPropagation();
    onClose({
      feature_branch: modeFeatureBranch,
      pull_request: modePullRequest,
      report: modeReport,
    });
  }

  return (
    <Dialog open={open} onClose={_onClose} className="edit-dialog sub-dialog">
      <DialogTitle>
        {`Advanced Project Configurations`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          className="dialog-content"
        >
          <InputWithDefault
            label="Feature Branch Mode"
            default_value={DEFAULT_FEATURE_BRANCH_MODE}
            value={modeFeatureBranch}
            changeValue={(value: string) => setModeFeatureBranch(value)}
            error={!validModeFeatureBranch}
           />
          <InputWithDefault
            label="Pull Request Mode"
            default_value={DEFAULT_PULL_REQUEST_MODE}
            value={modePullRequest}
            changeValue={(value: string) => setModePullRequest(value)}
            error={!validModePullRequest}
           />
          <InputWithDefault
            label="Report Mode"
            default_value={DEFAULT_REPORT_MODE}
            value={modeReport}
            changeValue={(value: string) => setModeReport(value)}
            error={!validModeReport}
           />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={_onClose} className="close-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}