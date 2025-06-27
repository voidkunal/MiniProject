import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toggleAddNewAdminPopup } from "./popupSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    fetchAllUsersRequest(state) {
      state.loading = true;
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailed(state) {
      state.loading = false;
    },
    addNewAdminRequest(state) {
      state.loading = true;
    },
    addNewAdminSuccess(state) {
      state.loading = false;
    },
    addNewAdminFailed(state) {
      state.loading = false;
    },
  },
});

export const fetchAllUsers = () => async (dispatch) => {
  console.log("📥 fetchAllUsers() dispatched");
  dispatch(userSlice.actions.fetchAllUsersRequest());

  try {
    const res = await axios.get("http://localhost:4000/api/v1/user/all", {
      withCredentials: true,
    });
    console.log("📤 Received users:", res.data.users);
    dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));
  } catch (err) {
    console.error("⚠️ fetchAllUsers error:", err.response?.data || err.message);
    dispatch(userSlice.actions.fetchAllUsersFailed(err.response?.data?.message));
  }
};

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/user/add/new-Admin",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(userSlice.actions.addNewAdminSuccess());
    toast.success(res.data.message);
    dispatch(toggleAddNewAdminPopup());
  } catch (err) {
    dispatch(userSlice.actions.addNewAdminFailed());
    toast.error(err.response?.data?.message);
  }
};

export default userSlice.reducer;
