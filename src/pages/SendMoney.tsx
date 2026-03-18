import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  MenuItem, 
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
  Avatar,
  Divider,
  IconButton,
  Grid
} from '@mui/material';
import { 
  Send as SendIcon, 
  AccountBalance as BankIcon, 
  Person as PersonIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const BANKS = [
  'Nexus Bank (Internal)',
  'Chase Bank',
  'Bank of America',
  'Wells Fargo',
  'Citibank',
  'Goldman Sachs'
];

export default function SendMoney() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    accountNumber: '',
    bank: '',
    amount: '',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate transfer
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        recipientName: '',
        accountNumber: '',
        bank: '',
        amount: '',
        note: ''
      });
    }, 2000);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Send Money
        </Typography>
        <Typography color="text.secondary">
          Transfer funds securely to any bank account.
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ p: 4, borderRadius: 4 }}>
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon color="primary" /> Recipient Details
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Recipient Name"
                      required
                      value={formData.recipientName}
                      onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      required
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Select Bank"
                      required
                      value={formData.bank}
                      onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                    >
                      {BANKS.map((bank) => (
                        <MenuItem key={bank} value={bank}>{bank}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MoneyIcon color="primary" /> Transfer Amount
                    </Typography>
                    <TextField
                      fullWidth
                      label="Amount"
                      type="number"
                      required
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Note (Optional)"
                      multiline
                      rows={2}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'background.default', 
                      borderRadius: 2, 
                      border: '1px dashed', 
                      borderColor: 'divider',
                      mb: 3
                    }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Transfer Summary
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Fee</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>$0.00 (Free)</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Estimated Arrival</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Instant</Typography>
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={!loading && <SendIcon />}
                      sx={{ py: 1.5 }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirm Transfer'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>Quick Transfer</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Recent recipients you've sent money to.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { name: 'John Doe', avatar: 'https://picsum.photos/seed/1/40' },
                { name: 'Alice Smith', avatar: 'https://picsum.photos/seed/2/40' },
                { name: 'Bob Wilson', avatar: 'https://picsum.photos/seed/3/40' }
              ].map((person) => (
                <Box 
                  key={person.name}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'background.default' }
                  }}
                  onClick={() => setFormData({ ...formData, recipientName: person.name })}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={person.avatar} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{person.name}</Typography>
                  </Box>
                  <IconButton size="small"><SendIcon fontSize="small" /></IconButton>
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Money sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
