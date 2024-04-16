import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const textFieldStyle = {
  flex:2, marginX:1, marginY:2, boxShadow: '5px 10px 10px rgba(0, 0, 0, 0.5)',
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
export default function SignIn() {
  const {email} = useParams()
  const navigate = useNavigate()
  const [mail, setEmail] = React.useState({
    'email':email
  })

  const [activation, setActivation] = React.useState({
    "uid":"",
    "token":""
  })

  const checkActivate = (key, value)  => {
    setActivation(prevState => ({
      ...prevState,
      [key] : value
    }))
  }
  const handleSubmit = async () => {
    const result = await axios.post('http://localhost:8000/api/v2/auth/users/activation/', activation,
    {headers:{
      'Content-Type':'application/JSON',
      'Referrer-Policy':'same-origin',
      'Cross-Origin-Opener-Policy':'same-origin'
    }})
    if (result.status == 400) {
      alert('activation unsuccessful')
    } else {
      navigate('/')
    }

  };
  const resend = async() => {
    const result = await axios.post('http://localhost:8000/api/v2/auth/users/resend_activation/', mail,
    {headers:{
        'Content-Type':'application/JSON',
        'Referrer-Policy':'same-origin',
        'Cross-Origin-Opener-Policy':'same-origin'
    }})
    if (result.status == 201) {
      alert('activation re-sent to '+ {mail})
    } 
  }


  return (
    <Box sx={{backgroundImage:'url(../src/assets/beehive.png)', backgroundSize:'cover', display:'flex', height:'100vh', flex:1, alignItems:'center'}}>
      <Container component="main" maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', height:800}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:'rgba(32, 32, 32, 0.6)',
            paddingY:10,
            borderRadius:20,
            boxShadow: '10px 20px 20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Avatar sx={{ m: 1, width: 100, height: 100}} src='../src/assets/beesiness.png' />
          <Typography component="h1" variant="h5" color={'white'}>
            Activate Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="UID"
              label="UID"
              name="UID"
              autoComplete="UID"
              autoFocus
              sx={textFieldStyle}
              onChange={(e)=>checkActivate('uid',e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="token"
              label="token"
              type="token"
              id="token"
              sx={textFieldStyle}
              onChange={(e)=>checkActivate('token',e.target.value)}
            />
            <Typography sx={{textAlign:'center'}} color={'white'}>
                Check Your Email to get the Emailed UID and Token
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='warning'
              onClick={handleSubmit}
            >
              Activate
            </Button>
            <Box sx={{display:'flex', flex:1, justifyContent:'center'}}>
              <Button>
                <Link onClick={resend} variant="body2">
                  {"Resend Activation Code"}
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}