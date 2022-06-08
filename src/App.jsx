import { RequireAuth } from 'react-auth-kit';
//import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import Register from './pages/Register';

const App = () => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={
            <RequireAuth loginPath='/login'>
              <Home />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
