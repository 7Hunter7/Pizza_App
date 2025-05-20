import { useSelector, useDispatch } from 'react-redux';
import styles from './CartItem.module.css';
import type { AppDispath, RootStore } from '../../store/store';
import type { CartItemProps } from './CartItem.props';
import { cartActions } from '../../store/cart.slice';

function CartItem(props : CartItemProps)  {
  const dispatch = useDispatch<AppDispath>();
  const items = useSelector((s: RootStore) => s.cart.items);

  // Увеличить количество товара в карзине
	const increase = () => {
		dispatch(cartActions.add(props.id));
	};
	// Уменьшить количество товара в карзине
	const descrease = () => {

	};

	// Удаление товара из карзины
	const remove = () => {

	};

	return (
    <div className={styles.item}>
			<div className={styles.image} style={{backgroundImage: `url('${props.image}')`}}>
      <div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.price}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles.actions}>
				<button className={styles['button']} onClick={descrease}></button>
				<div className={styles['count']}>{props.count}</div>
				<button className={styles['button']} onClick={increase}></button>
				<button className={styles['remove']} onClick={remove}></button>
				</div>
		  </div>
    </div>
	);
};

export default CartItem;