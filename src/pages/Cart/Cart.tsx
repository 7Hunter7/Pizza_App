import { useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import styles from './Cart.module.scss';
import type { RootStore } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import type { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';

export function Cart() {
  const [cartProducts, setCartProducts ] = useState<Product[]>([]);
  const items = useSelector((s: RootStore) => s.cart.items);
  const DELIVERY = 169;
  const total = items.map(i => {
    const product = cartProducts.find(p => p.id === i.id);
    if(!product) return 0;
    return i.count * product.price;
  }).reduce((acc, i) => acc += i, 0);

  useEffect(() => {
    loadAllItems();
  }, [items]);

  // Загрузка одного продукта корзины
  const getItem = async (id: number) => {
    const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };
  // Загрузка всех продуктов корзины
  const loadAllItems = async () => {
    const res = await Promise.all(items.map(i => getItem(i.id)));
    setCartProducts(res);
  };

	return ( <>
    <div className={styles.cart}>
      <Headling className={styles.headling}>Корзина</Headling>
      {items.map(i => {
        const product = cartProducts.find(p => p.id === i.id);
        if(!product) return;
        return <CartItem key={product.id} count={i.count} {...product}/>
      })}
    </div>
    <div className={styles.line}>
      <div className={styles.text}>Всего</div>
      <div className={styles.price}>{total}&nbsp;<span>₽</span></div>
    </div>
    <hr className={styles.hr}/>
    <div className={styles.line}>
      <div className={styles.text}>Доставка</div>
      <div className={styles.price}>{DELIVERY}&nbsp;<span>₽</span></div>
    </div>
    <hr className={styles.hr}/>
    <div className={styles.line}>
      <div className={styles.text}>Итог</div>
      <div className={styles.price}>{ total + DELIVERY}&nbsp;<span>₽</span></div>
    </div>
    </>
	);
};