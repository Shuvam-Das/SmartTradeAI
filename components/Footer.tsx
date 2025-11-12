import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex-shrink-0 text-center px-6 py-3 bg-slate-800/70 border-t border-slate-700 text-xs text-slate-500">
      <div className="flex justify-between items-center">
        <span>© 2025 Shuvam Das – All Rights Reserved.</span>
        <div>
          <a href="#" className="hover:text-slate-300 transition-colors mx-2">Privacy Policy</a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-slate-300 transition-colors mx-2">Terms of Service</a>
           <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-slate-300 transition-colors mx-2">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;