import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import type { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';

export function Menu() {
	const getMenu = async() => {
		const res = await fetch(`${PREFIX}/products`);
		if (!res.ok) return;
		const data = await res.json() as Product[];
		console.log('data: ', data);

	return (
		<>
			<div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder='Введите блюдо или состав'/>
			</div>
			<div>
				<ProductCard 
					id={1}
					title='Наслаждение'
					description='Салями, руккола, помидоры, оливки'
					rating={4.5}
					price={300}
					image='/pizza.jpg'
				/>
			</div>
    </>
	);
};