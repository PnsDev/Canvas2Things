// @refresh reload
import {
  Html,
  Head,
  Body,
  Meta,
  Routes,
  FileRoutes,
  Scripts,
  ErrorBoundary,
} from 'solid-start';
import { Suspense } from 'solid-js';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <title>Canvas2Things</title>
        <meta name="description" content="Upgrade your scheduling experience with seamless Canvas Calendar integration for Things 3" />
        
        <link rel="icon" type="image/x-icon" href="/favicon.ico?" />

        <meta property="og:url" content="https://canvas2things.pns.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Canvas2Things" />
        <meta property="og:description" content="Upgrade your scheduling experience with seamless Canvas Calendar integration for Things 3" />
        <meta property="og:image" content="/preview.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="canvas2things.pns.dev" />
        <meta property="twitter:url" content="/preview.png" />
        <meta name="twitter:title" content="Canvas2Things" />
        <meta name="twitter:description" content="Upgrade your scheduling experience with seamless Canvas Calendar integration for Things 3" />
        <meta name="twitter:image" content="/preview.png" />

        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
