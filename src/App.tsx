import React from 'react';
import './App.css';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PersistentDrawerLeft />
    </ThemeProvider>
  );
}

export default App;