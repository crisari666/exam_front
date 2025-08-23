import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
} from '@mui/material';
import { LanguageSwitcher } from './LanguageSwitcher';
import logoImage from '../../assets/img/logo.png';

interface AppHeaderProps {
  title?: string;
  showLogo?: boolean;
  participant?: {
    name: string;
    code: string;
    onLogout: () => void;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = 'International English Language Exam',
  showLogo = true,
  participant
}) => {
  return (
    <AppBar position="static" elevation={2} sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0.5, sm: 1 }, minHeight: '80px' }}>
          {showLogo && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <img 
                src={logoImage} 
                alt="Logo" 
                style={{ 
                  height: '80px', 
                  width: 'auto',
                  marginRight: '16px'
                }} 
              />
            </Box>
          )}
          
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              flexGrow: 1,
              color: 'text.primary',
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            {title}
          </Typography>
          
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageSwitcher />
            {participant && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                backgroundColor: 'background.default',
                borderRadius: 2,
                p: 1.5,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <Box>
                  <Typography variant="body2" fontWeight="bold" color="text.primary">
                    {participant.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Code: {participant.code}
                  </Typography>
                </Box>
                <Button 
                  size="small" 
                  variant="outlined" 
                  onClick={participant.onLogout}
                  color="error"
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
