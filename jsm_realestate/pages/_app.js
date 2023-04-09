import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layouts';
import NProgress from 'nprogress';
import { Router } from 'next/router';

export default function App({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });

  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
