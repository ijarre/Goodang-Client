import "tailwindcss/tailwind.css";
import store from "../app/store";
import { Provider } from "react-redux";
import AuthLayout from "../Layouts/AuthLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
