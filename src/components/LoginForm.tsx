import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormHelperText } from '@mui/material';
import { Logo } from '../constants/Colors';

interface SignInProps {
  title: string;
  submitHandler: (event: React.FormEvent<HTMLFormElement | null>) => Promise<void>;
  errRes: string | null;
}


export default function SignIn({ title, submitHandler, errRes }: SignInProps | any) {

  return (
    < >
      <center className='mt-5'>
        <img src={Logo.Main}
          style={{ width: "20%" }} alt="" />
      </center>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        

          <Typography color={"#556080"} component="h4" variant="h4">
            {title} Log in
          </Typography> <br />
          <Box component="form" onSubmit={(e) => { submitHandler(e) }} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="ID"
              name="id"
              // autoComplete="id"
              autoFocus
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
            {errRes && <FormHelperText error={true}>{errRes}</FormHelperText>}


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ color: "#FFF" }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}