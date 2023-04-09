import ModalsProvider from '@/component/help/ModalsProvider';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ModalsProvider>
      <Component {...pageProps} />
    </ModalsProvider>
  );
}
