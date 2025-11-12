import React, { useState } from 'react';
import ChartIcon from './icons/ChartIcon';

interface LoginPageProps {
  onLogin: () => void;
}

type Mode = 'signin_email' | 'signin_otp' | 'signup_details' | 'signup_otp';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<Mode>('signin_email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
        switch(mode) {
            case 'signin_email':
                // In a real app, you'd call an API to send the OTP
                if (email) {
                    setMode('signin_otp');
                } else {
                    setError("Please enter your email address.");
                }
                break;

            case 'signin_otp':
                if (otp === '123456') { // Mock OTP
                    onLogin();
                } else {
                    setError('Invalid OTP. Please try again.');
                }
                break;
            
            case 'signup_details':
                if (name && email && password) {
                    // In a real app, you'd call an API to pre-register and send OTP
                    setMode('signup_otp');
                } else {
                    setError("Please fill all fields.");
                }
                break;
            
            case 'signup_otp':
                if (otp === '123456') { // Mock OTP
                    onLogin();
                } else {
                    setError('Invalid OTP. Please try again.');
                }
                break;
        }
      setIsLoading(false);
    }, 1500);
  };
  
  const renderForm = () => {
    switch(mode) {
        case 'signup_details':
            return (
                 <form className="space-y-6" onSubmit={handleSubmit}>
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
                        {isLoading ? 'Proceeding...' : 'Continue'}
                        </button>
                    </div>
                    <p className="text-sm text-center text-slate-400">
                        Already have an account?{' '}
                        <button type="button" onClick={() => { setMode('signin_email'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Sign In</button>
                    </p>
                </form>
            );
        case 'signup_otp':
             return (
                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center text-white">Verify Your Email</h2>
                    <p className="text-sm text-center text-slate-400">An OTP has been sent to <span className="font-medium text-slate-200">{email}</span> to complete your registration.</p>
                    <div className="text-center text-xs text-amber-400 bg-amber-500/10 p-2 rounded-md">
                        This is a demo. Use OTP: <span className="font-bold tracking-wider">123456</span>
                    </div>
                    <div>
                        <label htmlFor="otp" className="text-sm font-bold text-slate-400 block mb-2">One-Time Password (OTP)</label>
                        <input type="text" id="otp" value={otp} onChange={handleOtpChange} maxLength={6} required placeholder="_ _ _ _ _ _" className="w-full p-3 tracking-[1em] text-center text-xl text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-wait">
                        {isLoading ? 'Verifying...' : 'Create Account & Sign In'}
                        </button>
                    </div>
                     <p className="text-sm text-center text-slate-400">
                        <button type="button" onClick={() => { setMode('signup_details'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Back to Details</button>
                    </p>
                </form>
            );
        case 'signin_otp':
             return (
                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center text-white">Enter Security Code</h2>
                    <p className="text-sm text-center text-slate-400">An OTP has been sent to <span className="font-medium text-slate-200">{email}</span> to sign you in.</p>
                     <div className="text-center text-xs text-amber-400 bg-amber-500/10 p-2 rounded-md">
                        This is a demo. Use OTP: <span className="font-bold tracking-wider">123456</span>
                    </div>
                    <div>
                        <label htmlFor="otp" className="text-sm font-bold text-slate-400 block mb-2">One-Time Password (OTP)</label>
                        <input type="text" id="otp" value={otp} onChange={handleOtpChange} maxLength={6} required placeholder="_ _ _ _ _ _" className="w-full p-3 tracking-[1em] text-center text-xl text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-wait">
                        {isLoading ? 'Verifying...' : 'Sign In'}
                        </button>
                    </div>
                     <p className="text-sm text-center text-slate-400">
                        <button type="button" onClick={() => { setMode('signin_email'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Use a different email</button>
                    </p>
                </form>
            );
        case 'signin_email':
        default:
            return (
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center text-white">Sign In to Your Account</h2>
                    <div>
                        <label htmlFor="email-signin" className="text-sm font-bold text-slate-400 block mb-2">Email Address</label>
                        <input type="email" id="email-signin" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="user@example.com" className="w-full p-3 text-slate-300 bg-slate-900 border border-slate-700 rounded-md focus:outline-none transition" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-wait">
                        {isLoading ? 'Sending OTP...' : 'Continue with Email'}
                        </button>
                    </div>
                    <p className="text-sm text-center text-slate-400">
                        Don't have an account?{' '}
                        <button type="button" onClick={() => { setMode('signup_details'); setError(''); }} className="font-medium text-indigo-400 hover:underline">Create one</button>
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