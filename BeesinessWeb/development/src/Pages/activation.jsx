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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
            />
            <Typography sx={{textAlign:'center'}} color={'white'}>
                Check Your Email to get the Emailed UID and Token
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='warning'
            >
              Activate
            </Button>
            <Box sx={{display:'flex', flex:1, justifyContent:'center'}}>
              <Link href="#" variant="body2">
                {"Resend Activation Code"}
              </Link>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}