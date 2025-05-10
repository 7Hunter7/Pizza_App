import type { ProductCardProps } from './ProductCard.props';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';

function ProductCard(props : ProductCardProps) {
	return ( <Link to={`/product/${props.id}`} className={styles.link}>
		<div className={styles.card}>
			<div className={styles.head} style={{backgroundImage: `url('${props.image}')`}}>
				<div className={styles.price}>{props.price}&nbsp;
					<span className={styles.currency}>₽</span>
				</div>
				<button className={styles['add-to-card']}>
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="32" 
						height="32" 
						viewBox="0 0 24 24"
						fill="#fff">
						<path  fill-rule="evenodd" d="M5.574 4.691c-.833.692-1.053 1.862-1.492 4.203l-.75 4c-.617 3.292-.925 4.938-.026 6.022C4.206 20 5.88 20 9.23 20h5.54c3.35 0 5.024 0 5.924-1.084s.59-2.73-.026-6.022l-.75-4c-.44-2.34-.659-3.511-1.492-4.203C17.593 4 16.402 4 14.02 4H9.98c-2.382 0-3.573 0-4.406.691m4.304 3.06a2.251 2.251 0 0 0 4.245 0a.75.75 0 0 1 1.414.499a3.751 3.751 0 0 1-7.073 0a.75.75 0 1 1 1.414-.5" clip-rule="evenodd"/>
					</svg>
				</button>
				<div className={styles.rating}>{props.rating}&nbsp;
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="32" 
						height="32" 
						viewBox="0 0 24 24"
						fill="#000">
						<path d="M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"/>
					</svg>
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.title}>{props.title}</div>
				<div className={styles.description}>{props.description}</div>
			</div>
		</div>
		</Link>
	);
}

export default ProductCard;
