import axiosServices from '@/utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTools: [],
  myScan: [],
};

export const ToolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    toolsListSuccess: (state, action) => {
      state.allTools = action.payload;
    },
    scanListSuccess: (state, action) => {
      state.myScan = action.payload;
    },
  },
});

export const { setTheme, toolsListSuccess, scanListSuccess } = ToolsSlice.actions;

export function toolsList(userType) {
  return async (dispatch) => {
    try {
      const type = userType === 'a' ? 'admin' : 'user';
      let response = await axiosServices.get(`/${type}/tools`);
      dispatch(toolsListSuccess(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function startScan(payload) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.post(`/user/scan/new`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function getScanList() {
  return async (dispatch) => {
    try {
      let response = await axiosServices.get(`/user/scan/all`);
      dispatch(scanListSuccess(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export function addScan(payload) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.post(`/admin/tools`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function editScan(payload) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.put(`/admin/tools/${payload?.id}`, payload);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function deleteTool(id) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.delete(`/admin/tools/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export function getScanDetails(id, userType) {
  return async (dispatch) => {
    try {
      const type = userType === 'a' ? 'admin' : 'user';
      let response = await axiosServices.get(`/${type}/tool/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function getScanStatus(id) {
  return async (dispatch) => {
    try {
      let response = await axiosServices.get(`/user/scan/status/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
export function fileUploaded(form) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', form);

      let response = await axiosServices.post('/admin/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default ToolsSlice.reducer;
