import React, { useEffect, useState } from 'react';
import { loginUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth';
import Input from '../common/Input';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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
    loginUser({ username, password })
      .then(() => {
        console.info("logged in successfully!");
      })
      .catch((error)=> {
        console.error('Error while logging in.');
      })
  };

  return (
    <div className="flex flex-col items-center pt-20 h-screen bg-primary relative">
      <div className="flex flex-col items-center justify-center gap-12">
        <img src='icons/Logo.svg' alt="logo" />
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
            <Input
              id="username"
              type="text"
              placeholder="email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="mb-1 text-sm font-medium text-[#c5c7ca]">
                Password
              </label>
              <Link to="/login" className="text-[#c5c7ca] hover:text-blue-600 text-sm">
                Forgot Password?
              </Link>
            </div>
            <div className="flex justify-between items-center mb-2 relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

        <div className="mt-4 text-[#7f8084]">
          <span>Not registered yet?</span>
          <Link to="/register" className="ml-2 text-[#C5C7CA] hover:text-blue-600">
            Register →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
