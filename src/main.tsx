import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import 'nprogress/nprogress.css';
import './styles/components/fancyroute.css';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import LoadingSpinner from './components/loading-spinner';

/**
 * ?Create gql client
 */

// const link = createHttpLink({
//   uri: import.meta.env.VITE_GQL_URL_PATH,
//   credentials: 'same-origin',
// });

const gqlClient = new ApolloClient({
  uri: import.meta.env.VITE_GQL_URL_PATH,
  cache: new InMemoryCache(),
});

/**
 * ?Create query client
 */

const queryClient = new QueryClient();
const Lazyapp = React.lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ApolloProvider client={gqlClient}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FC6634',
              borderRadius: 10,
              colorBgBase: '#fff',
              fontFamily: `'Prompt' ,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
            },
          }}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Lazyapp />
          </Suspense>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ApolloProvider>
  </>,
);
