import React, { useEffect, useState } from 'react';
import TopNavBar from '../Components/TopNavBar';
import { Box, CssBaseline, Typography, Container, TextField, Button, Popover } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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
 
  const [allComment, setAllComment] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { member, projectName, projectID, creator } = location.state;

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const toLogOut = () => {
    navigate('/');
  };

  const [comment, setComment] = useState({
    "leader": creator,
    "reciever": member.name,
    "project": projectID,
    "content": ''
  });

  const onChangeCommentContent = (key, value) =>{
    setComment(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const getComment = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v2/auth/comments/project/${projectID}/receiver/${member.name}/`, {
        headers:{
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

  const saveComment = async () => {
    
    try {
      await axios.post('http://localhost:8000/api/v2/auth/api/projects/add-comment/', comment, {
        headers:{
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        }
      });
      getComment()
    } catch (error) {
      alert(error);
    }
  };
  
  useEffect(() => {
    getComment();
  }, []);

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
                        <Typography
                          sx={{
                            backgroundColor: task.status ? 'green' : 'red',
                            color: 'white',
                            padding: '2px 4px',
                            borderRadius: '4px',
                            display: 'inline-block',
                          }}
                        >
                          Status: {task.status ? 'Completed' : 'In Progress'}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: 'white' }}>No tasks assigned</Typography>
                )}
              </Box>
              <Box sx={{ flex: 1, p: 1, m: 1, border: '2px solid orange', position: 'relative' }}>
                <Typography sx={{ color: 'white' }}>Comments:</Typography>
                {allComment.length > 0 ? (
                  allComment.map((comment, index) => (
                    <Box key={index} sx={{ color: 'white', mt: 1 , p:1, border: '2px solid orange'}}>
                      <Typography>{comment.leader} commented: {comment.content}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ color: 'white', mt: 1 }}>No comments yet</Typography>
                )}
                <TextField
                  label="Add Comment"
                  value={comment.content}
                  onChange={(e) => onChangeCommentContent("content", e.target.value)}
                  fullWidth
                  sx={{ ...textFieldStyle, mt: 1 }}
                />
                
                <Button onClick={saveComment} variant="contained" sx={{ mt: 1 }}>Save Comment</Button>
                {/* Display comments */}
                
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}


