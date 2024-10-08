"use client";
import FormControl from "@mui/material/FormControl";
import {
  Alert,
  Box,
  Button,
  Grid,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";



const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
 

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"    
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password })
      });
      
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      //const data = await response.json();
      //const token = data.token;
      //  if (!token) {
      //   throw new Error("Login failed!");
      // }
      
  
      router.push("/home");
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      setOpen(true);
      router.push('/login')
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: isSmallScreen ? "320px" : "350px",
          width: "380px",
          m: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div" gutterBottom  sx={{ 
            fontFamily: 'Arial, sans-serif', // Change to your desired font family
            fontSize: '24px', // Change to your desired font size
            fontWeight: 'bold', // Change to your desired font weight
          }}>
          Login
        </Typography>
        <FormControl>
        <Grid container spacing={3} justifyContent={'center'}>

        <Grid item xs={12} sm={12}>
          <TextField
            label="Username"
            size="small"
            fullWidth
            value={username}
            type="text"
            onChange={handleUsernameChange}
          />
          </Grid>

            <Grid item xs={12}>          
          <TextField
            size="small"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          </Grid>
         
            <Grid item xs={12} sm={12}>
            <Button variant="contained" fullWidth onClick={handleSignIn}>
          Login
        </Button>
        
          </Grid>
          </Grid>
        </FormControl>
     
      </Paper>
      <Snackbar anchorOrigin = {{ vertical: 'bottom', horizontal: 'center' }} onClose={()=>{setOpen(false)}}open = {open} autoHideDuration={2000} >
        <Alert  variant="filled"  severity="error">
          Invalid Credentials!
        </Alert>
      </Snackbar>
    </Grid>
    
  );
};

export default SignupForm;
