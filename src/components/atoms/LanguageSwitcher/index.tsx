import React from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { Language as LanguageIcon, ExpandMore } from '@mui/icons-material';
import { useLanguageSwitcher } from '../../../hooks/useLanguageSwitcher';
import type { Language } from '../../../localization/i18n';
import type { LanguageSwitcherProps } from './interface';

const LANGUAGE_LABELS = {
  en: 'English',
  ar: 'العربية',
} as const;

const LANGUAGE_FLAGS = {
  en: '🇺🇸',
  ar: '🇸🇦',
} as const;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'menu',
  size = 'medium',
  showLabel = true,
}) => {
  const {
    currentLanguage,
    availableLanguages,
    switchLanguage,
    toggleLanguage,
  } = useLanguageSwitcher();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (variant === 'button') {
      toggleLanguage();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = async (language: Language) => {
    await switchLanguage(language);
    handleClose();
  };

  const currentLanguageLabel =
    LANGUAGE_LABELS[currentLanguage as keyof typeof LANGUAGE_LABELS] ||
    currentLanguage;
  const currentLanguageFlag =
    LANGUAGE_FLAGS[currentLanguage as keyof typeof LANGUAGE_FLAGS] || '🌐';

  if (variant === 'button') {
    return (
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        size={size}
        variant="outlined"
        sx={{ minWidth: 'auto', gap: 1 }}
      >
        <Box component="span" sx={{ fontSize: '1.2em' }}>
          {currentLanguageFlag}
        </Box>
        {showLabel && currentLanguageLabel}
      </Button>
    );
  }

  return (
    <>
      <Button
        id="language-switcher-button"
        aria-controls={open ? 'language-switcher-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={<ExpandMore />}
        size={size}
        variant="outlined"
        sx={{ gap: 1 }}
      >
        <Box component="span" sx={{ fontSize: '1.2em' }}>
          {currentLanguageFlag}
        </Box>
        {showLabel && currentLanguageLabel}
      </Button>

      <Menu
        id="language-switcher-menu"
        MenuListProps={{
          'aria-labelledby': 'language-switcher-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {availableLanguages.map(language => {
          const label =
            LANGUAGE_LABELS[language as keyof typeof LANGUAGE_LABELS] ||
            language;
          const flag =
            LANGUAGE_FLAGS[language as keyof typeof LANGUAGE_FLAGS] || '🌐';
          const isSelected = language === currentLanguage;

          return (
            <MenuItem
              key={language}
              onClick={() => handleLanguageSelect(language)}
              selected={isSelected}
              aria-selected={isSelected}
              sx={{
                minHeight: 40,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box component="span" sx={{ fontSize: '1.2em' }}>
                {flag}
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: isSelected ? 600 : 400 }}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
