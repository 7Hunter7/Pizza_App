import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import type { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ className, isValid = true, ...props }, ref) {
	return (
		<div className={styles['search-wrapper']}>
			<input ref={ref} className={cn(className, styles['search'], {
				[styles['invalid']]: !isValid,
			})} {...props}/>
			<svg className={styles['search-icon']}				
				xmlns="http://www.w3.org/2000/svg" 
				width="32" 
				height="32" 
				viewBox="0 0 24 24">
				<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0" color="currentColor"/>
			</svg>			
		</div>
	);
});

export default Search;
