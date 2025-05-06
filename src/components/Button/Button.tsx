import styles from './Button.module.scss';
import type { ButtonProps } from './Button.props';
import cn from 'classnames';

function Button({ children, className, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			className={cn(className, styles['button'], styles['accent'])}
		>
			{children}
		</button>
	);
}

export default Button;
