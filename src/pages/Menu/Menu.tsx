import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

export function Menu() {
	return (
		<>
      <div>
				<Link to='/'>Меню</Link>
				<Link to='/cart'>Корзина</Link>
			</div>
      Menu
    </>
	);
};