import '../styles/globals.css'
import {SessionProvider} from "next-auth/react";
import Script from "next/script";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {

  return (
      <SessionProvider session={session}>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <Component {...pageProps} />
      </SessionProvider>

  )
}

export default MyApp
