import users from '../../../data.json';
import React from 'react';
import Recoil from 'recoil';
import renderer from 'react-test-renderer';
import OverviewSection from '../index';

jest.mock('recoil', () => ({
  atom: jest.fn(),
  selector: jest.fn(),
  useRecoilValue: jest.fn(),
  useSetRecoilState: jest.fn(),
}));

describe('OverviewSection', () => {
  beforeEach(() => {
    Recoil.useRecoilValue = jest.fn().mockReturnValueOnce(users);
  });

  it('should render correctly', () => {
    const overviewSection = renderer.create(<OverviewSection />).toJSON();

    expect(overviewSection).toMatchSnapshot();
  });

  it('should call setUserSelected with correct params', () => {
    const setUserSelectedSpy = jest.fn();

    Recoil.useSetRecoilState = jest
      .fn()
      .mockReturnValueOnce(setUserSelectedSpy);

    const overviewSection = renderer.create(<OverviewSection />);

    overviewSection.root
      .findAllByProps({
        className: 'col-span-1 cursor-pointer',
      })[0]
      .props.onClick();

    expect(setUserSelectedSpy).toHaveBeenCalledWith(users[0]);
  });
});
