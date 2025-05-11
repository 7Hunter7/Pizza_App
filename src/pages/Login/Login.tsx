import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.scss';

export function Login() {
	return <div className={styles.login}>
		<Headling>Вход</Headling>
		<form className={styles.form}>
			<div className={styles.field}>
				<label htmlFor='email'>Ваш email</label>
				<Input id='email' placeholder='Email'/>
			</div>
			<div className={styles.field}>
				<label htmlFor='password'>Ваш пароль</label>
				<Input id='password' placeholder='Пароль'/>
			</div>
			<Button appearence='big'>Вход</Button>
		</form>
			<div>
				<p>Нет аккаунта?</p>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
	</div>
};