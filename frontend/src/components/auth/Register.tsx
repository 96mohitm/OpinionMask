import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import { useAuth } from '../../Auth';
import Input from '../common/Input';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // if already logged in then redirect to candidates page.
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await registerUser({
        username: username,
        email: email,
        password: password,
        avatar: avatar
      });
      
      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 h-screen bg-primary relative">
      <div className="flex flex-col items-center justify-center gap-12">
        <img src='icons/Logo.svg' alt="logo" />
      </div>
      <div className="w-full max-w-md mx-auto mt-4 p-6 border rounded shadow-md bg-[#27292D] border-[#969696] border-[2px] rounded-[8px]">
        <p className='text-[#6B6C70] text-center'>SIGN UP</p>
        <h2 className="text-[18px] mb-4 font-semibold text-white text-center">Create an account to continue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 text-sm font-medium text-[#c5c7ca]">Email</label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="mb-1 text-sm font-medium text-[#c5c7ca]">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a preferred username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-between mb-2 relative">
            <div className='mb-1'>
              <label htmlFor="password" className="mb-1 text-sm font-medium text-[#c5c7ca]">Password</label>
            </div>
            <div className='flex justify-between items-center mb-2 relative'>
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
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Continue
            </button>
          </div>
        </form>

        <div className="mt-2 text-sm text-[#7f8084]">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/login" className="ml-2 hover:text-blue-600">Login →</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
