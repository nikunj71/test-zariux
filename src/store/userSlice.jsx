import axiosServices from '@/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userListSuccess: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setTheme, userListSuccess } = userSlice.actions;

export function getUserList() {
  return async (dispatch) => {
    try {
      let response = await axiosServices.get(`/admin/users`);
      dispatch(userListSuccess(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function deleteUser(userId) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.delete(`/admin/users/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default userSlice.reducer;
