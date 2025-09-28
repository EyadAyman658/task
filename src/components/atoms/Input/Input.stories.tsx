import type { Meta, StoryObj } from '@storybook/react';
import { Search, Visibility, AccountCircle } from '@mui/icons-material';
import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    multiline: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onChange: () => console.log('Input changed'),
    onBlur: () => console.log('Input blurred'),
    onFocus: () => console.log('Input focused'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input variant="outlined" label="Outlined" placeholder="Outlined input" />
      <Input variant="filled" label="Filled" placeholder="Filled input" />
      <Input variant="standard" label="Standard" placeholder="Standard input" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input size="small" label="Small" placeholder="Small input" />
      <Input size="medium" label="Medium" placeholder="Medium input" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input color="primary" label="Primary" />
      <Input color="secondary" label="Secondary" />
      <Input color="success" label="Success" />
      <Input color="error" label="Error" />
      <Input color="warning" label="Warning" />
      <Input color="info" label="Info" />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input type="text" label="Text" placeholder="Enter text" />
      <Input type="password" label="Password" placeholder="Enter password" />
      <Input type="email" label="Email" placeholder="Enter email" />
      <Input type="number" label="Number" placeholder="Enter number" />
      <Input type="tel" label="Phone" placeholder="Enter phone number" />
      <Input type="url" label="URL" placeholder="Enter URL" />
      <Input type="search" label="Search" placeholder="Search..." />
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input
        label="Search"
        placeholder="Search..."
        startAdornment={<Search />}
      />
      <Input
        label="Username"
        placeholder="Enter username"
        startAdornment={<AccountCircle />}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        endAdornment={<Visibility />}
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
      }}
    >
      <Input label="Normal" placeholder="Normal state" />
      <Input label="Disabled" placeholder="Disabled state" disabled />
      <Input label="Required" placeholder="Required field" required />
      <Input
        label="Error"
        placeholder="Error state"
        error
        helperText="This field has an error"
      />
      <Input
        label="With Helper Text"
        placeholder="Helper text"
        helperText="This is helper text"
      />
    </div>
  ),
};

export const Multiline: Story = {
  args: {
    label: 'Multiline Input',
    placeholder: 'Enter multiple lines...',
    multiline: true,
    rows: 4,
    fullWidth: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input with Value',
    value: 'Controlled input value',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Input with Default Value',
    defaultValue: 'Default value',
  },
};

// Enhanced Search Features
export const SearchInput: Story = {
  args: {
    search: true,
    placeholder: 'Search for tickers (e.g., AAPL, GOOGL)',
    fullWidth: true,
    onDebouncedChange: (value: string) =>
      console.log('Debounced search:', value),
  },
};

export const SearchWithCustomIcon: Story = {
  args: {
    search: true,
    searchIcon: <Search color="primary" />,
    placeholder: 'Search with custom icon',
    onDebouncedChange: (value: string) =>
      console.log('Debounced search:', value),
  },
};

export const ClearableInput: Story = {
  args: {
    clearable: true,
    label: 'Clearable Input',
    placeholder: 'Type something and see clear button',
    onClear: () => console.log('Input cleared'),
  },
};

export const SearchWithClearable: Story = {
  args: {
    search: true,
    clearable: true,
    placeholder: 'Search with clear functionality',
    fullWidth: true,
    onDebouncedChange: (value: string) =>
      console.log('Debounced search:', value),
    onClear: () => console.log('Search cleared'),
  },
};

export const DebounceDemo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '400px',
      }}
    >
      <Input
        search
        clearable
        placeholder="Fast debounce (200ms)"
        debounceDelay={200}
        onDebouncedChange={value => console.log('Fast debounce:', value)}
      />
      <Input
        search
        clearable
        placeholder="Normal debounce (500ms)"
        debounceDelay={500}
        onDebouncedChange={value => console.log('Normal debounce:', value)}
      />
      <Input
        search
        clearable
        placeholder="Slow debounce (1000ms)"
        debounceDelay={1000}
        onDebouncedChange={value => console.log('Slow debounce:', value)}
      />
    </div>
  ),
};

export const SearchVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '400px',
      }}
    >
      <Input
        search
        clearable
        variant="outlined"
        placeholder="Outlined search"
        onDebouncedChange={value => console.log('Outlined search:', value)}
      />
      <Input
        search
        clearable
        variant="filled"
        placeholder="Filled search"
        onDebouncedChange={value => console.log('Filled search:', value)}
      />
      <Input
        search
        clearable
        variant="standard"
        placeholder="Standard search"
        onDebouncedChange={value => console.log('Standard search:', value)}
      />
    </div>
  ),
};

export const SearchStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '400px',
      }}
    >
      <Input
        search
        clearable
        placeholder="Normal search"
        onDebouncedChange={value => console.log('Normal search:', value)}
      />
      <Input
        search
        clearable
        placeholder="Disabled search"
        disabled
        onDebouncedChange={value => console.log('Disabled search:', value)}
      />
      <Input
        search
        clearable
        placeholder="Error search"
        error
        helperText="Invalid search query"
        onDebouncedChange={value => console.log('Error search:', value)}
      />
      <Input
        search
        clearable
        placeholder="Success search"
        color="success"
        helperText="Search query is valid"
        onDebouncedChange={value => console.log('Success search:', value)}
      />
    </div>
  ),
};
