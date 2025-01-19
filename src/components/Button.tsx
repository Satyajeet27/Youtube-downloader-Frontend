import React from "react";

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => (
    <button
        onClick={onClick}
        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
        {text}
    </button>
);

export default Button;
