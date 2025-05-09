import { forwardRef } from 'react';
import styles from './Search.module.css';
import cn from 'classnames';
import type { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({ className, isValid = true, ...props }, ref) {
	return (
		<input ref={ref} className={cn(className, styles['search'], {
			[styles['invalid']]: !isValid,
		})} {...props}/>
	);
});

export default Search;
