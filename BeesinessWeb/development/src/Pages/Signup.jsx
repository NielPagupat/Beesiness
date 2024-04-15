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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const today = new Date().toISOString().split('T')[0];
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

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0])
  return (
    <Box sx={{backgroundImage:'url(../src/assets/beehive.png)', backgroundSize:'cover', display:'flex', flex:1, height:'100vh', alignItems:'center'}}>
      <Container component="main" maxWidth="md" sx={{backgroundColor:'rgba(32, 32, 32, 0.6)', height:800, borderRadius:20, boxShadow: '10px 20px 20px rgba(0, 0, 0, 0.5)'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: 100, height: 100}} src='../src/assets/beesiness.png'/>
          <Typography component="h1" variant="h5" color={'white'}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column', mt: 3 }}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        id="firstName"
                        label="First Name"
                        autoFocus
                        sx={textFieldStyle}
                        />

                <TextField
                        autoComplete="surname"
                        name="lastname"
                        required
                        sx={textFieldStyle}
                        id="lastname"
                        label="Last Name"
                        autoFocus
                        />
                <TextField
                        autoComplete="mi"
                        name="mi"
                        required
                        sx={textFieldStyle}
                        id="mi"
                        label="M.I."
                        autoFocus
                        />
            </Box>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <TextField
                    autoComplete="05/05/2000"
                    name="bdate"
                    required
                    sx={textFieldStyle}
                    id="Birthday"
                    autoFocus
                    type='date'
                    defaultValue={date}
                    label='Birthdate'
                    />
                <TextField
                    autoComplete="Gender"
                    name="gender"
                    required
                    sx={textFieldStyle}
                    id="gender"
                    label="Gender"
                    autoFocus
                    />
            </Box>

            <Box sx={{display:'flex'}}>
                <TextField
                    autoComplete="Email"
                    name="Email"
                    required
                    id="email"
                    label="Email"
                    sx={textFieldStyle}
                    autoFocus
                    />
            </Box>
            <Box sx={{display:'flex'}}>
                <TextField
                    autoComplete="password"
                    name="password"
                    required
                    id="password"
                    label="Password"
                    sx={textFieldStyle}
                    autoFocus
                    type='password'
                    />
            </Box>
            <Box sx={{display:'flex'}}>
                <TextField
                    autoComplete="confirm-password"
                    name="confirm-password"
                    required
                    id="confirm-password"
                    label="confirm-password"
                    sx={textFieldStyle}
                    autoFocus
                    />
            </Box>
            <Box sx={{display:'flex', flex:1, justifyContent:'center'}}>
                <Button
                type="submit"
                variant="contained"
                sx={{width:200, marginX:1}}
                color='warning'
                >
                Sign Up
                </Button>
            </Box>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>     
  );
}
