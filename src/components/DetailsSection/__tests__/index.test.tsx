import React from 'react';
import Recoil from 'recoil';
import renderer from 'react-test-renderer';
import DetailsSection from '../index';

jest.mock('recoil', () => ({
  atom: jest.fn(),
  selector: jest.fn(),
  useRecoilValue: jest.fn(),
}));

describe('DetailsSection', function () {
  it('should render correctly with selectedUser', () => {
    Recoil.useRecoilValue = jest.fn().mockReturnValueOnce({
      realName: 'Sample real name',
      playerName: 'Sample player name',
      asset: 'Sample asset',
    });

    const detailsSection = renderer.create(<DetailsSection />).toJSON();

    expect(detailsSection).toMatchSnapshot();
  });

  it('should render correctly when selectedUser is null', () => {
    const detailsSection = renderer.create(<DetailsSection />).toJSON();

    expect(detailsSection).toMatchSnapshot();
  });
});
