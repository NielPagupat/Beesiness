import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
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



export default function SignInSide() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = React.useState({
    "password": "",
    "email": ""
  })

  const checkCred = (key, value) => {
    setCredentials(prevState => ({
      ...prevState,
      [key]:value
    }))
  }
  
  const handleSubmit = async () => {
    const result = await axios.post('http://localhost:8000/api/v2/auth/token/login/',credentials,
  {headers:{
    'Content-Type':'application/JSON',
    'Referrer-Policy':'same-origin',
    'Cross-Origin-Opener-Policy':'same-origin'
  }}).then(response=>{
    navigate('/dash/'+response.data.auth_token)
    console.log(response)
  }).catch(error=>{
    alert("invalidCredentials")
  })
  };



  return (
    <Box sx={{backgroundImage:'url(../src/assets/beehive.png)', backgroundSize:'cover'}}>
      <Grid container  sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random?bee,beehives',
            // backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            // backgroundSize: 'contain',
            // backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5}  elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              
            }}
          >
            <Avatar sx={{ m: 1, width: 100, height: 100}} src='../src/assets/beesiness.png'/>
            
            <Typography component="h1" variant="h5" color={'white'}>
              Sign in
            </Typography>
            <Box sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={textFieldStyle}
                onChange={(e)=>checkCred("email", e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={textFieldStyle}
                onChange={(e)=>checkCred("password", e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="warning" />}
                label="Remember me"
                sx={{
                  '& .MuiTypography-root': {
                      color: 'white', // Change label color to white
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color='warning'
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}