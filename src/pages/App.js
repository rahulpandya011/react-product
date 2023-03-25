import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import PagesRoutes from '../routes';
import { setAuthToken } from '../libs/HttpClient';
import { persistor, store } from '../store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //retryOnMount:
      // retry: false
    },
  },
});

function App() {
  const handleOnBeforeLift = () => {
    if (
      store.getState().user.accessToken !== undefined &&
      store.getState().user.accessToken !== null
    ) {
      setAuthToken(store.getState().user.accessToken);
    }
  };

  return (
    <Suspense fallback={'Loading'}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={handleOnBeforeLift}>
          <QueryClientProvider client={queryClient}>
            <PagesRoutes />
            <ToastContainer />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
}
export default App;
