import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios from 'axios';
import { PREFIX } from '../helpers/API';
import type { LoginResponse } from '../interfaces/auth.interface';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
};

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login  = createAsyncThunk('user/login',
    async (params: {email: string, password: string}) => {
      // Запрос на сервер с данными из полей формы
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			})
      return data;
    }
  );


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    }
  },
  extraReducers: (builder) =>  {
    builder.addCase(login.fulfilled, (state, action) => {
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    })
  }, 
}); 

export default userSlice.reducer;
export const userActions = userSlice.actions;