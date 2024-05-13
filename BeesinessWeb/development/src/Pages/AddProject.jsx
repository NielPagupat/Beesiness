import React from 'react'
import TopNavBar from '../Components/TopNavBar'
import { Box, CssBaseline, Typography, Container, TextField, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const textFieldStyle = {
    '& .MuiInputBase-input': {
      color: 'white', // Change input text color to white
    },
    '& label': {
        color: 'white', // Change label color to white
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'orange', // Change label color when focused to orange
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'orange', // Change outline color to orange
        },
        '&:hover fieldset': {
            borderColor: 'orange', // Change outline color on hover to orange
        },
        '&.Mui-focused fieldset': {
            borderColor: 'orange', // Change outline color when focused to orange
        },
    },
  }

export default function AddProject() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  
  const toLogOut = () => {
    navigate('/');
  }

  const [member, setMember] = React.useState('');
  const [members, setMembers] = React.useState([]);

  const addMember = () => {
    setMembers(prevMembers => [...prevMembers, member]);
    setMember(''); // Clear the input field after adding member
  }

  const handleRemoveMember = (index) => {
    setMembers((prevMembers) => {
      const updatedMembers = [...prevMembers];
      updatedMembers.splice(index, 1);
      return updatedMembers;
    });
  };
  
  return (
    <>
      <CssBaseline/>
      <TopNavBar handleOpenPopover={handleOpenPopover} toLogOut={toLogOut}/>
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 , display:'flex', justifyContent:'center', alignContent:'center'}}>
        <Box
  sx={{
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: '70vh',
    width: '80vw',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
    paddingLeft: 5,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)', // adding drop shadow
  }}
>
  {/* For Inputs */}
  <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight: 2 }}>
        <TextField label="Project Name" sx={{ ...textFieldStyle, width: '100%', marginBottom:5 }} />
        {/* Put Members Here */}
        {members.length > 0 ? (
        <Box sx={{
            height: '60%', // Adjust the maximum height as needed
            overflowY: 'auto',
            marginBottom: '10px', // Add some bottom margin for spacing
          }}>
            {members.map((member, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography color="white" sx={{ width: 200 }}>{member}</Typography>
                <IconButton onClick={() => handleEditMember(index)}>
                <EditIcon style={{ color: "orange" }} />
                </IconButton>
                <IconButton onClick={() => handleRemoveMember(index)}>
                <DeleteIcon style={{ color: "red" }} />
                </IconButton>
            </Box>
            ))}
        </Box>
        ) : (
        <Box sx={{
                height: '60%', // Adjust the maximum height as needed
                overflowY: 'auto',
                marginBottom: '10px', // Add some bottom margin for spacing
              }}>
        <Typography sx={{ color: "white" }}>No members added yet</Typography>
        </Box>
        )}
        <Box sx={{ width: '100%' , flexDirection:'row'}}>
        <TextField label="Invite" value={member} onChange={(e) => setMember(e.target.value)} sx={{ ...textFieldStyle, width: '60%' }} />
        <Button onClick={addMember}>Add Member</Button>
        </Box>
    </Box>
    {/* Add task Box */}
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', paddingLeft:5, paddingTop:5, border: '2px solid orange',}}>
        <Typography sx={{color:'white'}}>Task Details</Typography>
        <Box sx={{
                height: '50%', // Adjust the maximum height as needed
                overflowY: 'auto',
                marginBottom: '10px', // Add some bottom margin for spacing
                p:5,
              }}>
        <Typography color="white">No tasks yet</Typography>
        </Box>
        <Box flexDirection={'row'}>
            <TextField label='TaskName' sx={{...textFieldStyle, m:1}}/>
            <TextField label='Task Description' multiline={true} maxRows={1} sx={{...textFieldStyle, m:1}}/>
            <TextField type='date' helperText='Start Date' sx={{...textFieldStyle, m:1, color:'white', '& .MuiFormHelperText-root': { color: 'white' } }}/>
            <TextField type='date' helperText='end Date'  sx={{...textFieldStyle, m:1, color:'white', '& .MuiFormHelperText-root': { color: 'white' } }}/>
            <Button>add Task</Button>
        </Box>
        
    </Box>
    </Box>
        </Container>
      </Box>
    </>
  )
}