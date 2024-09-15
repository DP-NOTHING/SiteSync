import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavState = {
  anchorElNav: null | HTMLElement;
  anchorElUser: null | HTMLElement;
}

const initialState: NavState = {
  anchorElNav: null,
  anchorElUser: null,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setAnchorElNav: (state, action: PayloadAction<null | HTMLElement>)=> {
      console.log(action.payload);
      // state.anchorElNav = action.payload;
    },
    setAnchorElUser: (state, action: PayloadAction<null | HTMLElement>) =>{
      // state.anchorElUser = action.payload;
    },
    clearAnchorEls: (state)=> {
      state.anchorElNav = null;
      state.anchorElUser = null;
    }
  }
});

export const { setAnchorElNav, setAnchorElUser, clearAnchorEls } = navSlice.actions;
export default navSlice.reducer;
