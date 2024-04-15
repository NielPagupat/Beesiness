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

const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column', mt: 3 }}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        sx={{flex:2, marginX:1}}
                        id="firstName"
                        label="First Name"
                        helperText="Birthdate"
                        autoFocus
                        />

                <TextField
                        autoComplete="surname"
                        name="lastname"
                        required
                        sx={{flex:2, marginX:1}}
                        id="lastname"
                        label="Last Name"
                        autoFocus
                        />
                <TextField
                        autoComplete="mi"
                        name="mi"
                        required
                        sx={{flex:1, marginX:1}}
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
                    sx={{flex:1, marginX:1}}
                    id="Birthday"
                    autoFocus
                    type='date'
                    />
                <TextField
                    autoComplete="Gender"
                    name="gender"
                    required
                    sx={{flex:1, marginX:1}}
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
                    sx={{flex:1, marginX:1, marginY:2}}
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
                    sx={{flex:1, marginX:1, marginY:2}}
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
                    sx={{flex:1, marginX:1, marginY:2}}
                    autoFocus
                    />
            </Box>
            <Box sx={{display:'flex', flex:1, justifyContent:'center'}}>
                <Button
                type="submit"
                variant="contained"
                sx={{width:200, marginX:1}}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
