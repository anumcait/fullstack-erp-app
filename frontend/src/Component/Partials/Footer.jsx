import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Collapse,
  Avatar,
  Divider
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Inventory2,
  PeopleAlt,
  Dashboard,
  TaskAlt
} from '@mui/icons-material';
import logo from "../../assets/images/EQIC_Image.jpg";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  const toggleFooter = () => setShowFooter((prev) => !prev);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: 'var(--primary-color)',
        color: 'white',
        zIndex: 1300,
        boxShadow: 4,
      }}
    >
      {/* Toggle Button */}
      <Box
        onClick={toggleFooter}
        sx={{
          textAlign: 'center',
          py: 1,
          bgcolor: 'var(--primary-color)',
          cursor: 'pointer',
          fontWeight: 600,
          letterSpacing: '0.5px',
          '&:hover': { bgcolor: 'var(--hover-color)' },
        }}
      >
        {showFooter ? <ExpandMore /> : <ExpandLess />} {showFooter ? 'Hide Footer' : 'Show Footer'}
      </Box>

      <Collapse in={showFooter}>
        <Divider sx={{ bgcolor: '#ffffff33' }} />
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={4}>
            {/* Logo & Branding */}
            <Grid item xs={12} sm={4}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  src={logo}
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'white',
                    border: '2px solid white',
                  }}
                />
                <Box>
                  <Typography variant="h6" fontWeight={600}>Aliveni ERP</Typography>
                  <Typography variant="body2" color="grey.300">
                    Empowering Your Business
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* ERP Links */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="lightblue" gutterBottom>
                ERP
              </Typography>
              <Link href="/dashboard" color="inherit" display="flex" alignItems="center" underline="hover" sx={{ mb: 1 }}>
                <Dashboard fontSize="small" sx={{ mr: 1 }} /> Dashboard
              </Link>
              <Link href="/inventory" color="inherit" display="flex" alignItems="center" underline="hover" sx={{ mb: 1 }}>
                <Inventory2 fontSize="small" sx={{ mr: 1 }} /> Inventory
              </Link>
              <Link href="/purchase" color="inherit" display="flex" alignItems="center" underline="hover">
                <TaskAlt fontSize="small" sx={{ mr: 1 }} /> Purchase
              </Link>
            </Grid>

            {/* HRMS Links */}
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" color="lightgreen" gutterBottom>
                HRMS
              </Typography>
              <Link href="/employee-master" color="inherit" display="flex" alignItems="center" underline="hover" sx={{ mb: 1 }}>
                <PeopleAlt fontSize="small" sx={{ mr: 1 }} /> Employee Master
              </Link>
              <Link href="/leave-form" color="inherit" display="flex" alignItems="center" underline="hover" sx={{ mb: 1 }}>
                <TaskAlt fontSize="small" sx={{ mr: 1 }} /> Leave Application
              </Link>
              <Link href="/leave-report" color="inherit" display="flex" alignItems="center" underline="hover">
                <TaskAlt fontSize="small" sx={{ mr: 1 }} /> Leave Reports
              </Link>
            </Grid>
          </Grid>

          {/* Bottom note */}
          <Box mt={4} textAlign="center" sx={{ borderTop: '1px solid #ffffff33', pt: 2 }}>
            <Typography variant="body2" color="grey.300">
              &copy; {new Date().getFullYear()} Aliveni ERP. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Collapse>
    </Box>
  );
};

export default Footer;
