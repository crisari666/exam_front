import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string): void => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  return (
    <Box className={className}>
      <ButtonGroup variant="outlined" size="small" aria-label="language switcher">
        <Button
          onClick={() => handleLanguageChange('en')}
          variant={currentLanguage === 'en' ? 'contained' : 'outlined'}
          color={currentLanguage === 'en' ? 'primary' : 'inherit'}
          sx={{
            minWidth: '48px',
            fontWeight: currentLanguage === 'en' ? 600 : 400,
            textTransform: 'none',
            fontSize: '0.875rem',
            px: 1.5,
            py: 0.5,
            borderColor: currentLanguage === 'en' ? 'primary.main' : 'grey.400',
            '&:hover': {
              borderColor: currentLanguage === 'en' ? 'primary.main' : 'grey.600',
            }
          }}
        >
          EN
        </Button>
        <Button
          onClick={() => handleLanguageChange('es')}
          variant={currentLanguage === 'es' ? 'contained' : 'outlined'}
          color={currentLanguage === 'es' ? 'primary' : 'inherit'}
          sx={{
            minWidth: '48px',
            fontWeight: currentLanguage === 'es' ? 600 : 400,
            textTransform: 'none',
            fontSize: '0.875rem',
            px: 1.5,
            py: 0.5,
            borderColor: currentLanguage === 'es' ? 'primary.main' : 'grey.400',
            '&:hover': {
              borderColor: currentLanguage === 'es' ? 'primary.main' : 'grey.600',
            }
          }}
        >
          ES
        </Button>
      </ButtonGroup>
    </Box>
  );
};
