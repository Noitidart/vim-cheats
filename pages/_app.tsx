import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-source-code-pro'
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-inter: ${inter.style.fontFamily};
          --font-source-code-pro: ${sourceCodePro.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </>
  );
}
