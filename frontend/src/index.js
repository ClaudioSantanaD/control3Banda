import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import{BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './views/Login.jsx';
import Concerts from './views/Concerts.jsx';
import MyConcerts from './views/MyConcerts.jsx';
import Register from './views/Register.jsx';
import NotFound from './views/NotFound.jsx';
import Home from './views/Home.jsx';
import UserProvider from './context/userProvider.jsx';
import Logout from './views/Logout.jsx';
import RequireAuth from './components/RequireAuth.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}/>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='logout' element={<RequireAuth><Logout /></RequireAuth>}/>
          <Route path='concerts/:ciudad' element={<Concerts />} />
          <Route path='myConcerts' element={<RequireAuth><MyConcerts /></RequireAuth>} />
          <Route path='*' element={<NotFound />} />
      
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

