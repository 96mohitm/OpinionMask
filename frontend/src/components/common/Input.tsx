import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ id, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <>
        <input
          id={id}
          type={showPassword ? 'text' : type}
          placeholder={`Enter your ${placeholder.toLowerCase()}`}
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-[#27292D] rounded-[4px] border-[1.5px] border-solid border-[#35373B] px-3 py-3 text-[#7F8084] text-base font-normal font-sans placeholder:text-[#7F8084] focus:outline-none focus:ring-2 focus:ring-[#969696] focus:border-transparent"
        />
        {type === 'password' && (
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiFillEyeInvisible color="#7F8084" size={20} />
            ) : (
              <AiFillEye color="#7F8084" size={20} />
            )}
          </div>
        )}
      </>
  );
};

export default Input;
