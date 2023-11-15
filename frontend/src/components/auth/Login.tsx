import React, { useEffect, useState } from 'react';
import { loginUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // if already logged in then redirect to candidates page.
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    console.log('use: ', username);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser({ username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary relative">
      <div className="flex flex-col items-center justify-center gap-12">
        <img src='icons/Logo.svg' alt="logo" className="" />
      </div>
      <div className="bg-[#27292D] w-[469px] h-[420px] relative p-6 shadow-md border-[#969696] border-[2px] rounded-[8px] top-10">
        <div className="mb-4">
          <p className="text-[#6b6c70] text-sm font-medium text-center">WELCOME BACK</p>
          <h2 className="text-white text-[18px] mb-8 font-semibold text-center">Log into your account</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-sm font-medium text-[#c5c7ca]">
              Email or Username
            </label>
            <input
              autoFocus
              id="username"
              type="text"
              placeholder="Enter your email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 bg-[#27292D] rounded-[4px] border-[1.5px] border-solid border-[#35373B] px-3 py-3 text-[#7F8084] text-base font-normal font-sans placeholder:text-[#7F8084] focus:outline-none focus:ring-2 focus:ring-[#969696] focus:border-transparent"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-[#c5c7ca]">
                Password
              </label>
              <Link to="/login" className="text-[#c5c7ca] hover:text-blue-600 text-sm">
                Forgot Password?
              </Link>
            </div>
            <div className="flex justify-between items-center mb-2">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-full bg-[#27292D] rounded-[4px] border-[1.5px] border-solid border-[#35373B] px-3 py-3 text-[#7F8084] text-base font-normal font-sans placeholder:text-[#7F8084] focus:outline-none focus:ring-2 focus:ring-[#969696] focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login now
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-[#7f8084]">
          <span>Not registered yet?</span>
          <Link to="/register" className="ml-2 text-blue-500 hover:text-blue-600">
            Register →
          </Link>
        </div>
      </div>
    </div>
  );


};

export default Login;
