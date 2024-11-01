import React from 'react';

interface StatusDotProps {
  getColor: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ getColor }) => {
  const colorMap: Record<string, string> = {
    Online: 'green',
    Offline: 'red',
    'Typing...': 'blue',
  };

  const color = colorMap[getColor] || 'gray';

  return (
    <span
      className="inline-block w-2 h-2 rounded-full mr-2"
      style={{ backgroundColor: color }}
    ></span>
  );
};

export default StatusDot;
