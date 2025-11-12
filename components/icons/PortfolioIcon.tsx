
import React from 'react';

const PortfolioIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M22 7V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2" />
    <path d="M16 3v4" />
    <path d="M2 12h20" />
    <path d="m16 16-2.5 2.5-4-4-2.5 2.5" />
  </svg>
);

export default PortfolioIcon;
