import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { ModalProps } from './interface';
import Text from '../../atoms/Text';

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  actions,
  footer,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (
    _event: object,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (!closeOnBackdrop && reason === 'backdropClick') return;
    if (!closeOnEscape && reason === 'escapeKeyDown') return;
    onClose();
  };

  const getMaxWidth = () => {
    if (size === 'fullscreen') return false;
    if (size === 'small') return 'xs';
    if (size === 'large') return 'lg';
    return maxWidth;
  };

  const getFullScreen = () => {
    return size === 'fullscreen' || (isMobile && size === 'large');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={getMaxWidth()}
      fullWidth={fullWidth}
      fullScreen={getFullScreen()}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            borderRadius: getFullScreen() ? 0 : 2,
            maxHeight: '90vh',
          },
        },
      }}
      {...props}
    >
      {title && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pb: 2,
          }}
        >
          <Text variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Text>
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          px: 3,
          py: title ? 0 : 3,
        }}
      >
        {children}
      </DialogContent>

      {(actions || footer) && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            justifyContent: footer ? 'space-between' : 'flex-end',
          }}
        >
          {footer && <Box sx={{ flex: 1 }}>{footer}</Box>}
          {actions && <Box sx={{ display: 'flex', gap: 1 }}>{actions}</Box>}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
