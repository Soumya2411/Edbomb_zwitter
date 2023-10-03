import {BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import HomePage from './scenes/homePage'; 
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { useMemo } from 'react';
import { UseSelector } from 'react-redux';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {

  const theme = createTheme(themeSettings);
  return (
    <div className="app">
        
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/profile/:userId' element={<ProfilePage/>}/>
    </Routes>
    </ThemeProvider>
    </BrowserRouter>

    </div>
  );
}

export default App;
