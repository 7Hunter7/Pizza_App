import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.scss';
import { useEffect, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootStore } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

// Типизация полей формы
export type RegisterForm = {
	name: {
		value: string
	},
	email: {
		value: string
	},
	password: {
		value: string
	}
}

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const { jwt, loginErrorMessage } = useSelector((s: RootStore) => s.user);

	useEffect(() => {
		if(jwt) navigate('/');
	}, [jwt]) 

	// Получение данных полей формы
	const submit = async(e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password } = target;
		console.log('Email: ', email.value);
		console.log('Password: ', password.value);
		await sendLogin(email.value, password.value);
	};

	// Отправка запроса на сервер для входа
	const sendLogin = async (email:string, password:string) => {
		dispatch(login ({email,password})); 
	} 

	return <div className={styles.login}>
		<Headling>Регистрация</Headling>
		{loginErrorMessage && <div className={styles.error}>Ошибка: {loginErrorMessage}</div>}
		<form className={styles.form} onSubmit={submit}>
		<div className={styles.field}>
				<label htmlFor='name'>Ваше Имя</label>
				<Input id='name' name='name' placeholder='Имя'/>
			</div>
			<div className={styles.field}>
				<label htmlFor='email'>Ваш email</label>
				<Input id='email' name='email' placeholder='Email'/>
			</div>
			<div className={styles.field}>
				<label htmlFor='password'>Ваш пароль</label>
				<Input id='password' name='password' type='password' placeholder='Пароль'/>
			</div>
			<Button appearence='big'>Зарегистрироваться</Button>
		</form>
			<div className={styles.links}>
				<p>Есть аккаунт?</p>
				<Link to='/auth/login'>Войти</Link>
			</div>
	</div>
};