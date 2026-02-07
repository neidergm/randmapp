import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
}) => {
    const baseStyles = 'px-4 py-2 rounded font-medium transition-colors';
    
    const variantStyles = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100',
        danger: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-400',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};