# Thunder Task - Stock Ticker Explorer

A modern React application for exploring stock tickers with real-time data from Polygon.io API. Built with TypeScript, Material-UI, and React Query for optimal performance and user experience.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Polygon.io API key

### Installation & Setup

1. **Clone and install dependencies**

```bash
git clone <repository-url>
cd thunder-task
npm install
```

2. **Environment Configuration**

```bash
cp .env.example .env
```

Edit `.env` file:

```env
VITE_POLYGON_API_KEY=your_polygon_api_key_here
VITE_API_BASE_URL=https://api.polygon.io/v3/reference
NODE_ENV=development
```

3. **Start Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run typecheck    # Run TypeScript type checking
```

### Testing

```bash
npm test             # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Open Vitest UI
```

### Storybook

```bash
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook static files
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── atoms/           # Basic components (Button, Input, etc.)
│   └── molecules/       # Composite components (Card, Modal)
├── pages/               # Application pages
│   ├── Splash/          # Landing page
│   └── Explore/         # Main ticker exploration page
├── services/            # API and data management
│   ├── network/         # HTTP client configuration
│   └── Explore/         # Polygon API integration
├── store/               # State management (Zustand)
├── theme/               # Material-UI theme configuration
├── localization/        # i18next translations (EN/AR)
├── hooks/               # Custom React hooks
├── layout/              # Layout components
├── routes/              # React Router configuration
└── utilities/           # Helper functions
```

## 🎨 Key Features

### 🔍 Stock Ticker Explorer (`src/pages/Explore/`)

- **Search & Filter**: Real-time ticker search with debounced input
- **Infinite Scroll**: Optimized data loading with pagination
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Modal Showing Per Card**: Press on any card for further details

- **Error Handling**: Comprehensive error states and retry mechanisms

### 🎯 Component Architecture (`src/components/`)

- **Atomic Design**: Organized into atoms and molecules
- **TypeScript**: Full type safety with strict interfaces
- **Storybook**: Interactive component documentation
- **Testing**: Comprehensive test coverage with Vitest

### 🌐 API Integration (`src/services/`)

- **Polygon.io**: Real-time stock data integration
- **React Query**: Caching, background updates, and optimistic UI
- **Error Recovery**: Rate limiting handling and automatic retries
- **Type Safety**: Full TypeScript integration

### 🎨 Design System (`src/theme/`)

- **Material-UI v7**: Latest MUI components and styling
- **Dark/Light Themes**: System preference detection
- **Responsive Design**: Mobile-first approach
- **Custom Typography**: Roboto font family with scale

### 🌍 Internationalization (`src/localization/`)

- **Multi-language**: English and Arabic support
- **RTL Support**: Complete right-to-left layout
- **Persistent Settings**: localStorage integration

## 🔧 Technical Stack

### Core Framework

- **React 19** - Latest React with concurrent features
- **TypeScript 5.8** - Strict type checking
- **Vite 7** - Fast build tool and dev server

### UI & Styling

- **Material-UI 7** - Component library
- **Emotion** - CSS-in-JS styling
- **Responsive Design** - Mobile-first breakpoints

### State Management

- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **Local Storage** - Settings persistence

### API & Data

- **Axios** - HTTP client with interceptors
- **Polygon.io API** - Real-time stock data
- **Rate Limiting** - Automatic retry with backoff

### Development Tools

- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates
- **Vitest** - Fast unit testing
- **Storybook** - Component development

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Specific test file
npm test -- src/components/atoms/Button/Button.test.tsx

# Coverage report
npm run test:run --coverage
```

### Test Structure

- **Unit Tests**: All components have comprehensive tests
- **Integration Tests**: Page-level testing with mocked dependencies
- **E2E Ready**: Prepared for Playwright/Cypress integration

### Key Test Files

- `src/components/atoms/Button/Button.test.tsx` - Button component
- `src/pages/Explore/Explore.test.tsx` - Main page functionality
- `src/services/Explore/index.test.ts` - API service layer

## 🌐 API Configuration

### Polygon.io Setup

1. **Get API Key**: Register at [polygon.io](https://polygon.io)
2. **Set Environment Variable**:

```env
VITE_POLYGON_API_KEY=your_api_key_here
```

### API Features (`src/services/Explore/PolygonService.ts`)

- **Ticker Search**: Search stocks by symbol
- **Pagination**: Infinite scroll with cursor-based pagination
- **Rate Limiting**: Automatic handling of API limits
- **Error Recovery**: Retry logic with exponential backoff

### Custom Hooks (`src/hooks/`)

- `useInfiniteScroll` - Intersection Observer for pagination
- `useDebounce` - Input debouncing for search
- `useI18n` - Internationalization helpers

## 🎨 Theming & Styling

### Theme Configuration (`src/theme/`)

```typescript
// Custom theme usage
import { useThemeStore } from './store/theme';

const { currentTheme, setTheme } = useThemeStore();
```

### Responsive Breakpoints (`src/theme/breakpoints.ts`)

```typescript
// Available breakpoints
const breakpoints = {
  xs: 0, // Mobile
  sm: 600, // Tablet
  md: 900, // Laptop
  lg: 1200, // Desktop
  xl: 1536, // Large Desktop
};
```

### Component Styling (`src/pages/Explore/partials/*/styles.ts`)

- **Styled Components**: Theme-aware styling
- **Responsive Design**: Breakpoint-based layouts
- **Dark Mode**: Automatic color scheme switching

## 🚀 Production Build

### Build Process

```bash
npm run build
```

### Build Output

- **Static Assets**: Optimized JS, CSS, and images
- **TypeScript**: Compiled and type-checked
- **Bundle Analysis**: Automatic code splitting

### Deployment

```bash
npm run preview  # Test production build locally
```

## 🔍 Code Quality

### Git Hooks (`.husky/pre-commit`)

- **Lint Staged**: ESLint and Prettier on changed files
- **Type Check**: TypeScript compilation check
- **Test Run**: Affected test execution

### Code Standards

- **TypeScript Strict**: No implicit any, strict null checks
- **ESLint Config**: React, TypeScript, and Prettier rules
- **Import Organization**: Absolute imports with path mapping

## 📚 Additional Resources

- **Storybook**: Component documentation at `http://localhost:6006`
- **Vitest UI**: Test runner interface at `http://localhost:51204`
- **TypeScript**: Strict mode with comprehensive type checking
- **Material-UI**: [Official documentation](https://mui.com/)
- **React Query**: [TanStack Query docs](https://tanstack.com/query)

## 🤝 Contributing

1. **Code Style**: Follow ESLint and Prettier configurations
2. **Testing**: Add tests for new components and features
3. **TypeScript**: Maintain strict type safety
4. **Documentation**: Update Storybook stories for UI components

---

**Developed by Eyad Ayman Gabr**
