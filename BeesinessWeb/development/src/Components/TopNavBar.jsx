import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Popover } from '@mui/material';
import { NotificationsNone, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const TopNavBar = ({ handleOpenPopover, handleClosePopover, anchorEl, toLogOut }) => {
  const openNotification = Boolean(anchorEl);
  
  
  return (
    <React.Fragment>
      <AppBar position="absolute" sx={{backgroundImage: 'linear-gradient(45deg, #D28200 30%, #FBB23E 90%)'}}>
        <Toolbar sx={{pr: '245px',}}>
          <Avatar sx={{ m: 1, width:50, height: 50}} src='../src/assets/beesiness.png'/>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Beesiness
          </Typography>
          {/* Add bell icon button */}
          <IconButton color="inherit" onClick={handleOpenPopover}>
            <NotificationsNone/>
          </IconButton>
          {/* End of bell icon button */}
          <IconButton onClick={toLogOut} color="inherit">
            <Typography sx={{mx:'1vh', fontWeight:'bold'}}>
              Log-out
            </Typography>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        open={openNotification}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Typography sx={{ p: 2 }}>Notifications content</Typography>
      </Popover>
    </React.Fragment>
  );
}

export default TopNavBar;