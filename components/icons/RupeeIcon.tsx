import React from 'react';

const RupeeIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M18 5H7h3a4 4 0 0 1 0 8H7l6 6" />
    <path d="M7 9h11" />
  </svg>
);

export default RupeeIcon;
