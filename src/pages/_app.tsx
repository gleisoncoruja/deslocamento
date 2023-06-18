import { AppProps } from 'next/app';
import '../style/globals.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/theme';
import RootLayout from '@/components/Layout';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <RootLayout>         
            <CssBaseline />
            <Component {...pageProps} />      
        </RootLayout>
    </ThemeProvider>
  );
}

export default MyApp;