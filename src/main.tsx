import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import 'nprogress/nprogress.css';
import './styles/components/fancyroute.css';
import React, { Suspense } from 'react';
import LoadingSpinner from './components/loading-spinner';
import { BrowserRouter as Router } from 'react-router-dom';

const Lazyapp = React.lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Suspense fallback={<LoadingSpinner />}>
      <Lazyapp />
    </Suspense>
  </>,
);
