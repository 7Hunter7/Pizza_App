import { Link } from 'react-router-dom';
import styles from './Cart.module.css';

export function Cart() {
	return (
    <>
    <div>
      <Link to='/'>Меню</Link>
      <Link to='/cart'>Корзина</Link>
    </div>
    Cart
  </>
	);
};