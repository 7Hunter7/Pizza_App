import { Link } from 'react-router-dom';
import styles from './Error.module.css';

export function Error() {
	return (
    <>
      <div>
        <Link to='/'>Меню</Link>
        <Link to='/cart'>Корзина</Link>
      </div>
      Error
    </>
	);
};