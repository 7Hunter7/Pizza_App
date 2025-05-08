import { forwardRef } from 'react';
import styles from './Input.module.scss';
import cn from 'classnames';

const Input = forwardRef<HTMLInputElement>(function Input({ className, isValid = true, ...props }, ref) {
	return (
		<input ref={ref} className={cn(className, styles['input'], {
			[styles['invalid']]: !isValid,
		})} {...props}/> // Передаем остальные свойства
	);
});

export default Input;
