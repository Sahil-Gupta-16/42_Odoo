import React from 'react';

export default function RollingText({ text }: { text: string }) {
  return <div className="rolling">{text}</div>;
}
