import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Input from '../../../../components/atoms/Input';
import { useI18n } from '../../../../hooks/useI18n';
import { searchSectionStyles } from './styles';

interface SearchSectionProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  onClear,
  isLoading = false,
}) => {
  const { t } = useI18n('explore');

  return (
    <Box sx={searchSectionStyles.container}>
      <Container maxWidth="md" sx={searchSectionStyles.innerContainer}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={searchSectionStyles.title}
        >
          {t('title')}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={searchSectionStyles.subtitle}
        >
          {t('subtitle')}
        </Typography>

        <Input
          search
          clearable
          placeholder={t('search.placeholder')}
          onDebouncedChange={onSearch}
          onClear={onClear}
          disabled={isLoading}
          debounceDelay={800}
          size="medium"
          autoFocus
          sx={searchSectionStyles.searchInput}
        />
      </Container>
    </Box>
  );
};

export default SearchSection;
