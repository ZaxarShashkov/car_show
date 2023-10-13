'use client';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

type CustomButtonProps = {
	title: string;
	containerStyles?: string;
	handleClick?: MouseEventHandler<HTMLButtonElement>;
	btnType?: 'button' | 'submit';
};

const CustomButton = ({ title, containerStyles, handleClick, btnType }: CustomButtonProps) => {
	return (
		<button
			disabled={false}
			type={btnType || 'button'}
			className={`custom-btn ${containerStyles}`}
			onClick={handleClick}>
			<span className={`flex-1`}>{title}</span>
		</button>
	);
};

export default CustomButton;
