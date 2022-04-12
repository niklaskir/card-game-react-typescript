import React from 'react';
import renderer from 'react-test-renderer';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  sortedUserList as sortedUserListState,
  userListSortType as userListSortTypeState,
} from '../userList';

const DefaultUserList = () => {
  const sortedUserList = useRecoilValue(sortedUserListState);

  return (
    <>
      {sortedUserList.map((user, index) => (
        <p key={index}>{user.realName}</p>
      ))}
    </>
  );
};

const AscUserList = () => {
  const sortedUserList = useRecoilValue(sortedUserListState);
  const setUserSort = useSetRecoilState(userListSortTypeState);
  setUserSort('Asc');

  return (
    <>
      {sortedUserList.map((user, index) => (
        <p key={index}>{user.realName}</p>
      ))}
    </>
  );
};

const DescUserList = () => {
  const sortedUserList = useRecoilValue(sortedUserListState);
  const setUserSort = useSetRecoilState(userListSortTypeState);
  setUserSort('Desc');

  return (
    <>
      {sortedUserList.map((user, index) => (
        <p key={index}>{user.realName}</p>
      ))}
    </>
  );
};

describe('userList', () => {
  it('should render default user list', () => {
    const defaultUserList = renderer
      .create(
        <RecoilRoot>
          <DefaultUserList />
        </RecoilRoot>,
      )
      .toJSON();

    expect(defaultUserList).toMatchSnapshot();
  });

  it('should render asc user list', () => {
    const ascUserList = renderer.create(
      <RecoilRoot>
        <AscUserList />
      </RecoilRoot>,
    );

    expect(ascUserList).toMatchSnapshot();
  });

  it('should render desc user list', () => {
    const descUserList = renderer
      .create(
        <RecoilRoot>
          <DescUserList />
        </RecoilRoot>,
      )
      .toJSON();

    expect(descUserList).toMatchSnapshot();
  });
});
