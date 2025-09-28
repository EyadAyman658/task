import type { ModalProps as MuiModalProps } from '@mui/material/Modal';

export interface ModalProps extends Omit<MuiModalProps, 'children' | 'title'> {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
}
