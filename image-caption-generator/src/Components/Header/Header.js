import React from 'react';
import { Stack } from '@mui/material';
import logo from './Images/Logo.png';
import ICG from './Images/ICG.png'
import "./Header.css";

function Header() {
  return (
    <div className='Login-header-bg'>
      <Stack direction="row">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "70px",
              marginTop: "15px",
              marginLeft: "15px",
            }}/>
          <img
            src={ICG}
            alt="ICG"
            style={{
              width: "150px",
              height: "100px",
              marginTop: "5px",
              marginLeft: "3px",
            }}/> 
      </Stack>
    </div>
  )
}

export default Header;