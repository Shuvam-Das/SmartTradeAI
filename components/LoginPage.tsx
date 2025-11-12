import React, { useState } from 'react';
import ChartIcon from './icons/ChartIcon';

interface LoginPageProps {
  onLogin: () => void;
}

type Mode = 'signin' | 'signup' | 'otp';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate API call for authentication
    setTimeout(() => {
      if (email && password) {
        onLogin();
      } else {
        setError("Invalid credentials");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      if (name && email && password) {
        setMode('otp');
      } else {
        setError("Please fill all fields");
      }
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === '123456') { // Mock OTP
        onLogin();
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };
  
  const renderForm = () => {
    switch(mode) {
        case 'signup':
            return (
                 <form className="space-y-6" onSubmit={handleSignUpSubmit}>
                    <h2 className="text-2xl font-bold text-center text-white">Create Your Account</h2>
                    <div>
                        <label htmlFor="name" className="text-sm font-bold text-slate-400 block mb-2">Full Name</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Shuvam Das" className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="email-signup" className="text-sm font-bold text-slate-400 block mb-2">Email Address</label>
                        <input type="email" id="email-signup" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="user@example.com" className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="text-sm font-bold text-slate-400 block mb-2">Password</label>
                        <input type="password" id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-wait">
                        {isLoading ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                    <p className="text-sm text-center text-slate-400">
                        Already have an account?{' '}
                        <button type="button" onClick={() => { setMode('signin'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Sign In</button>
                    </p>
                </form>
            );
        case 'otp':
            return (
                 <form className="space-y-6" onSubmit={handleOtpSubmit}>
                    <h2 className="text-2xl font-bold text-center text-white">Verify Your Email</h2>
                    <p className="text-sm text-center text-slate-400">An OTP has been sent to <span className="font-medium text-slate-200">{email}</span>. Please enter it below. (Hint: it's 123456)</p>
                    <div>
                        <label htmlFor="otp" className="text-sm font-bold text-slate-400 block mb-2">One-Time Password (OTP)</label>
                        <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="_ _ _ _ _ _" className="w-full p-3 tracking-[1em] text-center text-xl text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-wait">
                        {isLoading ? 'Verifying...' : 'Verify & Sign Up'}
                        </button>
                    </div>
                     <p className="text-sm text-center text-slate-400">
                        <button type="button" onClick={() => { setMode('signup'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Back to Sign Up</button>
                    </p>
                </form>
            );
        case 'signin':
        default:
            return (
                <form className="space-y-6" onSubmit={handleSignInSubmit}>
                    <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
                    <div>
                        <label htmlFor="email-signin" className="text-sm font-bold text-slate-400 block mb-2">Email Address</label>
                        <input type="email" id="email-signin" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="user@example.com" className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <label htmlFor="password-signin" className="text-sm font-bold text-slate-400 block mb-2">Password</label>
                        <input type="password" id="password-signin" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-indigo-400 hover:underline">Forgot Password?</a>
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-wait">
                        {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                    <p className="text-sm text-center text-slate-400">
                        Don't have an account?{' '}
                        <button type="button" onClick={() => { setMode('signup'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Create Account</button>
                    </p>
                </form>
            );
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                 <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center">
                    <ChartIcon className="w-10 h-10 mr-2" />
                    SmartTradeAI
                </h1>
            </div>
          <p className="text-slate-400">Your intelligent trading dashboard awaits</p>
        </div>
        
        {error && <p className="text-center text-sm text-red-400 bg-red-500/10 p-3 rounded-md">{error}</p>}
        
        <div className="transition-all duration-300">
            {renderForm()}
        </div>

      </div>
    </div>
  );
};

export default LoginPage;