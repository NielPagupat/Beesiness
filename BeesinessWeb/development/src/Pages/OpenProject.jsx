import React, { useEffect } from 'react';
import TopNavBar from '../Components/TopNavBar';
import { Box, CssBaseline, Typography, Container, Popover, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function OpenProject() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { email } = useParams();
  const [myProjects, setMyProjects] = React.useState([]);
  const [myCollaborations, setMyCollaborations] = React.useState([]);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const toLogOut = () => {
    navigate('/');
  };

  const getMyProjects = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v2/auth/projects/creator/${email}`, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      setMyProjects(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const getMyCollaborations = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v2/auth/projects/member/${email}`, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      setMyCollaborations(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMyProjects();
    getMyCollaborations();
  }, []);

  const goToEditProject = (project) => {
    navigate('/editProject', { state: { project } });
  };

  return (
    <>
      <CssBaseline />
      <TopNavBar handleOpenPopover={handleOpenPopover} toLogOut={toLogOut} />
      
      <Box
        component="main"
        sx={{
          background: 'radial-gradient(circle at 35% 70%, #333133, #1E191A)',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          alignContent: 'center',
          backgroundImage: 'url("../src/assets/beehive.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {anchorEl && (
          <Popover
            open={!!anchorEl}
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              height: '70vh',
              width: '80vw',
              display: 'flex',
              flexDirection: 'row',
              padding: 2,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
            }}
          >
            <Box sx={{ flex: 1, border: '2px solid orange', margin: 1, p: 1 }}>
              <Typography sx={{ color: 'white', marginBottom: 2, fontSize: 30 }}>My Projects</Typography>
              <Box sx={{ height: 'calc(100% - 32px)', overflowY: 'auto' }}>
                {myProjects.length > 0 ? (
                  myProjects.map((project) => (
                    <Button
                      key={project.id}
                      onClick={() => goToEditProject(project)}
                      sx={{ color: 'white', marginBottom: 2, marginLeft: 5 }}
                    >
                      {project.projectName}
                    </Button>
                  ))
                ) : (
                  <Typography sx={{ color: 'white' }}>No projects available</Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ flex: 1, border: '2px solid orange', margin: 1, p: 1 }}>
              <Typography sx={{ color: 'white', marginBottom: 2, fontSize: 30 }}>My Collaborations</Typography>
              <Box sx={{ height: 'calc(100% - 32px)', overflowY: 'auto' }}>
                {myCollaborations.length > 0 ? (
                  myCollaborations.map((collab) => (
                    <Typography key={collab.id} sx={{ color: 'white', marginBottom: 2, marginLeft: 5 }}>
                      {collab.projectName} ----- {collab.creator}
                    </Typography>
                  ))
                ) : (
                  <Typography sx={{ color: 'white' }}>No collaborations available</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
