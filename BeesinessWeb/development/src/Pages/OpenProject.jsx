import React, { useEffect, useState } from 'react';
import TopNavBar from '../Components/TopNavBar';
import { Box, CssBaseline, Typography, Container, Popover, Button, FormControlLabel, Checkbox, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function OpenProject() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { email } = useParams();
  const [myProjects, setMyProjects] = useState([]);
  const [myCollaborations, setMyCollaborations] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [pendingInvitationsCount, setPendingInvitationsCount] = useState(0);

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

  const getInvitations = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v2/auth/getAsInvitee/${email}`, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      const invitationsData = response.data;
      setInvitations(invitationsData);
      const pendingCount = invitationsData.filter(invitation => !invitation.status).length;
      setPendingInvitationsCount(pendingCount);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getMyProjects();
    getMyCollaborations();
    getInvitations();
  }, []);

  const goToEditProject = (project) => {
    navigate('/editProject', { state: { project } });
  };

  const goToProjectDetailAsMember = (project) => {
    const matchingInvitation = invitations.find(invitation => invitation.projectname === project.projectName && invitation.status);
    if (matchingInvitation) {
      navigate('/projectDetailMember', { state: { project, email } });
    } else {
      alert('You do not have an accepted invitation to access this project.');
    }
  };

  const handleAcceptInvitation = async (invitation) => {
    try {
      await axios.put(`http://localhost:8000/api/v2/auth/editInvitation/${invitation.id}/`, {
        invitor: invitation.invitor,
        invitee: invitation.invitee,
        status: true,
      }, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      getInvitations();
    } catch (error) {
      alert(error);
    }
  };

  const handleDeclineInvitation = async (invitationId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v2/auth/editInvitation/${invitationId}`, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      getInvitations();
    } catch (error) {
      alert(error);
    }
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
          minHeight: '100vh',
          overflow: 'auto',
          alignContent: 'center',
          backgroundImage: 'url("../src/assets/beehive.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          p: { xs: 2, sm: 3, md: 5 },
        }}
      >
        <Box sx={{ position: 'fixed', top: 16, right: 16 }}>
          <IconButton color="inherit" onClick={handleOpenPopover}>
            <Badge badgeContent={pendingInvitationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>

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
            <Box sx={{ p: 2 }}>
              {pendingInvitationsCount > 0 ? (
                invitations.filter(invitation => !invitation.status).map((invitation) => (
                  <Box key={invitation.id} sx={{ mb: 2 }}>
                    <Typography>
                      {invitation.invitor} invites you to join project {invitation.projectname}
                    </Typography>
                    <FormControlLabel
                      control={<Checkbox onChange={() => handleAcceptInvitation(invitation)} />}
                      label="Accept"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={() => handleDeclineInvitation(invitation.id)} />}
                      label="Decline"
                    />
                  </Box>
                ))
              ) : (
                <Typography>No pending invitations</Typography>
              )}
            </Box>
          </Popover>
        )}

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', alignContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
              mb: { xs: 2, md: 0 },
              mr: { md: 2 },
              border: '2px solid orange',
            }}
          >
            <Typography sx={{ color: 'white', marginBottom: 2, fontSize: 30 }}>My Projects</Typography>
            <Box sx={{ height: 'calc(100% - 32px)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {myProjects.length > 0 ? (
                myProjects.map((project) => (
                  <Button
                    key={project.id}
                    onClick={() => goToEditProject(project)}
                    sx={{ color: 'orange', marginBottom: 2, textAlign: 'left' }}
                    fullWidth
                  >
                    {project.projectName}
                  </Button>
                ))
              ) : (
                <Typography sx={{ color: 'white' }}>No projects available</Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: 'rgba(0, 0, 0, .5)',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
              border: '2px solid orange',
            }}
          >
            <Typography sx={{ color: 'white', marginBottom: 2, fontSize: 30 }}>My Collaborations</Typography>
            <Box sx={{ height: 'calc(100% - 32px)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {myCollaborations.length > 0 ? (
                myCollaborations.map((collab) => (
                  <Button
                    key={collab.id}
                    onClick={() => goToProjectDetailAsMember(collab)}
                    sx={{ color: 'orange', marginBottom: 2, textAlign: 'left' }}
                    fullWidth
                  >
                    {collab.projectName} ----- {collab.creator}
                  </Button>
                ))
              ) : (
                <Typography sx={{ color: 'white' }}>No collaborations available</Typography>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
