import React from 'react'
import TopNavBar from '../Components/TopNavBar'
import { Box, CssBaseline, Typography, Container, TextField, Button, Popover, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'

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
}

export default function AddProject() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { email } = useParams()
  const [project, setProject] = React.useState({
    "projectName": '',
    "creator": email,
    "members": [],
  })

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const toLogOut = () => {
    navigate('/')
  }

  const handleProjectUpdate = (key, value) => {
    setProject(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  const [member, setMember] = React.useState('')
  const [members, setMembers] = React.useState([])
  const [selectedMemberIndex, setSelectedMemberIndex] = React.useState(null)
  const [task, setTask] = React.useState({
    taskname: '',
    taskDescription: '',
    startdate: '',
    endDate: '',
    status: false,
  })

  React.useEffect(() => {
    handleProjectUpdate('members', members)
  }, [members])

  const handleTaskUpdate = (key, value) => {
    setTask(prevState => ({
      ...prevState,
      [key]: value,
    }))
  }

  const addMember = () => {
    setMembers(prevMembers => [...prevMembers, { name: member, tasks: [], comment: [], }])
    setMember('')
  }

  const handleRemoveMember = (index) => {
    setMembers(prevMembers => {
      const updatedMembers = [...prevMembers]
      updatedMembers.splice(index, 1)
      return updatedMembers
    })
    setSelectedMemberIndex(null)
  }

  const handleEditMember = (index) => {
    setSelectedMemberIndex(index)
  }

  const addTaskToMember = () => {
    if (selectedMemberIndex !== null) {
      const updatedMembers = [...members]
      updatedMembers[selectedMemberIndex].tasks.push(task)
      setMembers(updatedMembers)
      setTask({
        taskname: '',
        taskDescription: '',
        startdate: '',
        endDate: '',
        status: false,
      })
    }
  }

  const handleRemoveTask = (taskIndex) => {
    if (selectedMemberIndex !== null) {
      const updatedMembers = [...members]
      updatedMembers[selectedMemberIndex].tasks.splice(taskIndex, 1)
      setMembers(updatedMembers)
    }
  }

  const sendInvitation = async () => {
    members.forEach(async (member) => {
      await axios.post('http://localhost:8000/api/v2/auth/createInvite/', {
        invitor: email,
        invitee: member.name,
        projectname: project.projectName,
      }, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin'
        }
      });
    });
  };

  const saveProjectData = async () => {
    await axios.post('http://localhost:8000/api/v2/auth/createProject/', project,
      {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin'
        }
      }).then(response => {
        sendInvitation()
        console.log(response)
      }).catch(error => {
        alert(error)
      })
  }

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
              height: isLargeScreen ? '70vh' : 'auto',
              width: isLargeScreen ? '80vw' : '100%',
              display: 'flex',
              flexDirection: isLargeScreen ? 'row' : 'column',
              padding: 5,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
              borderRadius: isLargeScreen ? 2 : 0,
            }}
          >
            {/* For Inputs */}
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight: isLargeScreen ? 2 : 0 }}>
              <TextField
                label="Project Name"
                value={project.projectName}
                onChange={(e) => handleProjectUpdate('projectName', e.target.value)}
                sx={{ ...textFieldStyle, width: '100%', marginBottom: 5 }}
              />
              {/* Put Members Here */}
              {members.length > 0 ? (
                <Box
                  sx={{
                    height: '60%',
                    overflowY: 'auto',
                    marginBottom: '10px',
                  }}
                >
                  {members.map((member, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        backgroundColor: selectedMemberIndex === index ? 'rgba(255, 165, 0, 0.3)' : 'transparent',
                        borderRadius: selectedMemberIndex === index ? '5px' : '0',
                      }}
                    >
                      <Typography color="white" sx={{ width: 200 }}>
                        {member.name}
                      </Typography>
                      <IconButton onClick={() => handleEditMember(index)}>
                        <EditIcon style={{ color: 'orange' }} />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveMember(index)}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '60%',
                    overflowY: 'auto',
                    marginBottom: '10px',
                  }}
                >
                  <Typography sx={{ color: 'white' }}>No members added yet</Typography>
                </Box>
              )}
              <Box sx={{ width: '100%', flexDirection: 'row' }}>
                <TextField
                  label="Invite"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                  sx={{ ...textFieldStyle, width: '60%' }}
                />
                <Button sx={{ color: 'orange' }} onClick={addMember}>Add Member</Button>
              </Box>
              <Button sx={{ color: 'orange' }} onClick={saveProjectData}> Save Project </Button>
            </Box>
            {/* Add task Box */}
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', paddingLeft: isLargeScreen ? 5 : 0, paddingTop: 5, border: '2px solid orange' }}>
              <Typography sx={{ color: 'white' }}>Task Details</Typography>
              <Box
                sx={{
                  height: '50%',
                  overflowY: 'auto',
                  marginBottom: '10px',
                  p: 5,
                }}
              >
                {selectedMemberIndex !== null && members[selectedMemberIndex].tasks.length > 0 ? (
                  members[selectedMemberIndex].tasks.map((task, index) => (
                    <Box key={index} sx={{ marginBottom: '10px', color: 'white', display: 'flex', alignItems: 'center' }}>
                      <Typography>Task {index + 1}: {task.taskname}</Typography>
                      <IconButton onClick={() => handleRemoveTask(index)}>
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography color="white">No tasks yet</Typography>
                )}
              </Box>
              <Box sx={{ flexDirection: isLargeScreen ? 'row' : 'column' }}>
                <TextField
                  label="TaskName"
                  value={task.taskname}
                  onChange={(e) => handleTaskUpdate('taskname', e.target.value)}
                  sx={{ ...textFieldStyle, m: 1 }}
                />
                <TextField
                  label="Task Description"
                  multiline={true}
                  maxRows={1}
                  value={task.taskDescription}
                  onChange={(e) => handleTaskUpdate('taskDescription', e.target.value)}
                  sx={{ ...textFieldStyle, m: 1 }}
                />
                <TextField
                  type="date"
                  helperText="Start Date"
                  value={task.startdate}
                  onChange={(e) => handleTaskUpdate('startdate', e.target.value)}
                  sx={{ ...textFieldStyle, m: 1, color: 'white', '& .MuiFormHelperText-root': { color: 'white' } }}
                />
                <TextField
                  type="date"
                  helperText="End Date"
                  value={task.endDate}
                  onChange={(e) => handleTaskUpdate('endDate', e.target.value)}
                  sx={{ ...textFieldStyle, m: 1, color: 'white', '& .MuiFormHelperText-root': { color: 'white' } }}
                />
                <Button sx={{ color: 'orange' }} onClick={addTaskToMember}>Add Task</Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}
