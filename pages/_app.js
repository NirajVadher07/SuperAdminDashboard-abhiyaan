import '@/styles/globals.css'
// import Layout from './layout'
import { useRouter } from 'next/router';
import Footer from './components/Footer';
import Header from './components/Header';


export default function App({ Component, pageProps }) {

  const router = useRouter();
  const hideHeaderFooterPaths = ['/auth/login']; // Add the paths where you want to hide the header and footer
  const shouldRenderHeaderFooter = !hideHeaderFooterPaths.includes(router.pathname);

  return (
    <div className="bg-white text-black min-h-screen">
      {shouldRenderHeaderFooter && <Header />}
      <Component {...pageProps} />
      {shouldRenderHeaderFooter && <Footer />}
    </div>
  );
}
