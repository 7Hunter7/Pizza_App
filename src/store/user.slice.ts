import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import type { LoginResponse } from '../interfaces/auth.interface';
import type { Profile } from '../interfaces/user.interface';
import type { RootStore } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: Profile;
};

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

// Вход пользователя
export const login  = createAsyncThunk('user/login',
  async (params: {email: string, password: string}) => {
    try {
      // Запрос на сервер с данными из полей формы
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
		});
      return data;
    } catch(err) {
      if(err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
    }
  }
);

// Регистрация пользователя
export const register  = createAsyncThunk('user/register',
  async (params: {name: string, email: string, password: string}) => {
    try {
      // Запрос на сервер с данными из полей формы
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				name: params.name,
        email: params.email,
				password: params.password
		});
      return data;
    } catch(err) {
      if(err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
    }
  }
);

// Получение профиля пользователя
export const getProfile  = createAsyncThunk<Profile, void, {state: RootStore}>('user/profile',
  async ( _, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    // Запрос на сервер для получения профиля пользователя
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
		});
    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    }, 
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    }
  },
  // Обработка состояний
  extraReducers: (builder) =>  {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  }, 
}); 

export default userSlice.reducer;
export const userActions = userSlice.actions;