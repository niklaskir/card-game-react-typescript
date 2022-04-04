import { atom } from 'recoil';
import { UserType } from '../../components/DetailsSection';

export const USER_SELECTED = 'userSelected';

const userSelected = atom<null | UserType>({
  key: USER_SELECTED,
  default: null,
});

export { userSelected };
