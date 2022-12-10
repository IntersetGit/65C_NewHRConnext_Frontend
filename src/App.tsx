import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  GraphQLRequest,
  ApolloLink,
  Observable,
  FetchResult,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Cookies } from 'react-cookie';
import { GraphQLError } from 'graphql';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingSpinner from './components/loading-spinner';

const cookie = new Cookies();

/**
 * ?Create gql client
 * Setup graphql
 */

interface AccessToken {
  access_token: string;
}

const REFRESH_TOKEN = gql`
  mutation refreshToken {
    refreshToken {
      access_token
    }
  }
`;

const isRefreshReqeust = (operation: GraphQLRequest) => {
  return operation.operationName === 'refreshToken';
};

const onReaquest = (operation: GraphQLRequest) => {
  if (isRefreshReqeust(operation)) return cookie.get('refresh_token') || '';
  else return cookie.get('access') || '';
};

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GQL_URL_PATH,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'INVALID_TOKEN':
            // ignore 401 error for a refresh request
            if (operation.operationName === 'refreshToken') return;

            const observable = new Observable<FetchResult<Record<string, any>>>(
              (observer) => {
                // used an annonymous function for using an async function
                (async () => {
                  try {
                    const accessToken = await refreshToken();

                    if (!accessToken) {
                      throw new GraphQLError('Empty AccessToken');
                    }

                    // Retry the failed request
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };

                    forward(operation).subscribe(subscriber);
                  } catch (err) {
                    observer.error(err);
                  }
                })();
              },
            );

            return observable;
          case 'USER_NOT_AUTHENTICATED':
            router.navigate('/auth');
            gqlClient.clearStore();
            gqlClient.cache.reset();
        }
      }
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError.message}`);
      if (networkError.message === 'Failed to fetch') {
        router.navigate('/500');
      }
    }
  },
);

const authLink = setContext((operation, { headers }) => {
  const token = onReaquest(operation);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const gqlClient = new ApolloClient({
  // connectToDevTools: import.meta.env.NODE_ENV === 'development' ? true : false,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

const refreshToken = async () => {
  try {
    const refreshResolverResponse = await gqlClient.mutate<{
      refreshToken: AccessToken;
    }>({
      mutation: REFRESH_TOKEN,
    });

    const access = refreshResolverResponse.data?.refreshToken.access_token;
    cookie.set('access', access || '');
    return access;
  } catch (err) {
    cookie.remove('access');
    cookie.remove('refresh_token');
    router.navigate('/auth');
    gqlClient.clearStore();
    gqlClient.cache.reset();
    throw err;
  }
};

/**
 * End of graphql setup.
 */

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ApolloProvider client={gqlClient}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#FC6634',
                borderRadius: 6,
                colorBgBase: '#fff',
                fontFamily: `'Roboto','Prompt' ,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
              },
            }}
          >
            <RouterProvider
              router={router}
              fallbackElement={<LoadingSpinner />}
            />
          </ConfigProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
