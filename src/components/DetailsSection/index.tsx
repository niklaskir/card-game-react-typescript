import React from 'react';
import { useRecoilValue } from 'recoil';
import { userSelected as userSelectedState } from '../../recoil/states/userList';

const OverviewSection = () => {
  const selectedUser = useRecoilValue(userSelectedState);

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="rounded overflow-hidden shadow-lg bg-slate-100">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Details</div>
          {selectedUser ? (
            <ul className="list-disc px-6">
              <li className="text-gray-700 text-xl">{selectedUser.realName}</li>
              <li className="text-gray-700 text-xl">
                {selectedUser.playerName}
              </li>
              <li className="text-gray-700 text-xl">{selectedUser.asset}</li>
            </ul>
          ) : (
            <div className="text-xl mb-2">Please select user...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
