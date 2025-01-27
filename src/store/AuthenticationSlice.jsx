import axiosServices from '@/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authData: {},
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginUserSuccess: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const { setTheme, loginUserSuccess } = AuthenticationSlice.actions;

export function registerNewUser(payload) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.post(`/user/signup`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function loginUser(payload) {
  return async (dispatch) => {
    try {
      const url = payload.userType === 'admin' ? '/admin/login' : '/user/login';
      let response = await axiosServices.post(url, payload);
      dispatch(loginUserSuccess(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default AuthenticationSlice.reducer;
