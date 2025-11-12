
import React from 'react';

const AIIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 8V4H8" />
    <rect x="4" y="12" width="16" height="8" rx="2" />
    <path d="M12 12v-2" />
    <path d="M16 12v-2" />
    <path d="M8 12v-2" />
    <path d="m12 12-4-4" />
    <path d="m16 8-4 4" />
  </svg>
);

export default AIIcon;
