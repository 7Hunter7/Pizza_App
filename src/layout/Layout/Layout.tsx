import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootStore } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((s: RootStore) => s.user.profile);
  const items = useSelector((s: RootStore) => s.cart.items);
  
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]) 

  // Выход из приложения
  const logout = () => {
    dispatch(userActions.logout());
    navigate('/auth/login');
  }

	return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img className={styles.avatar} src="/avatar.png" alt="Аватар пользователя" />
          <div className={styles.name}>{profile?.name}</div>
          <div className={styles.email}>{profile?.email}</div>
        </div>
        <div className={styles.menu}>
          <NavLink to='/' className={({isActive}) => cn(styles.link, {
            [styles.active]: isActive
          })}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24"
              fill="#5B5B5E">
              <path  d="M9 20h11q.825 0 1.413-.587T22 18v-2H9zM2 8h5V4H4q-.825 0-1.412.588T2 6zm0 6h5v-4H2zm2 6h3v-4H2v2q0 .825.588 1.413T4 20m5-6h13v-4H9zm0-6h13V6q0-.825-.587-1.412T20 4H9z"/>
            </svg>
            Меню
          </NavLink>
          <NavLink to='/cart' className={({isActive}) => cn(styles.link, {
            [styles.active]: isActive
          })}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              viewBox="0 0 24 24"
              fill="#5B5B5E">
              <path d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h11q.425 0 .713.288T19 16t-.288.713T18 17H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H2q-.425 0-.712-.288T1 3t.288-.712T2 2h1.625q.275 0 .525.15t.375.425z"/>
            </svg>
            Корзина <span className={styles['cart-count']}>{items.reduce((acc: number, item: number) => acc += item.count, 0)}</span>
          </NavLink>
          
        </div>
        <Button className={styles.exit} onClick={logout}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24"
            fill="#fff">
            <path  d="M11 12V4q0-.425.288-.712T12 3t.713.288T13 4v8q0 .425-.288.713T12 13t-.712-.288T11 12m1 9q-1.85 0-3.488-.712T5.65 18.35t-1.937-2.863T3 12q0-1.725.638-3.312T5.425 5.85q.275-.3.7-.3t.725.3q.275.275.25.688t-.3.737q-.85.95-1.325 2.163T5 12q0 2.9 2.05 4.95T12 19q2.925 0 4.963-2.05T19 12q0-1.35-.475-2.588t-1.35-2.187q-.275-.3-.288-.7t.263-.675q.3-.3.725-.3t.7.3q1.175 1.25 1.8 2.838T21 12q0 1.85-.712 3.488t-1.925 2.862t-2.85 1.938T12 21"/>
          </svg>
          Выйти
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet/> 
      </div>
    </div>
  );
}