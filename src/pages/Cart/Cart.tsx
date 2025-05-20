import { useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import styles from './Cart.module.css';
import type { RootStore } from '../../store/store';

export function Cart() {
  const items = useSelector((s: RootStore) => s.cart.items);

	return (
    <div className={styles.cart}>
      <Headling>Корзина</Headling>
    </div>
	);
};