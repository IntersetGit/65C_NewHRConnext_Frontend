import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "antd/dist/reset.css";
import "./index.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import LoadingSpinner from "./components/loading-spinner";

/**
 * ?Create query client
 */

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FC6634",
            borderRadius: 10,
            colorBgBase : '#fff',
            fontFamily: `'Prompt' ,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
          },
        }}
      >
        <Suspense fallback={<LoadingSpinner/>} >
          <RouterProvider router={router} />
        </Suspense>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </>
);
