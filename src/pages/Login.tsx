import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton, 
  Link,
  Container,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, AccountBalance as BankIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setError('Please fill in all fields');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        py: 4
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <BankIcon fontSize="large" />
              </Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
                Nexus Bank
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome back! Please enter your details.
              </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                variant="outlined"
                margin="normal"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                margin="normal"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link href="#" variant="body2" underline="hover">
                  Forgot password?
                </Link>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>

              <Typography variant="body2" align="center" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  component="button" 
                  variant="body2" 
                  onClick={() => navigate('/signup')}
                  sx={{ fontWeight: 600 }}
                >
                  Sign up
                </Link>
              </Typography>
            </form>
          </Card>
        </motion.div>
      </Box>
    </Container>
  );
}
