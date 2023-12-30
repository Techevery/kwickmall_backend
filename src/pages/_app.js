import React from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthContextProvider, useAuthContext } from '@/context/AuthContext'; // Adjust the path as needed
import { useNProgress } from '@/hooks/use-nprogress'; // Adjust the path as needed
import { createTheme } from '@/theme'; // Adjust the path as needed
import { createEmotionCache } from '@/utils/create-emotion-cache'; // Adjust the path as needed
import 'simplebar-react/dist/simplebar.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <div style={{ backgroundColor: '#F7F7F7' }}>
      <ToastContainer />

      <CacheProvider value={emotionCache}>
        <Head>
          <title>Kwickmall</title>
          <meta
            name="viewport"
            content="initial-scale=1, width=device-width"
          />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthContextProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthContentWrapper>
                {({ isLoading }) =>
                  isLoading ? <SplashScreen /> : getLayout(<Component {...pageProps} />)
                }
              </AuthContentWrapper>
            </ThemeProvider>
          </AuthContextProvider>
        </LocalizationProvider>
      </CacheProvider>
    </div>
  );
};

const AuthContentWrapper = ({ children }) => {
  const auth = useAuthContext();

  return children(auth);
};

export default App;
