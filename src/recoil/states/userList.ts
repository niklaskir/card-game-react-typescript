import { atom } from 'recoil';
import { UserType } from '../../components/DetailsSection';

export const USER_LIST = 'userList';

const userList = atom<[] | UserType[]>({
  key: USER_LIST,
  default: [],
});

export { userList };
