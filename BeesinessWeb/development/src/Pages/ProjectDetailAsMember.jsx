import React, { useEffect, useState } from 'react';
import TopNavBar from '../Components/TopNavBar';
import { Box, CssBaseline, Typography, Container, Popover, Button, Checkbox, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetailsMember() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { project, email } = location.state || {};

  const member = project?.members.find(member => member.name === email);
  const [tasks, setTasks] = useState(member?.tasks || []);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const toLogOut = () => {
    navigate('/');
  };

  const handleCheckboxChange = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index].status = !newTasks[index].status;
      return newTasks;
    });
  };

  const updateTask = async () => {
    await axios.put(`http://localhost:8000/api/v2/auth/editProject/${project.id}/`, project, {
      headers: {
        'Content-Type': 'application/JSON',
        'Referrer-Policy': 'same-origin',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    }).then(response => {
      console.log(response);
    }).catch(error => {
      alert(error);
    });
  };

  const [allComment, setAllComment] = useState([]);

  const getComment = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v2/auth/comments/project/${project.id}/receiver/${member.name}/`, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        }
      });
      setAllComment(response.data); // Assuming response.data is an array of comments
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  const buttonStyle = {
    backgroundColor: 'orange',
    color: 'black',
    '&:hover': {
      backgroundColor: 'darkorange',
    },
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
              flexDirection: 'column',
              padding: 2,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
            }}
          >
            <Typography sx={{ color: 'white', fontSize: 30 }}>{project.projectName}</Typography>
            <Typography sx={{ color: 'white', mb: 2 }}>Created by: {project.creator}</Typography>

            <Grid container spacing={2} sx={{ flex: 1, maxHeight: '85%' }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 1, border: '2px solid orange', overflow: 'auto', maxHeight: '90%' }}>
                  <Typography sx={{ color: 'white', marginBottom: 2 }}>To do:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', mb: 2, p: 2, border: '1px solid white', borderRadius: 1 }}>
                          <Typography sx={{ color: 'white', mb: 1 }}>Task Name: {task.taskname}</Typography>
                          <Typography sx={{ color: 'white', mb: 1 }}>Description: {task.taskDescription}</Typography>
                          <Typography sx={{ color: 'white', mb: 1 }}>Start Date: {task.startdate}</Typography>
                          <Typography sx={{ color: 'white', mb: 1 }}>End Date: {task.endDate}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: task.status ? 'green' : 'red', padding: '4px', borderRadius: '4px' }}>
                            <Checkbox
                              sx={{ color: 'white' }}
                              checked={task.status}
                              onChange={() => handleCheckboxChange(index)}
                            />
                            <Typography sx={{ color: 'white' }}>{task.status ? 'Completed' : 'Pending'}</Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography sx={{ color: 'white' }}>No tasks available</Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 1, border: '2px solid orange', overflow: 'auto', maxHeight: '90%' }}>
                  <Typography sx={{ color: 'white', marginBottom: 2 }}>Comments</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {allComment.map((comment, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: 'white' }}>{comment.leader}:&nbsp;&nbsp;{comment.content}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{
                ...buttonStyle,
                alignSelf: 'center',
                mt: 2,
                width: '150px',
              }}
              onClick={updateTask}
            >
              Update Progress
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
