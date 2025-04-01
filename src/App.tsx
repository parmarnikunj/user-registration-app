import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import RegistrationWindow from "./components/RegistrationWindow";
import PrivacyPolicy from "./components/PrivacyPolicy";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RegistrationWindow />
      </ThemeProvider>
    </Provider>
  );
}

export default App; 