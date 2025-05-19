import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.scss';
import { useEffect, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootStore } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

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
	const { jwt, registerErrorMessage } = useSelector((s: RootStore) => s.user);

	useEffect(() => {
		if(jwt) navigate('/');
	}, [jwt]) 

	// Получение данных полей формы
	const submit = async(e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { name, email, password } = target;
		console.log('Name: ', name.value);
		console.log('Email: ', email.value);
		console.log('Password: ', password.value);
		// Отправка запроса на сервер для входа
		dispatch(register({name: name.value, email: email.value, password: password.value})); 
	};

	return <div className={styles.login}>
		<Headling>Регистрация</Headling>
		{registerErrorMessage && <div className={styles.error}>Ошибка: {registerErrorMessage}</div>}
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