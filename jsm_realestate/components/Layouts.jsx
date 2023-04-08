import { Box } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Box maxWidth="1280px" m="auto">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
