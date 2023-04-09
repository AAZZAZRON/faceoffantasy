import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Routes from '../utils/misc/routes';
import { setToken, setRefresh, setUser } from '../utils/AuthService';
import { getRandomImage } from '../utils/imageRandomizer';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Faceoff Fantasy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignupScreen(props) {

  const [notify, setNotify] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email')+"";
    let username = data.get('username')+"";
    let password = data.get('password')+"";
    let password2 = data.get('password2')+"";
    fetch(`${Routes.POST.SIGNUP}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            password2: password2,
        }),
      })
      .then((response) => response.json())
      .then((json) => {
        if(!json.success) {
            setNotify(json.message);
        } else {
            fetch(`${Routes.AUTH.LOGIN}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        }),
                    })
                .then((response) => response.json())
              .then((json) => {
                if(json.access && json.refresh) {
                  setToken(json.access);
                  setRefresh(json.refresh);
                  fetch(`${Routes.USER}/`)
                      .then((response) => response.json())
                      .then((json) => {
                            for(let i = 0; i < json.length; i++) {
                                if(json[i].username === username) {
                                    setUser(json[i]);
                                    window.location.href = "/lyonhacks3/";
                                    break;
                                }
                            }
                      });
                } else {
                    setNotify("Error, please try again.");
                }
            });
        }
      });
  };

  const bg = getRandomImage();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Join Faceoff Fantasy!
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Retype Password"
                type="password"
                id="password2"
                autoComplete="current-password"
              />
              <div style={{color: 'red'}}>{notify}</div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/lyonhacks3/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}