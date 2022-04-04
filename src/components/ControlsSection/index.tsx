import _ from 'lodash';
import axios from 'axios';
import React, { useState } from 'react';
import { userSelected } from '../../recoil/states/userSelected';
import { userList as userListState } from '../../recoil/states/userList';
import { useRecoilState, useRecoilValue } from 'recoil';

const ControlsSection = () => {
  const [userList, setUserList] = useRecoilState(userListState);
  const selectedUser = useRecoilValue(userSelected);
  const [isLoading, setIsLoading] = useState(false);

  const handleAsc = () => {
    setUserList(_.orderBy(userList, ['realName'], ['asc']));
  };

  const handleDesc = () => {
    setUserList(_.orderBy(userList, ['realName'], ['desc']));
  };

  const handleSubmit = async () => {
    if (selectedUser === null) {
      alert('Please select user');
      return;
    }

    setIsLoading(true);
    await axios.post('https://reqres.in/api/users', selectedUser);
    setIsLoading(false);
  };

  return (
    <div className="col-span-1">
      <div className="rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-slate-100">
          <div className="font-bold text-xl mb-2">Controls</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                onClick={handleAsc}
              >
                SORT ASC
              </button>
            </div>
            <div className="col-span-1">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                onClick={handleDesc}
              >
                SORT DESC
              </button>
            </div>
            <div className="col-span-2">
              {isLoading ? (
                <button
                  disabled
                  className="button w-full bg-slate-500 text-white font-bold py-2 px-4 cursor-not-allowed"
                >
                  Loading...
                </button>
              ) : (
                <button
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsSection;
