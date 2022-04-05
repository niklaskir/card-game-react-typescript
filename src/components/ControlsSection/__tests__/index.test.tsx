import users from '../../../data.json';
import React from 'react';
import Recoil from 'recoil';
import renderer from 'react-test-renderer';
import ControlsSection from '../index';
import _ from 'lodash';
import axios from 'axios';

jest.mock('recoil', () => ({
  atom: jest.fn(),
  useRecoilState: jest.fn(),
  useRecoilValue: jest.fn(),
  useSetRecoilState: jest.fn(),
}));

jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const useState = React.useState as any;

describe('ControlsSection', () => {
  it('should render correctly when isLoading is false', () => {
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([users, jest.fn()]);
    useState.mockReturnValueOnce([false]);

    const overviewSection = renderer.create(<ControlsSection />).toJSON();

    expect(overviewSection).toMatchSnapshot();
  });

  it('should render correctly when isLoading is true', () => {
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([users, jest.fn()]);
    useState.mockReturnValueOnce([true]);

    const overviewSection = renderer.create(<ControlsSection />).toJSON();

    expect(overviewSection).toMatchSnapshot();
  });

  it('should call setUserList with correct params when clicking asc button', () => {
    const ascUsers = _.orderBy(users, ['realName'], ['asc']);
    const setUserListSpy = jest.fn();
    Recoil.useRecoilState = jest
      .fn()
      .mockReturnValueOnce([ascUsers, setUserListSpy]);
    useState.mockReturnValueOnce([false]);

    const overviewSection = renderer.create(<ControlsSection />);

    overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4',
      })[0]
      .props.onClick();

    expect(overviewSection.toJSON()).toMatchSnapshot();
    expect(setUserListSpy).toHaveBeenCalledWith(ascUsers);
  });

  it('should call setUserList with correct params when clicking desc button', () => {
    const descUsers = _.orderBy(users, ['realName'], ['desc']);
    const setUserListSpy = jest.fn();
    Recoil.useRecoilState = jest
      .fn()
      .mockReturnValueOnce([descUsers, setUserListSpy]);
    useState.mockReturnValueOnce([false]);

    const overviewSection = renderer.create(<ControlsSection />);

    overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4',
      })[1]
      .props.onClick();

    expect(overviewSection.toJSON()).toMatchSnapshot();
    expect(setUserListSpy).toHaveBeenCalledWith(descUsers);
  });

  it('should call axios.post with correct params when clicking submit button with selectedUser', async () => {
    const selectedUser = users[0];
    const setIsLoadingSpy = jest.fn();
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([users, jest.fn()]);
    Recoil.useRecoilValue = jest.fn().mockReturnValueOnce(selectedUser);
    useState.mockReturnValueOnce([false, setIsLoadingSpy]);

    const overviewSection = renderer.create(<ControlsSection />);

    await overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4',
      })[0]
      .props.onClick();

    expect(setIsLoadingSpy).toHaveBeenCalledWith(true);
    expect(axios.post).toHaveBeenCalledWith(expect.anything(), selectedUser);
    expect(setIsLoadingSpy).toHaveBeenCalledWith(false);
  });

  it('should not call axios.post when clicking submit button with selectedUser is null', async () => {
    const jsdomAlert = window.alert;
    window.alert = jest.fn();
    const setIsLoadingSpy = jest.fn();
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([users, jest.fn()]);
    Recoil.useRecoilValue = jest.fn().mockReturnValueOnce(null);
    useState.mockReturnValueOnce([false, setIsLoadingSpy]);

    const overviewSection = renderer.create(<ControlsSection />);

    await overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4',
      })[0]
      .props.onClick();

    expect(axios.post).not.toHaveBeenCalled();
    expect(setIsLoadingSpy).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();

    window.alert = jsdomAlert;
  });
});
