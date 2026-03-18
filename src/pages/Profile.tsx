import React, { useState } from 'react';
import { 
  Box,
  Card, 
  Typography, 
  Avatar, 
  Button, 
  TextField, 
  Divider,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid
} from '@mui/material';
import { 
  Edit as EditIcon, 
  PhotoCamera as CameraIcon,
  Security as SecurityIcon,
  Notifications as NotifyIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import { USER_DATA } from '../services/mockData';
import { motion } from 'framer-motion';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(USER_DATA);

  const handleSave = () => {
    setIsEditing(false);
    setSuccess(true);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Account Settings
        </Typography>
        <Typography color="text.secondary">
          Manage your personal information and preferences.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar 
                  src={userData.avatar} 
                  sx={{ width: 120, height: 120, mx: 'auto', border: '4px solid', borderColor: 'primary.light' }} 
                />
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' }
                  }}
                  size="small"
                >
                  <CameraIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{userData.name}</Typography>
              <Typography color="text.secondary" gutterBottom>{userData.email}</Typography>
              <Chip label="Premium Member" color="primary" variant="outlined" sx={{ mt: 1 }} />
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Account Status</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Verification</Typography>
                  <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>Verified</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Daily Limit</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>$10,000.00</Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        {/* Edit Details */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ p: 4, borderRadius: 4, mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Personal Information</Typography>
                {!isEditing ? (
                  <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button color="inherit" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>Save Changes</Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    disabled={!isEditing}
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    disabled={!isEditing}
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    disabled={!isEditing}
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Account Number"
                    disabled
                    value={userData.accountNumber}
                  />
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>Preferences</Typography>
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon><NotifyIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Push Notifications" 
                    secondary="Receive alerts for transactions and security" 
                  />
                  <Switch defaultChecked />
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon><SecurityIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Two-Factor Authentication" 
                    secondary="Add an extra layer of security to your account" 
                  />
                  <Switch defaultChecked />
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon><LanguageIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Language" 
                    secondary="English (United States)" 
                  />
                  <Button size="small">Change</Button>
                </ListItem>
              </List>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar 
        open={success} 
        autoHideDuration={4000} 
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Profile updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
