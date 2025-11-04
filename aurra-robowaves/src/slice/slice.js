import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk("user/register", async (formData,thunkAPI) => {
  
  try {
    await new Promise((r) => setTimeout(r, 1000));
    return formData;
  } catch (error) {
    return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      )
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { loading: false, user: null },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
