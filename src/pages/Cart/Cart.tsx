import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import styles from './Cart.module.scss';
import type { AppDispath, RootStore } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import type { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

export function Cart() {
  const [cartProducts, setCartProducts ] = useState<Product[]>([]);
  const items = useSelector((s: RootStore) => s.cart.items);
  const jwt = useSelector((s: RootStore) => s.user.jwt);
  const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();

  
  const DELIVERY = 169;
  const total = items.map(i => {
    const product = cartProducts.find(p => p.id === i.id);
    if(!product) return 0;
    return i.count * product.price;
  }).reduce((acc, i) => acc += i, 0);

  // Отправка запроса на сервер для оформления покупки
  const checkout = async () => {
    await axios.post<Product>(`${PREFIX}/order`, {
      products: items,
    },{
      headers: {
      Authorization: `Bearer ${jwt}`
      }
    });
    dispatch(cartActions.clean());
    navigate('/success');
  };

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
    <div className={styles.checkout}>
      <Button appearence='big' onClick={checkout}>Оформить</Button>
    </div>
    </>
	);
};