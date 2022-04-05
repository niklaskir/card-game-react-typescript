import App from '../App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

jest.mock('react-dom/client');

describe('index', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);

    const root = {
      render: jest.fn(),
    };
    ReactDOM.createRoot = jest.fn().mockReturnValueOnce(root);

    require('../index.tsx');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(
      document.getElementById('root'),
    );

    expect(root.render).toHaveBeenCalledWith(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );
  });
});
