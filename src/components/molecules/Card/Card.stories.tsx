import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import { Favorite, Share, MoreVert } from '@mui/icons-material';
import Card from './index';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevation', 'outlined'],
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
    },
    square: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    clickable: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onClick: () => console.log('Card clicked'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    content: 'This is the card content. It can contain any text or components.',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Card
        variant="elevation"
        elevation={3}
        title="Elevation Card"
        content="This card uses elevation variant"
        style={{ width: 300 }}
      />
      <Card
        variant="outlined"
        title="Outlined Card"
        content="This card uses outlined variant"
        style={{ width: 300 }}
      />
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    title: 'Card with Image',
    subtitle: 'Beautiful landscape',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Mountain landscape',
    imageHeight: 200,
    content: 'This card includes a beautiful image at the top.',
    style: { width: 400 },
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>,
    title: 'John Doe',
    subtitle: 'Software Engineer',
    content: 'This card includes an avatar in the header.',
    style: { width: 350 },
  },
};

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'Interactive card',
    content: 'This card has action buttons at the bottom.',
    actions: (
      <>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <Button size="small">Learn More</Button>
      </>
    ),
    style: { width: 350 },
  },
};

export const ComplexCard: Story = {
  args: {
    avatar: <Avatar sx={{ bgcolor: 'secondary.main' }}>R</Avatar>,
    title: 'Recipe Card',
    subtitle: 'September 14, 2023',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Delicious food',
    imageHeight: 200,
    content: (
      <Typography variant="body2" color="text.secondary">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like.
      </Typography>
    ),
    actions: (
      <>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
        <IconButton aria-label="settings">
          <MoreVert />
        </IconButton>
      </>
    ),
    style: { width: 400 },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Loading Card',
    subtitle: 'This will be loaded',
    image: 'placeholder',
    content: 'Loading content...',
    actions: 'Loading actions...',
    style: { width: 400 },
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click me!',
    content: 'This card is clickable and will show hover effects.',
    clickable: true,
    style: { width: 350 },
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Card',
    subtitle: 'Cannot interact',
    content: 'This card is disabled and cannot be clicked.',
    clickable: true,
    disabled: true,
    style: { width: 350 },
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    subtitle: 'Additional information',
    content: 'This card has a custom footer section.',
    footer: (
      <Typography variant="caption" color="text.secondary">
        Last updated: 2 hours ago
      </Typography>
    ),
    style: { width: 350 },
  },
};

export const CustomChildren: Story = {
  args: {
    title: 'Custom Content Card',
    children: (
      <div style={{ padding: '16px 0' }}>
        <Typography variant="h6" gutterBottom>
          Custom Content
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This card uses children prop for completely custom content.
        </Typography>
        <Button variant="contained" style={{ marginTop: '16px' }}>
          Custom Action
        </Button>
      </div>
    ),
    style: { width: 350 },
  },
};

export const ElevationLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {[0, 1, 3, 6, 12, 24].map(elevation => (
        <Card
          key={elevation}
          variant="elevation"
          elevation={elevation}
          title={`Elevation ${elevation}`}
          content={`Card with elevation level ${elevation}`}
          style={{ width: 200 }}
        />
      ))}
    </div>
  ),
};
