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
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUser({username, password});
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4 p-6 border rounded shadow-md">
            <p>WELCOME BACK</p>
            <h2 className="text-2xl mb-4 font-semibold">Log into your account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="username" className="mb-1 text-sm font-medium">Email or Username</label>
                    <input 
                        id="username"
                        type="text" 
                        placeholder="Enter your email or username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
                    <label htmlFor="password" className="mb-1 text-sm font-medium">Forgot Password?</label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Login now
                    </button>
                </div>
            </form>
            <div className="mt-4 text-center">
                <span className="text-gray-600">Not registered yet?</span>
                {/* TODO: add the arrow icon. */}
                <Link to="/register" className="ml-2 text-blue-500 hover:text-blue-600">Register {'->'}</Link> 
            </div>
        </div>
    );
    // return (
    //     <div className="bg-[#131319] flex flex-row justify-center w-full">
    //     <div className="bg-[#131319] w-[1440px] h-[900px] relative">
    //       <div className="absolute w-[469px] h-[420px] top-[284px] left-[488px]">
    //         <div className="relative w-[467px] h-[424px] top-[-2px] left-[-2px] bg-[#27292d] rounded-[8px]">
    //           <div className="absolute top-[42px] left-[175px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#6b6c70] text-[14px] tracking-[0.42px] leading-[normal]">
    //             WELCOME BACK
    //           </div>
    //           <div className="absolute top-[67px] left-[139px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[18px] tracking-[0] leading-[normal]">
    //             Log into your account
    //           </div>
    //           <div className="absolute w-[417px] h-[70px] top-[134px] left-[26px]">
    //             <label
    //               className="top-0 left-0 text-[14px] absolute [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] tracking-[0] leading-[normal]"
    //               htmlFor="input-1"
    //             >
    //               Email or Username
    //             </label>
    //             <div className="top-[27px] absolute w-[417px] h-[43px] left-0">
    //               <div className="relative w-[418px] h-[46px] top-[-2px] left-[-2px] rounded-[4px]">
    //                 <input
    //                   className="absolute top-[14px] left-[14px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap [background:transparent] border-[none] p-0"
    //                   id="input-1"
    //                   placeholder="Enter your email or username"
    //                   type="email"
    //                 />
    //                 <div className="absolute w-[418px] h-[46px] top-0 left-0 rounded-[4px] border-[1.5px] border-solid border-[#35373b]" />
    //               </div>
    //             </div>
    //           </div>
    //           <div className="absolute w-[419px] h-[70px] top-[220px] left-[26px]">
    //             <div className="top-0 left-0 text-[14px] absolute [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] tracking-[0] leading-[normal]">
    //               Password
    //             </div>
    //             <div className="top-[2px] left-[312px] text-[12px] text-right absolute [font-family:'Inter-Medium',Helvetica] font-medium text-[#c5c7ca] tracking-[0] leading-[normal]">
    //               Forgot password?
    //             </div>
    //             <div className="absolute w-[417px] h-[43px] top-[27px] left-0">
    //               <div className="top-0 absolute w-[417px] h-[43px] left-0">
    //                 <div className="relative w-[418px] h-[46px] top-[-2px] left-[-2px] rounded-[4px]">
    //                   <div className="absolute top-[14px] left-[14px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#7f8084] text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
    //                     Enter your password
    //                   </div>
    //                   <div className="absolute w-[418px] h-[46px] top-0 left-0 rounded-[4px] border-[1.5px] border-solid border-[#35373b]" />
    //                 </div>
    //               </div>
    //               <img className="absolute w-[20px] h-[20px] top-[12px] left-[385px]" alt="Eye" src="eye.svg" />
    //             </div>
    //           </div>
    //           <div className="absolute w-[417px] h-[43px] top-[310px] left-[26px]">
    //             <div className="relative w-[415px] h-[43px] bg-[#4a96ff] rounded-[4px]">
    //               <div className="absolute top-[12px] left-[168px] [font-family:'Inter-Medium',Helvetica] font-medium text-white text-[16px] tracking-[0] leading-[normal] whitespace-nowrap">
    //                 Login now
    //               </div>
    //             </div>
    //           </div>
    //           <p className="absolute top-[365px] left-[26px] [font-family:'Inter-Medium',Helvetica] font-medium text-transparent text-[14px] tracking-[0] leading-[normal]">
    //             <span className="text-[#7f8084]">Not registered yet? </span>
    //             <span className="text-[#c5c7ca]">Register →</span>
    //           </p>
    //         </div>
    //       </div>
    //       <div className="absolute w-[40px] h-[40px] top-[195px] left-[699px]">
    //         <img className="absolute w-[33px] h-[34px] top-[4px] left-[4px]" alt="Shape" src="shape.svg" />
    //       </div>
    //     </div>
    //   </div>
    
    // )
};

export default Login;
