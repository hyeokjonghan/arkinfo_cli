import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import DefaultLayout from '../layout/defaultLayout'
import '@/styles/global.scss'
import Script from 'next/script'
export default function App({ Component, pageProps }) {

  return (
    <DefaultLayout>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6525817591650373" crossorigin="anonymous" />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WHFLDXZWSL"></Script>

      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WHFLDXZWSL', {
            page_path: window.location.pathname,
            });
            `,
        }}
      />

      <Component {...pageProps} />
    </DefaultLayout>
  )

}
