import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useThemeStore } from './store/theme';
import { useInitializeTheme } from './hooks/useInitTheme';
import { queryClient } from './services/queryClient';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { currentTheme, isInitialized } = useThemeStore();

  // Initialize theme
  useInitializeTheme();

  if (!isInitialized) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppRoutes />
          </Box>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={currentTheme.palette.mode}
          />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
