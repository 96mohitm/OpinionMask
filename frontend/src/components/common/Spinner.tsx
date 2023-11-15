import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'text-blue-500' }) => {
  const spinnerSize = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  }[size];

  return (
    <div className={`loader ease-linear rounded-full border-t-8 border-gray-200 ${spinnerSize} ${color}`} />
  );
};

export default Spinner;
