import React, { useEffect } from 'react';
import users from '../../data.json';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userList as userListState } from '../../recoil/states/userList';
import { userSelected as userSelectedState } from '../../recoil/states/userSelected';

const OverviewSection = () => {
  const [userList, setUserList] = useRecoilState(userListState);
  const setUserSelected = useSetRecoilState(userSelectedState);

  const handleSelect = (key: number) => {
    setUserSelected(userList[key]);
  };

  useEffect(() => {
    setUserList(users);
  }, []);

  return (
    <div className="col-span-2">
      <div className="font-bold text-xl mb-2">Overview</div>
      <div className="grid grid-cols-3 gap-4">
        {userList.map((user: any, key: number) => (
          <div
            key={key}
            className="col-span-1 bg-slate-100 hover:bg-teal-100 cursor-pointer"
            onClick={() => handleSelect(key)}
          >
            <div className="rounded overflow-hidden shadow-lg">
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
