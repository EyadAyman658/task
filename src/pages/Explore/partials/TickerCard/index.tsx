import React, { useState } from 'react';
import { Box } from '@mui/material';
import Card from '../../../../components/molecules/Card';
import Text from '../../../../components/atoms/Text';
import TickerDetailsModal from '../TickerDetailsModal';
import { tickerCardStyles } from './styles';
import type { PolygonTicker } from '../../../../services/Explore';

interface TickerCardProps {
  ticker: PolygonTicker;
  loading?: boolean;
}

const TickerCard: React.FC<TickerCardProps> = ({ ticker, loading = false }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return <Card loading />;
  }

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        variant="outlined"
        clickable
        onClick={handleCardClick}
        sx={tickerCardStyles.card}
        content={
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Text
              variant="h6"
              component="span"
              sx={tickerCardStyles.tickerSymbol}
            >
              {ticker.ticker}
            </Text>
            <Text
              variant="body2"
              sx={tickerCardStyles.companyName as object}
              title={ticker.name}
            >
              {ticker.name}
            </Text>
          </Box>
        }
      />

      <TickerDetailsModal
        open={modalOpen}
        onClose={handleModalClose}
        ticker={ticker}
      />
    </>
  );
};

export default TickerCard;
