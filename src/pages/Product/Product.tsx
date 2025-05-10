import { useParams } from 'react-router-dom';
import styles from './Product.module.scss';

export function Product() {
const {id} = useParams();

	return ( 
		<>Product - {id}</>
	);
}


