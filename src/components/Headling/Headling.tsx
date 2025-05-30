import type { HeadlingProps } from './Headling.props';
import styles from './Headling.module.css';
import cn from 'classnames';

function Headling({children, className, ...props}: HeadlingProps) {
	return (
		<h1  className={cn(className, styles['header'])} {...props}>
			{ children }
		</h1>
	);
};

export default Headling;
