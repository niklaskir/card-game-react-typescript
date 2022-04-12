import _ from 'lodash';
import users from '../../data.json';
import { atom, selector } from 'recoil';

export type UserType = {
  asset: string;
  realName: string;
  playerName: string;
};

export const USER_LIST = 'userList';
export const USER_SELECTED = 'userSelected';
export const SORT_USER_TYPE = 'sortUserType';
export const SORTED_USER_LIST = 'sortedUserList';

const userList = atom<[] | UserType[]>({
  key: USER_LIST,
  default: users,
});

const userListSortType = atom({
  key: SORT_USER_TYPE,
  default: '',
});

const sortedUserList = selector({
  key: SORTED_USER_LIST,
  get: ({ get }) => {
    const sort = get(userListSortType);
    const list = get(userList);

    switch (sort) {
      case 'Asc':
        return _.orderBy(list, ['realName'], ['asc']);
      case 'Desc':
        return _.orderBy(list, ['realName'], ['desc']);
      default:
        return list;
    }
  },
});

const userSelected = atom<null | UserType>({
  key: USER_SELECTED,
  default: null,
});

export { sortedUserList, userListSortType, userSelected };
