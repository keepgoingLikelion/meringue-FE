import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="https://keepgoinglikelion.github.io/meringue-FE/">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
