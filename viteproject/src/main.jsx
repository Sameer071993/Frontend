import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

 import App from './App.jsx'
import Keyword from './component/keyword.jsx'
import Gameover from './component/Gameover.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
  <ThemeProvider theme={theme}>
      <CssBaseline />
      <App /> 

    </ThemeProvider>
  </StrictMode>,
)
