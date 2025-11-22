import React from 'react';

export default function InfiniteScroll({ children }: { children: React.ReactNode }) {
  return <div className="infinite">{children}</div>;
}
