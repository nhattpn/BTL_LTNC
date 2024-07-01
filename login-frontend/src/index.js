import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import { persistor, store } from './store/store';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';

const App = lazy(() => import('./App'));
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={ <Panel header={ <ProgressSpinner />}> </Panel>}>
          <App />
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
