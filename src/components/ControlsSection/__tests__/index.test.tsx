import users from '../../../data.json';
import React from 'react';
import Recoil from 'recoil';
import renderer from 'react-test-renderer';
import ControlsSection from '../index';
import axios from 'axios';

jest.mock('recoil', () => ({
  atom: jest.fn(),
  selector: jest.fn(),
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

describe('ControlsSection', () => {
  it('should render correctly when isLoading is false', () => {
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([false, jest.fn()]);

    const overviewSection = renderer.create(<ControlsSection />).toJSON();

    expect(overviewSection).toMatchSnapshot();
  });

  it('should render correctly when isLoading is true', () => {
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([true, jest.fn()]);

    const overviewSection = renderer.create(<ControlsSection />).toJSON();

    expect(overviewSection).toMatchSnapshot();
  });

  it('should call setUserSort with correct params when clicking asc button', () => {
    const setUserSortSpy = jest.fn();
    Recoil.useSetRecoilState = jest.fn().mockReturnValueOnce(setUserSortSpy);
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([false, jest.fn()]);

    const overviewSection = renderer.create(<ControlsSection />);

    overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4',
      })[0]
      .props.onClick();

    expect(overviewSection.toJSON()).toMatchSnapshot();
    expect(setUserSortSpy).toHaveBeenCalledWith('Asc');
  });

  it('should call setUserSort with correct params when clicking desc button', () => {
    const setUserSortSpy = jest.fn();
    Recoil.useSetRecoilState = jest.fn().mockReturnValueOnce(setUserSortSpy);
    Recoil.useRecoilState = jest.fn().mockReturnValueOnce([false, jest.fn()]);

    const overviewSection = renderer.create(<ControlsSection />);

    overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4',
      })[1]
      .props.onClick();

    expect(overviewSection.toJSON()).toMatchSnapshot();
    expect(setUserSortSpy).toHaveBeenCalledWith('Desc');
  });

  it('should call axios.post with correct params when clicking submit button with selectedUser', async () => {
    const selectedUser = users[0];
    const setIsLoadingSpy = jest.fn();
    Recoil.useRecoilState = jest
      .fn()
      .mockReturnValueOnce([false, setIsLoadingSpy]);
    Recoil.useRecoilValue = jest.fn().mockReturnValueOnce(selectedUser);

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
    const selectedUser = null;
    const setIsLoadingSpy = jest.fn();
    Recoil.useRecoilState = jest
      .fn()
      .mockReturnValueOnce([false, setIsLoadingSpy]);
    Recoil.useRecoilValue = jest.fn().mockReturnValueOnce(selectedUser);

    const overviewSection = renderer.create(<ControlsSection />);

    await overviewSection.root
      .findAllByProps({
        className:
          'w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4',
      })[0]
      .props.onClick();

    expect(setIsLoadingSpy).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();

    window.alert = jsdomAlert;
  });
});
