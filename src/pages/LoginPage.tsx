import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Link,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 100);

      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password, rememberMe);
      handleLoginSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      navigate("/register");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: { xs: 4, sm: 8 },
        position: "relative",
        backgroundImage: "url('https://source.unsplash.com/random?movie')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 2,
            backdropFilter: "blur(4px)",
            bgcolor: "rgba(255,255,255,0.9)",
            overflow: "hidden",
          }}
        >
          {" "}
          <Tabs
            value={0}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            {" "}
            <Tab
              label="Login"
              sx={{
                py: 2,
                color: "secondary.main",
                fontWeight: "medium",
                "&.Mui-selected": {
                  color: "secondary.main",
                  fontWeight: "bold",
                },
              }}
            />
            <Tab
              label="Register"
              sx={{
                py: 2,
                fontWeight: "medium",
                "&.Mui-selected": {
                  color: "secondary.main",
                  fontWeight: "bold",
                },
              }}
            />
          </Tabs>
          <Box sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {" "}
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}{" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus={!email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  color="secondary"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "secondary.main",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "secondary.main",
                    },
                  }}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  helperText="Password must be at least 6 characters"
                  color="secondary"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "secondary.main",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "secondary.main",
                    },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="remember"
                      color="secondary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading}
                    />
                  }
                  label="Remember me"
                />{" "}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2, py: 1.2 }}
                  disabled={isLoading || !email || password.length < 6}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Sign In"}
                </Button>{" "}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" color="secondary">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
