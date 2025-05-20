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
				<button className={styles['button']} onClick={descrease}>
					<svg 
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="#FE724C">
						<path  d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M7 13h10v-2H7"/>
					</svg>
				</button>
				<div className={styles['count']}>{props.count}</div>
				<button className={styles['button']} onClick={increase}>
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="#FE724C">
						<path  d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/>
					</svg>
				</button>
				<button className={styles['button']} onClick={remove}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="#FE724C">
						<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
				</button>
			</div>
		</div>
  </div>
	);
};

export default CartItem;