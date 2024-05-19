import * as React from 'react';
import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AddCircleOutline, Assignment } from '@mui/icons-material';
import TopNavBar from '../Components/TopNavBar';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 0,
    width: `calc(100% - 0px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [allUsers, setAllUsers] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const getUserAccountsList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v2/auth/getAllUsers/', {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toLogOut = () => {
    navigate('/');
  };

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openNotification = Boolean(anchorEl);

  const goToCreateProject = () => {
    navigate('/createProject/' + email);
  };

  const goToCheckProject = () => {
    navigate('/checkProject/' + email);
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <CssBaseline />
      <TopNavBar handleOpenPopover={handleOpenPopover} toLogOut={toLogOut} />
      <Box
        component="main"
        sx={{
          background: 'radial-gradient(circle at 35% 70%, #333133, #1E191A)',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundImage: 'url("../src/assets/beehive.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {anchorEl && (
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
        )}
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              height: isLargeScreen ? '70vh' : 'auto',
              width: isLargeScreen ? '80vw' : '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: isLargeScreen ? 5 : 2,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
              borderRadius: isLargeScreen ? 2 : 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <Button
                sx={{ fontSize: '20px', marginRight: '10px', minWidth: 0 }}
                startIcon={<AddCircleOutline style={{ fontSize: 100, color: '#D28200' }} />}
                onClick={goToCreateProject}
              />
              <Typography sx={{ color: 'white', fontSize: '20px' }}>Add Project</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{ fontSize: '20px', marginRight: '10px', minWidth: 0 }}
                startIcon={<Assignment style={{ fontSize: 100, color: '#D28200' }} />}
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
