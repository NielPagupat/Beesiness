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
        <Box style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100vw', 
            
            
            color: 'white', // Setting text color to white
        }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <Typography variant="h4" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to our company's About Us page. We are dedicated to providing top-quality services/products and ensuring customer satisfaction.
                </Typography>
                
                <Button variant="contained" color="primary">
                    Contact Us
                </Button>
            </div>
            <Box display="flex" justifyContent="center">
                <DeveloperBox name="Lance Cambarijan" role="Frontend Developer" />
                <DeveloperBox name="Niel Angelo Pagupat" role="Backend Developer" />
                <DeveloperBox name="Gerome Quilestino" role="UI/UX Designer" />
                <DeveloperBox name="Joycen Lim" role="Documentation" />
            </Box>
        </Box>


        </Container>
      </Box>
    </Box>
  );
}
function DeveloperBox({ name, role }) {
    return (
        <Box width="300px" m={2} p={2} boxShadow={3}>
            <Typography variant="h6" gutterBottom style={{ color: 'white' }}> {/* Setting text color to white */}
                {name}
            </Typography>
            <Typography variant="body1" color="textSecondary" style={{ color: 'white' }}> {/* Setting text color to white */}
                {role}
            </Typography>
        </Box>)}