import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User, { LoginUserPayload } from "../models/User";
import axios from "axios";

// Define the state
export interface AuthSliceState {
  loggedInUser: User | undefined;
  token: string | null;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
  userInfo: User | undefined;
}

// Initial state
const initialState: AuthSliceState = {
  loggedInUser: undefined,
  token: null,
  loading: false,
  error: false,
  registerSuccess: false,
  userInfo: undefined,
};

// loginUser
export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      console.log("inside loginuser...");
      const resp = await axios.post("http://localhost:8000/auth/login", user);
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// account
export const getAccountDetails = createAsyncThunk(
  "auth/account",
  async (token: string, thunkAPI) => {
    try {
      console.log("inside account details...");
      const resp = await axios.get("http://localhost:8000/auth/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state = {
        ...state,
        error: false,
        loading: true,
      };
      return state;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state = {
        ...state,
        error: false,
        loading: false,
        loggedInUser: action.payload.user,
        token: action.payload.token,
      };
      return state;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });
    // account
    builder.addCase(getAccountDetails.pending, (state, action) => {
      state = {
        ...state,
        error: false,
        loading: true,
      };
      return state;
    });

    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      console.log("get-account-payload", action.payload);
      state = {
        ...state,
        error: false,
        loading: false,
        userInfo: action.payload,
      };
      return state;
    });

    builder.addCase(getAccountDetails.rejected, (state, action) => {
      state = {
        ...state,
        error: true,
      };
      return state;
    });
  },
});

export const {} = AuthSlice.actions; // implicitely exports all actions defined in reducers
export default AuthSlice.reducer;
