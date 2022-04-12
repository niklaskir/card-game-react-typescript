import { atom } from 'recoil';

export const IS_LOADING = 'isLoading';

const isLoading = atom<boolean>({
  key: IS_LOADING,
  default: false,
});

export { isLoading };
