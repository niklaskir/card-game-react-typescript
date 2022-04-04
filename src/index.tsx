import App from './App';
import React from 'react';

import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';

import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
