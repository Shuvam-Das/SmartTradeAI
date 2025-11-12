import React, { useState } from 'react';

interface CookieBannerProps {
    onAccept: () => void;
    onDecline: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept, onDecline }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleAccept = () => {
        onAccept();
        setVisible(false);
    };

    const handleDecline = () => {
        onDecline();
        setVisible(false);
    }

    return (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="p-4 rounded-lg bg-slate-800/80 backdrop-blur-sm shadow-lg border border-slate-700 sm:flex sm:items-center sm:justify-between">
                    <div className="w-0 flex-1 sm:flex sm:items-center">
                        <p className="font-medium text-white">
                           🍪 This website uses cookies
                        </p>
                        <p className="mt-1 sm:mt-0 sm:ml-4 text-sm text-slate-300">
                           We use cookies to ensure you get the best experience on our website.
                           <a href="#" className="ml-1 underline hover:text-indigo-400">Learn more</a>.
                        </p>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-6">
                        <button 
                            onClick={handleDecline}
                            className="mr-2 px-4 py-2 text-sm font-semibold rounded-md text-slate-300 hover:bg-slate-700 transition-colors">
                            Decline
                        </button>
                        <button
                          onClick={handleAccept}
                          className="px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors"
                        >
                          Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;