import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ExamLanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {i18n.language === 'en' ? 'Language / Idioma:' : 'Language / Idioma:'}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        onClick={toggleLanguage}
        sx={{ minWidth: '60px' }}
      >
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </Button>
    </Box>
  );
};

export default ExamLanguageSwitcher;
