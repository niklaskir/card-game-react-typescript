import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  sortedUserList as sortedUserListState,
  userSelected as userSelectedState,
  UserType,
} from '../../recoil/states/userList';

const OverviewSection = () => {
  const sortedUserList = useRecoilValue(sortedUserListState);
  const setUserSelected = useSetRecoilState(userSelectedState);

  const handleSelect = (key: number) => {
    setUserSelected(sortedUserList[key]);
  };

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="font-bold text-xl mb-2">Overview</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {sortedUserList.map((user: UserType, key: number) => (
          <div
            key={key}
            className="col-span-1 cursor-pointer"
            onClick={() => handleSelect(key)}
          >
            <div className="rounded overflow-hidden shadow-lg bg-slate-100 hover:bg-teal-100">
              <div className="px-6 py-4">
                <ul className="list-disc">
                  <li className="text-gray-700 text-base">{user.realName}</li>
                  <li className="text-gray-700 text-base">{user.playerName}</li>
                  <li className="text-gray-700 text-base">{user.asset}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewSection;
