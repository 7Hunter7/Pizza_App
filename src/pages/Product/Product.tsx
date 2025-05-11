import { useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/product.interface';
import styles from './Product.module.scss';

export function Product() {
const data = useLoaderData() as Product;

	return ( 
		<>Product - {data.name}</>
	);
}