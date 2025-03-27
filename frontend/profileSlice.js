import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  reducers: {
    setProfileData(state, action) {
      return { ...state, ...action.payload };
    },
    clearProfileData(state) {
      return { firstName: '', lastName: '', email: '', password: '' };
    }
  }
});

export const { setProfileData, clearProfileData } = profileSlice.actions;
export default profileSlice.reducer;
