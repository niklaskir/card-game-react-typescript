import React, { FC, ReactNode } from 'react';

const Container: FC<ReactNode> = ({ children }) => (
  <div className="container mx-auto py-10">
    <div className="grid grid-cols-3 gap-4">{children}</div>
  </div>
);

export default Container;
