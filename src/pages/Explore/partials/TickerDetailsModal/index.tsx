import React from 'react';
import { Typography, Chip, Box, Divider } from '@mui/material';
import Modal from '../../../../components/molecules/Modal';
import { useI18n } from '../../../../hooks/useI18n';
import { tickerDetailsModalStyles } from './styles';
import type { PolygonTicker } from '../../../../services/Explore';

interface TickerDetailsModalProps {
  open: boolean;
  onClose: () => void;
  ticker: PolygonTicker | null;
}

const TickerDetailsModal: React.FC<TickerDetailsModalProps> = ({
  open,
  onClose,
  ticker,
}) => {
  const { t } = useI18n('explore');

  if (!ticker) return null;

  const getMarketColor = (market: string) => {
    switch (market.toLowerCase()) {
      case 'stocks':
        return 'primary';
      case 'forex':
        return 'secondary';
      case 'crypto':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatExchange = (exchange: string) => {
    if (exchange === 'XNAS') return t('ticker.exchange.nasdaq');
    if (exchange === 'XNYS') return t('ticker.exchange.nyse');
    return exchange;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <Box sx={tickerDetailsModalStyles.titleContainer}>
          <Typography
            variant="h5"
            component="span"
            sx={tickerDetailsModalStyles.tickerSymbol}
          >
            {ticker.ticker}
          </Typography>
          <Chip
            label={ticker.market}
            size="small"
            color={
              getMarketColor(ticker.market) as
                | 'primary'
                | 'secondary'
                | 'warning'
                | 'default'
            }
          />
        </Box>
      }
      size="medium"
      maxWidth="md"
    >
      <Box sx={tickerDetailsModalStyles.mainContainer}>
        {/* Company Name */}
        <Box>
          <Typography variant="h6" sx={tickerDetailsModalStyles.sectionTitle}>
            {t('ticker.companyName')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {ticker.name}
          </Typography>
        </Box>

        <Divider />

        {/* Trading Information */}
        <Box>
          <Typography
            variant="h6"
            sx={tickerDetailsModalStyles.tradingSectionTitle}
          >
            {t('ticker.tradingInformation')}
          </Typography>
          <Box sx={tickerDetailsModalStyles.gridContainer}>
            {ticker.primary_exchange && (
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={tickerDetailsModalStyles.fieldLabel}
                >
                  {t('ticker.primaryExchange')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={tickerDetailsModalStyles.fieldValue}
                >
                  {formatExchange(ticker.primary_exchange)}
                </Typography>
              </Box>
            )}

            {ticker.type && (
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={tickerDetailsModalStyles.fieldLabel}
                >
                  {t('ticker.securityType')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={tickerDetailsModalStyles.fieldValue}
                >
                  {ticker.type}
                </Typography>
              </Box>
            )}

            {ticker.currency_name && (
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={tickerDetailsModalStyles.fieldLabel}
                >
                  {t('ticker.currency')}
                </Typography>
                <Typography
                  variant="body1"
                  sx={tickerDetailsModalStyles.fieldValue}
                >
                  {ticker.currency_name}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={tickerDetailsModalStyles.fieldLabel}
              >
                {t('ticker.tradingStatus')}
              </Typography>
              <Chip
                label={
                  ticker.active ? t('ticker.active') : t('ticker.inactive')
                }
                size="small"
                color={ticker.active ? 'success' : 'default'}
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>

        {/* Additional Details */}
        {(ticker.market || ticker.locale) && (
          <>
            <Divider />
            <Box>
              <Typography
                variant="h6"
                sx={tickerDetailsModalStyles.marketSectionTitle}
              >
                {t('ticker.marketDetails')}
              </Typography>
              <Box sx={tickerDetailsModalStyles.gridContainer}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={tickerDetailsModalStyles.fieldLabel}
                  >
                    {t('ticker.market')}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={tickerDetailsModalStyles.fieldValue}
                  >
                    {ticker.market}
                  </Typography>
                </Box>

                {ticker.locale && (
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={tickerDetailsModalStyles.fieldLabel}
                    >
                      {t('ticker.locale')}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={tickerDetailsModalStyles.fieldValue}
                    >
                      {ticker.locale}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default TickerDetailsModal;
