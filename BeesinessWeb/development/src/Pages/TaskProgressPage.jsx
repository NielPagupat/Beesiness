import React, { useState } from 'react';
import TopNavBar from '../Components/TopNavBar';
import { Box, CssBaseline, Typography, Container, TextField, Button, Popover, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const textFieldStyle = {
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& label': {
    color: 'white',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'orange',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'orange',
    },
    '&:hover fieldset': {
      borderColor: 'orange',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};

export default function TaskProgress() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { member, projectName, projectID } = location.state;

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const toLogOut = () => {
    navigate('/');
  };

  const saveComment = async () => {
    // if (!member) {
    //   console.error('Member is undefined.');
    //   return;
    // }
  
    // try {
    //   const projectId = projectID; // Replace with your project ID
    //   const taskId = member.id; // Get the task ID from member object
    //   const updatedMember = {
    //     ...member,
    //     tasks: member.tasks ? member.tasks.map(task => ({
    //       ...task,
    //       comment: [...(task.comment || []), comment], // Append the new comment to existing comments or initialize an empty array if comments are undefined
    //     })) : [],
    //   };
    //   const updatedProject = {
    //     ...location.state,
    //     members: location.state.members.map(mem => (mem.id === member.id ? updatedMember : mem)),
    //   };
  
    //   const response = await axios.put(`http://localhost:8000/api/v2/auth/editProject/${projectId}/`, updatedProject, {
    //     headers: {
    //       'Content-Type': 'application/JSON',
    //       'Referrer-Policy': 'same-origin',
    //       'Cross-Origin-Opener-Policy': 'same-origin',
    //     }
    //   });
      
    //   console.log(response.data);
    //   // Optionally, update the state or perform any other action upon successful comment submission
    // } catch (error) {
    //   console.error('Error saving comment:', error);
    //   // Handle error as needed
    // }
    console.log(member.id, projectID, projectName)
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
          backgroundImage: 'url("/src/assets/beehive.png")',
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
            <Typography sx={{ color: 'white', fontSize: 30 }}>{projectName}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ flex: 1, p: 1, m: 1, border: '2px solid orange', position: 'relative' }}>
                <Typography sx={{ color: 'white' }}>Tasks:</Typography>
                {member.tasks.length > 0 ? (
                  member.tasks.map((task, index) => (
                    <Box key={index} sx={{ color: 'white', mt: 1, display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '10px', height: '100%', marginRight: '10px', backgroundColor: task.status ? 'green' : 'red' }} />
                      <Box>
                        <Typography>Task {index + 1}: {task.taskname}</Typography>
                        <Typography>Description: {task.taskDescription}</Typography>
                        <Typography>Start Date: {task.startdate}</Typography>
                        <Typography>End Date: {task.endDate}</Typography>
                        <Typography>Status: {task.status ? 'Completed' : 'In Progress'}</Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: 'white' }}>No tasks assigned</Typography>
                )}
              </Box>
              <Box sx={{ flex: 1, p: 1, m: 1, border: '2px solid orange', position: 'relative' }}>
                <Typography sx={{ color: 'white' }}>Comments:</Typography>
                <TextField
                  label="Add Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                  sx={{ ...textFieldStyle, mt: 1 }}
                />
                <Button onClick={saveComment} variant="contained" sx={{ mt: 1 }}>Save Comment</Button>
                {/* Display comments */}
                {member.tasks.length > 0 && member.tasks.some(task => task.comment.length > 0) && (
                  <Box sx={{ mt: 2, maxHeight: '50%', overflowY: 'auto' }}>
                    {member.tasks.map((task, index) => (
                      task.comment.length > 0 && (
                        <Box key={index} sx={{ color: 'white', mt: 1 }}>
                          <Typography>Task {index + 1} Comments:</Typography>
                          {task.comment.map((cmt, idx) => (
                            <Typography key={idx}>- {cmt}</Typography>
                          ))}
                        </Box>
                      )
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}