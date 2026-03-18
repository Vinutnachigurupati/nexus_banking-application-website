import React from 'react';
import { 
  Card, 
  Typography, 
  Box, 
  Button, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Chip,
  IconButton,
  Grid
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  Send,
  Add,
  Remove,
  MoreVert,
  ArrowForward
} from '@mui/icons-material';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { MOCK_TRANSACTIONS, CHART_DATA, USER_DATA } from '../services/mockData';
import { useNavigate } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box component={motion.div} variants={container} initial="hidden" animate="show">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Welcome back, {USER_DATA.name.split(' ')[0]}!
        </Typography>
        <Typography color="text.secondary">
          Here's what's happening with your account today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Balance Card */}
        <Grid item xs={12} md={4}>
          <motion.div variants={item} style={{ height: '100%' }}>
            <Card sx={{ 
              p: 3, 
              height: '100%', 
              bgcolor: 'primary.main', 
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>Total Balance</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                ${USER_DATA.balance.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
                Account: {USER_DATA.accountNumber}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="contained" 
                  size="small" 
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                  onClick={() => navigate('/send-money')}
                >
                  Send
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  History
                </Button>
              </Box>
            </Box>
            <AccountBalanceWallet sx={{ 
              position: 'absolute', 
              right: -20, 
              bottom: -20, 
              fontSize: 180, 
              opacity: 0.1,
              transform: 'rotate(-15deg)'
            }} />
          </Card>
          </motion.div>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div variants={item} style={{ height: '100%' }}>
            <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                <TrendingUp />
              </Avatar>
              <IconButton size="small"><MoreVert /></IconButton>
            </Box>
            <Typography color="text.secondary" variant="body2">Monthly Income</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>$4,250.00</Typography>
            <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUp fontSize="inherit" sx={{ mr: 0.5 }} /> +12.5% from last month
            </Typography>
          </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <motion.div variants={item} style={{ height: '100%' }}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'error.light', color: 'error.main' }}>
                  <TrendingDown />
                </Avatar>
                <IconButton size="small"><MoreVert /></IconButton>
              </Box>
              <Typography color="text.secondary" variant="body2">Monthly Expenses</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>$1,840.00</Typography>
              <Typography variant="caption" color="error.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <TrendingDown fontSize="inherit" sx={{ mr: 0.5 }} /> -3.2% from last month
              </Typography>
            </Card>
          </motion.div>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <motion.div variants={item} style={{ height: '100%' }}>
            <Card sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Balance Overview</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          </motion.div>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={4}>
          <motion.div variants={item} style={{ height: '100%' }}>
            <Card sx={{ p: 3, height: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <Button 
                endIcon={<ArrowForward />} 
                size="small" 
                onClick={() => navigate('/transactions')}
              >
                View All
              </Button>
            </Box>
            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => (
                <ListItem key={tx.id} disablePadding sx={{ mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: tx.type === 'deposit' ? 'success.light' : 'error.light',
                      color: tx.type === 'deposit' ? 'success.main' : 'error.main'
                    }}>
                      {tx.type === 'deposit' ? <Add /> : tx.type === 'withdrawal' ? <Remove /> : <Send />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={tx.description} 
                    secondary={new Date(tx.date).toLocaleDateString()}
                    primaryTypographyProps={{ fontWeight: 600, noWrap: true }}
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 700, 
                        color: tx.type === 'deposit' ? 'success.main' : 'text.primary' 
                      }}
                    >
                      {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </Typography>
                    <Chip 
                      label={tx.status} 
                      size="small" 
                      color={tx.status === 'success' ? 'success' : tx.status === 'pending' ? 'warning' : 'error'}
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.65rem', mt: 0.5 }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
