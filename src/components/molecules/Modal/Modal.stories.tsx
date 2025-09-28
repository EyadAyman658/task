import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import Modal from './index';
import type { ModalProps } from './interface';

const meta: Meta<typeof Modal> = {
  title: 'Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
    closeOnBackdrop: {
      control: { type: 'boolean' },
    },
    closeOnEscape: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: ModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  args: {
    title: 'Default Modal',
    children: (
      <Typography>
        This is the default modal content. You can put any content here.
      </Typography>
    ),
  },
  render: ModalWrapper,
};

export const WithoutTitle: Story = {
  args: {
    children: (
      <Box>
        <Typography variant="h6" gutterBottom>
          Modal without title
        </Typography>
        <Typography>
          This modal doesn't have a title in the header. The close button is
          still available.
        </Typography>
      </Box>
    ),
  },
  render: ModalWrapper,
};

export const Sizes: Story = {
  args: {
    title: 'Medium Modal',
    children: (
      <Typography>
        This is a medium-sized modal. Try changing the size prop to see
        different sizes.
      </Typography>
    ),
    size: 'medium',
  },
  render: function ModalSizes(args) {
    const [openSmall, setOpenSmall] = useState(false);
    const [openMedium, setOpenMedium] = useState(false);
    const [openLarge, setOpenLarge] = useState(false);

    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => setOpenSmall(true)}>
          Small Modal
        </Button>
        <Button variant="contained" onClick={() => setOpenMedium(true)}>
          Medium Modal
        </Button>
        <Button variant="contained" onClick={() => setOpenLarge(true)}>
          Large Modal
        </Button>

        <Modal
          {...args}
          size="small"
          title="Small Modal"
          open={openSmall}
          onClose={() => setOpenSmall(false)}
        >
          <Typography>This is a small modal.</Typography>
        </Modal>

        <Modal
          {...args}
          size="medium"
          title="Medium Modal"
          open={openMedium}
          onClose={() => setOpenMedium(false)}
        >
          <Typography>This is a medium modal.</Typography>
        </Modal>

        <Modal
          {...args}
          size="large"
          title="Large Modal"
          open={openLarge}
          onClose={() => setOpenLarge(false)}
        >
          <Typography>This is a large modal.</Typography>
        </Modal>
      </Box>
    );
  },
};

export const WithActions: Story = {
  args: {
    title: 'Modal with Actions',
    children: (
      <Typography>This modal has action buttons in the footer.</Typography>
    ),
    actions: (
      <>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save</Button>
      </>
    ),
  },
  render: ModalWrapper,
};

export const WithFooter: Story = {
  args: {
    title: 'Modal with Footer',
    children: (
      <Typography>
        This modal has both footer content and action buttons.
      </Typography>
    ),
    footer: (
      <Typography variant="caption" color="text.secondary">
        Footer information goes here
      </Typography>
    ),
    actions: (
      <>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Confirm</Button>
      </>
    ),
  },
  render: ModalWrapper,
};

export const LongContent: Story = {
  args: {
    title: 'Modal with Long Content',
    children: (
      <Box>
        {Array.from({ length: 20 }, (_, i) => (
          <Typography key={i} paragraph>
            This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Typography>
        ))}
      </Box>
    ),
  },
  render: ModalWrapper,
};

export const NoCloseButton: Story = {
  args: {
    title: 'Modal without Close Button',
    showCloseButton: false,
    children: (
      <Typography>
        This modal doesn't have a close button. You can only close it by
        clicking outside or pressing Escape.
      </Typography>
    ),
  },
  render: ModalWrapper,
};

export const RestrictedClosing: Story = {
  args: {
    title: 'Restricted Closing Modal',
    closeOnBackdrop: false,
    closeOnEscape: false,
    children: (
      <Box>
        <Typography paragraph>
          This modal can only be closed using the close button. Clicking outside
          or pressing Escape won't work.
        </Typography>
        <Typography variant="caption" color="warning.main">
          Use this pattern carefully to avoid trapping users.
        </Typography>
      </Box>
    ),
  },
  render: ModalWrapper,
};
