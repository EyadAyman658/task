import type { Meta, StoryObj } from '@storybook/react';
import Text from './index';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'text.primary',
        'text.secondary',
        'text.disabled',
      ],
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify'],
    },
    gutterBottom: {
      control: { type: 'boolean' },
    },
    noWrap: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is default text',
  },
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
    </div>
  ),
};

export const Subtitles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="subtitle1">Subtitle 1 - Larger subtitle</Text>
      <Text variant="subtitle2">Subtitle 2 - Smaller subtitle</Text>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="body1">
        Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text variant="body2">
        Body 2 - Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
    </div>
  ),
};

export const SmallText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text variant="caption">Caption text - Small text for captions</Text>
      <Text variant="overline">OVERLINE TEXT - ALL CAPS OVERLINE</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text color="primary">Primary color text</Text>
      <Text color="secondary">Secondary color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="error">Error color text</Text>
      <Text color="warning">Warning color text</Text>
      <Text color="info">Info color text</Text>
      <Text color="text.primary">Text primary color</Text>
      <Text color="text.secondary">Text secondary color</Text>
      <Text color="text.disabled">Text disabled color</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Text textAlign="left">Left aligned text</Text>
      <Text textAlign="center">Center aligned text</Text>
      <Text textAlign="right">Right aligned text</Text>
      <Text textAlign="justify">
        Justified text - Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </div>
  ),
};

export const WithGutterBottom: Story = {
  render: () => (
    <div>
      <Text variant="h4" gutterBottom>
        Title with gutter bottom
      </Text>
      <Text variant="body1">
        This text comes after the title and has proper spacing due to
        gutterBottom.
      </Text>
    </div>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ width: '200px', border: '1px solid #ccc', padding: '8px' }}>
      <Text noWrap>
        This is a very long text that should not wrap and will be truncated with
        ellipsis
      </Text>
    </div>
  ),
};

export const Paragraph: Story = {
  args: {
    component: 'p',
    children: 'This text is rendered as a paragraph element.',
  },
};
