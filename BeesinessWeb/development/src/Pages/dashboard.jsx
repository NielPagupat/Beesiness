import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

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
  const {auth_token} = useParams()
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

  React.useEffect(()=>{
    getUserAccountsList
     // Refresh data every 3 seconds
     const intervalId = setInterval(getUserAccountsList, 3000);

     // Clean up function to clear the interval
     return () => clearInterval(intervalId);
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline/>
        <AppBar position="absolute" open={open} sx={{backgroundImage: 'linear-gradient(45deg, #D28200 30%, #FBB23E 90%)'}}>
          <Toolbar
            sx={{pr: '245px',}}>
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
            <IconButton onClick={toLogOut} color="inherit">
              <Typography sx={{mx:'1vh', fontWeight:'bold'}}>
                Log-out
              </Typography>
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            background: 'radial-gradient(circle at 35% 70%, #333133, #1E191A)',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography sx={{color:'white', fontWeight:'bold', fontSize:20, my:2}}>User Lists</Typography>
            {allUsers.map(obj => (
                <Box sx={{backgroundImage: 'linear-gradient(45deg, #D28200 30%, #FBB23E 90%)', padding:2, margin:2, borderRadius:2}}>
                    <Typography sx={{fontSize:18}}>Email: {obj.email}</Typography>
                    <Typography sx={{fontSize:18}}>Last Login: {extractDate(obj.last_login)}</Typography>
                </Box>   
            ))}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}