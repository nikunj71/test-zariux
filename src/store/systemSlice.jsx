import axiosServices from '@/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logsList: [],
  stats: {},
};

export const SystemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    logsListSuccess: (state, action) => {
      state.logsList = action.payload;
    },
    getStatesSuccess: (state, action) => {
      state.stats = action.payload;
    },
  },
});

export const { setTheme, logsListSuccess, getStatesSuccess } = SystemSlice.actions;

export function systemLogsList(userType) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.get(`/admin/logs`);
      dispatch(logsListSuccess(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function getStats() {
  return async (dispatch) => {
    try {
      let response = await axiosServices.get(`/admin/system-stats`);
      dispatch(getStatesSuccess(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default SystemSlice.reducer;
