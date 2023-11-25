import React from "react";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useDropzone } from 'react-dropzone';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

import './ImportDataDialog.scss';
import { DataChecker, getSpecifiedError } from "@models/checker";
import { IData } from "@models/data/IData";

enum ImportError {
  NotJson,
  JsonNotParsable,
  InvalidStructure,
}

interface DataLoaded {
  project_data: IData | null,
  error: ImportError | null,
  error_msg: string | null
}

interface IProps {
  open: boolean,
  onSave: (new_data_info: IData) => void,
  onCancel: () => void
}

export const ImportDataDialog = (props: IProps) => {
  const {
    open,
    onSave,
    onCancel
  } = props;

  const [ dataLoaded, setDataLoaded ] = React.useState<DataLoaded | null>(null);
  React.useEffect(() => {
    setDataLoaded(null);
  }, [open])

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file.name.endsWith('.json')) {
      setDataLoaded({
        project_data: null,
        error: ImportError.NotJson,
        error_msg: null
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonContent = JSON.parse(event?.target?.result as string);
        const validationResult = DataChecker.strictValidate(jsonContent);
        if (validationResult === null) {
          setDataLoaded({
            project_data: jsonContent,
            error: null,
            error_msg: null,
          });

        } else {
          setDataLoaded({
            project_data: null,
            error: ImportError.InvalidStructure,
            error_msg: getSpecifiedError(validationResult),
          });
        }

      } catch (error) {
        setDataLoaded({
          project_data: null,
          error: ImportError.JsonNotParsable,
          error_msg: null,
        });
      }
    }

    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const buttonConfig: {
    color: 'lowKey' | 'success' | 'error',
    message: JSX.Element,
  } = React.useMemo(() => {

    if (dataLoaded === null) {
      return {
        color: 'lowKey',
        message: <p>Drag & Drop a File<br/>Or Click to Select One</p>
      }
    }

    if (dataLoaded.project_data !== null) {
      return {
        color: 'success',
        message: <p>Projects Data<br/>Loaded Successfully</p>
      }
    }

    switch (dataLoaded.error) {
      case ImportError.NotJson:
        return {
          color: 'error',
          message: <p>File should be Json</p>
        }
      case ImportError.JsonNotParsable:
        return {
          color: 'error',
          message: <p>Json file not Parsable</p>
        }
      case ImportError.InvalidStructure:
        return {
          color: 'error',
          message: <p>Json has an Invalid Structure<br/>{dataLoaded.error_msg}</p>
        }
      default:
        return {
          color: 'error',
          message: <p>Sorry, there was a problem<br/>with the file provided</p>
        }
    }
  }, [dataLoaded]);

  const validInfo = React.useMemo(() => {
    return dataLoaded !== null && dataLoaded.project_data !== null;
  }, [dataLoaded]);
  
  const _onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (dataLoaded?.project_data) {
      onSave(dataLoaded.project_data);
    }
  }

  const _onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel();
  }

  return (
    <Dialog open={open} onClose={_onCancel} className="import-data-dialog">
      <DialogTitle>
        {`Import Projects Data`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          className="dialog-content"
        >
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <Button
              variant="outlined"
              color={buttonConfig.color}
              className="upload-button"
            >
              <CloudUploadIcon/>
              {buttonConfig.message}
            </Button>
          </div>
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