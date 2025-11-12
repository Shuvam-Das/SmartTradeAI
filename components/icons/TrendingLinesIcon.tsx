
import React from 'react';

const TrendingLinesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v10a4 4 0 0 0 4 4h10" />
    <path d="M3 13a4 4 0 0 1 4-4h10v10" />
    <path d="m21 8-6 6" />
    <path d="m21 19-6-6" />
  </svg>
);

export default TrendingLinesIcon;