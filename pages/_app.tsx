import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Source_Code_Pro } from 'next/font/google';
import localFont from 'next/font/local';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-source-code-pro'
});

const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter-4.1/web/Inter-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-4.1/web/Inter-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
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
