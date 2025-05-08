import styles from './Button.module.css';
import type { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, appearence = 'small', ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(className, styles['button'], styles['accent'], {
				[styles['small']]: appearence === 'small',
				[styles['big']]: appearence === 'big',
			}
			)}
		>
			{children}
		</button>
	);
}

export default Button;
