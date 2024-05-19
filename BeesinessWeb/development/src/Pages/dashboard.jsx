import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AddCircleOutline, Assignment, NotificationsNone, } from '@mui/icons-material';
import TopNavBar from '../Components/TopNavBar';

const drawerWidth = 0;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const navigate = useNavigate()
  const {email} = useParams()
  const [allUsers, setAllUsers] = React.useState([])
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getUserAccountsList = async() => {
    const result = await axios.get('http://localhost:8000/api/v2/auth/getAllUsers/',
  {headers:{
    'Content-Type':'application/JSON',
    'Referrer-Policy':'same-origin',
    'Cross-Origin-Opener-Policy':'same-origin'
  }}).then(response=>{
    console.log(response)
    setAllUsers(response.data)

  }).catch(error=>{
    console.log(error)
  })
  }

  const toLogOut = () => {
    navigate('/')
  }

  const extractDate = (dateTimeString) => {
    if (!dateTimeString) {
      return "None"; 
    }
    const dateTimeParts = dateTimeString.split('T');
    return dateTimeParts[0];
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openNotification = Boolean(anchorEl);

  // React.useEffect(()=>{
  //   getUserAccountsList
  //    // Refresh data every 3 seconds
  //    const intervalId = setInterval(getUserAccountsList, 3000);

  //    // Clean up function to clear the interval
  //    return () => clearInterval(intervalId);
  // }, [])

  const goToCreateProject = () => {
    navigate('/createProject/'+email)
  }

  const goToCheckProject = () => {
    navigate('/checkProject/'+email)
  }
  return (
    
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline/>
      <TopNavBar handleOpenPopover={handleOpenPopover} toLogOut={toLogOut} />
      <Box
        component="main"
        sx={{
          background: 'radial-gradient(circle at 35% 70%, #333133, #1E191A)',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          alignContent:'center',
          backgroundImage: 'url("../src/assets/beehive.png")', // Set background image here
          backgroundSize: 'cover', // Ensure the image covers the entire container
          backgroundPosition: 'center', // Center the image
        }}
      >
        {anchorEl && (
          <Popover
            open={open}
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
        )}
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 , display:'flex', justifyContent:'center', alignContent:'center'}}>
        
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              height: '70vh',
              width: '80vw',
              display: 'flex',
              flexDirection: 'column',
              paddingTop:5,
              paddingLeft:5,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)' // adding drop shadow
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center', // center children horizontally
                marginBottom: '20px' // spacing between child boxes
              }}
            >
              <Button
                sx={{ fontSize: '20px', marginRight: '10px', minWidth: 0 }}
                startIcon={<AddCircleOutline style={{ fontSize: 100, color:'#D28200' }} />} // Increasing icon size to 40px
                onClick={goToCreateProject}
              />
              <Typography sx={{ color: 'white', fontSize: '20px' }}>Add Project</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center' // center children horizontally
              }}
            >
              <Button
                sx={{ fontSize: '20px', marginRight: '10px', minWidth: 0 }}
                startIcon={<Assignment style={{ fontSize: 100, color:'#D28200'}} />} // Increasing icon size to 40px
                onClick={goToCheckProject}
              />
              <Typography sx={{ color: 'white', fontSize: '20px' }}>Access Project</Typography>
            </Box>
          </Box>
          
        </Container>
      </Box>
    </Box>
  
  );
}