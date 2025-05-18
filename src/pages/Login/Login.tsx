import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.scss';
import { useEffect, useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath } from '../../store/store';
import { login } from '../../store/user.slice';
import type { RootStore } from '../../store/store';

// Типизация полей формы
export type LoginForm = {
	email: {
		value: string
	},
	password: {
		value: string
	}
}

export function Login() {
	const [error, setError ] = useState<string | undefined>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const jwt = useSelector((s: RootStore) => s.user.jwt	)

	useEffect(() => {
		if(jwt) navigate('/');
	}, [jwt]) 

	// Получение данных полей формы
	const submit = async(e: FormEvent) => {
		e.preventDefault();
		setError(undefined);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		console.log('Email: ', email.value);
		console.log('Password: ', password.value);
		await sendLogin(email.value, password.value);
	};

	// Отправка запроса на сервер для входа
	const sendLogin = async (email:string, password:string) => {
		dispatch(login ({email,password})); 
		// try {
		// 	// Запрос на сервер с данными из полей формы
		// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
		// 		email,
		// 		password
		// 	})
		// 	console.log('Data from sendLogin(): ', data);
		// 	dispatch(userActions.addJwt(data.access_token)); // запись токена в state 
		// 	navigate('/');
		// } catch(err) {
		// 	if (err instanceof AxiosError) {
		// 		console.error('Error: ', err);
		// 		setError(err.response?.data.message)
		// 	}
		// }
	} 

	return <div className={styles.login}>
		<Headling>Вход</Headling>
		{error && <div className={styles.error}>Ошибка: {error}</div>}
		<form className={styles.form} onSubmit={submit}>
			<div className={styles.field}>
				<label htmlFor='email'>Ваш email</label>
				<Input id='email' name='email' placeholder='Email'/>
			</div>
			<div className={styles.field}>
				<label htmlFor='password'>Ваш пароль</label>
				<Input id='password' name='password' placeholder='Пароль'/>
			</div>
			<Button appearence='big'>Вход</Button>
		</form>
			<div className={styles.links}>
				<p>Нет аккаунта?</p>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
	</div>
};