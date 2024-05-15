import React from 'react'
import TopNavBar from '../Components/TopNavBar'
import { Box, CssBaseline, Typography, Container, TextField, Button, Popover, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useParams } from 'react-router-dom'

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

export default function TaskProgress() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const toLogOut = () => {
    navigate('/')
  }

  const { email, role } = useParams()
  
  

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
                flexDirection: 'row',
                padding:2,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 1)',
                }}
            >
                <Box sx={{display:'flex', flexDirection:'column', flex:1}}>
                    <Typography sx={{color:'white', fontSize:30}}>Project Name</Typography>

                    <Box sx={{display:'flex', }}>
                        <Box sx={{flex:1, p:1, m:1, border: '2px solid orange'}}>
                            <Typography sx={{color:'white'}}>To do:</Typography>
                        </Box>
                        <Box sx={{flex:1, p:1, m:1, border: '2px solid orange'}}>
                            <Typography sx={{color:'white'}}>Comments</Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Container>
      </Box>
    </>
  )
}