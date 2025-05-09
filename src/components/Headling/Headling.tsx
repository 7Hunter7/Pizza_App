import { forwardRef } from 'react';
import styles from './Headling.module.css';

const Headling = forwardRef<HTMLElement>({className, ...props}, ref) {
	return (
		<input ref={ref} className={className, styles['header']} {...props}/>
	);
});

export default Headling;
