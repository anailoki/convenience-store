import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export type AlertType = 'warning' | 'error' | 'success' | 'info';

export interface AlertState {
  showAlert: boolean;
  type: AlertType;
  description: string;
  title?: string;
  duration?: number;
}

export type AlertPayload = {
  type: AlertType;
  description: string;
  title?: string;
  duration?: number;
};

const initialState: AlertState = {
  showAlert: false,
  type: 'info',
  description: '',
  title: '',
  duration: 5000,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertPayload>) => {
      state.type = action.payload.type;
      state.description = action.payload.description;
      state.title = action.payload.title;
      state.duration = action.payload.duration ?? 5000;
      state.showAlert = true;
    },
    hideAlert: (state) => {
      state.showAlert = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
