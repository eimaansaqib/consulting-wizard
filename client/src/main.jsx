import React from 'react';
import ReactDOM from 'react-dom/client';

import UserContextProvider from './context/UserContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      {/* <App /> */}
      {/* <LogInPage/> */}
      {/* <UpdatePassword/> */}
      {/* <ChangePassword/> */}
    </UserContextProvider>
  </React.StrictMode>
);
