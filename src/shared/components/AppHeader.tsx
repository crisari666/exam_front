import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { LanguageSwitcher } from './LanguageSwitcher';
import logoImage from '../../assets/img/logo.png';

interface AppHeaderProps {
  title?: string;
  showLogo?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = 'International English Language Exam',
  showLogo = true 
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
          
          <Box sx={{ ml: 'auto' }}>
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
