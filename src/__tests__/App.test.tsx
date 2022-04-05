import App from '../App';
import React from 'react';
import renderer from 'react-test-renderer';
import { RecoilRoot } from 'recoil';

jest.mock('../components/Container');
jest.mock('../components/ControlsSection');
jest.mock('../components/DetailsSection');
jest.mock('../components/OverviewSection');

describe('App', function () {
  it('should render correctly', () => {
    const app = renderer
      .create(
        <RecoilRoot>
          <App />
        </RecoilRoot>,
      )
      .toJSON();

    expect(app).toMatchSnapshot();
  });
});
