import React from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { dark_theme } from './resources/theme';

import './App.scss';

import { ProjectExplorer } from '@components/project-explorer/ProjectExplorer';
import { TopBar } from '@components/top-bar/TopBar';
import { NotificationBlock } from '@molecules/notification-block/NotificationBlock';
import ContextProviders from '@contexts/ContextProviders';

const theme = createTheme(dark_theme);

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ContextProviders>
          <TopBar/>
          <ProjectExplorer/>
          <NotificationBlock/>
        </ContextProviders>
      </ThemeProvider>
    </div>
  )
}

export default App;
