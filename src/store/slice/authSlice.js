
// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = "http://localhost:4000/api/v1";

// const initialState = {
//   loading: false,
//   user: null,
//   error: null,
//   isAuthenticated: false,
//   message: null,
//   addNewAdminPopup: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     registerRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     registerSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload?.message || "Registered successfully.";
//     },
//     registerFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     otpVerificationRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     otpVerificationSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload?.message || "OTP Verified";
//       state.isAuthenticated = true;
//       state.user = action.payload?.user || null;
//     },
//     otpVerificationFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     loginRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload?.message || "Login successful";
//       state.isAuthenticated = true;
//       state.user = action.payload?.user || null;
//     },
//     loginFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     logoutRequest: (state) => {
//       state.loading = true;
//     },
//     logoutSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload || "Logged out successfully.";
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//     logoutFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     getUserRequest: (state) => {
//       state.loading = true;
//     },
//     getUserSuccess: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload?.user || null;
//     },
//     getUserFailed: (state, action) => {
//       state.loading = false;
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = action.payload || null; // silence expected error
//     },

//     forgotPasswordRequest: (state) => {
//       state.loading = true;
//     },
//     forgotPasswordSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload?.message || "Email sent successfully.";
//     },
//     forgotPasswordFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     resetPasswordRequest: (state) => {
//       state.loading = true;
//     },
//     resetPasswordSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload?.message || "Password reset.";
//       state.user = action.payload?.user || null;
//       state.isAuthenticated = true;
//     },
//     resetPasswordFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     updatePasswordRequest: (state) => {
//       state.loading = true;
//     },
//     updatePasswordSuccess: (state, action) => {
//       state.loading = false;
//       state.message = action.payload || "Password updated.";
//     },
//     updatePasswordFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     resetAuthSlice: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.message = null;
//     },

//     setAuthenticated: (state, action) => {
//       state.isAuthenticated = action.payload;
//     },
//   },
// });

// export const {
//   registerRequest,
//   registerSuccess,
//   registerFailed,
//   otpVerificationRequest,
//   otpVerificationSuccess,
//   otpVerificationFailed,
//   loginRequest,
//   loginSuccess,
//   loginFailed,
//   logoutRequest,
//   logoutSuccess,
//   logoutFailed,
//   getUserRequest,
//   getUserSuccess,
//   getUserFailed,
//   forgotPasswordRequest,
//   forgotPasswordSuccess,
//   forgotPasswordFailed,
//   resetPasswordRequest,
//   resetPasswordSuccess,
//   resetPasswordFailed,
//   updatePasswordRequest,
//   updatePasswordSuccess,
//   updatePasswordFailed,
//   resetAuthSlice,
//   setAuthenticated,
// } = authSlice.actions;

// export default authSlice.reducer;

// // ------------------ Thunks ------------------

// export const register = (data) => async (dispatch) => {
//   try {
//     dispatch(registerRequest());
//     const { data: res } = await axios.post(`${API}/auth/register`, data, {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch(registerSuccess(res));
//   } catch (err) {
//     dispatch(registerFailed(err?.response?.data?.message || "Registration failed"));
//   }
// };

// export const otpVerification = (email, otp) => async (dispatch) => {
//   try {
//     dispatch(otpVerificationRequest());
//     const { data: res } = await axios.post(
//       `${API}/auth/verify-otp`,
//       { email, otp },
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     dispatch(otpVerificationSuccess(res));
//     if (res.token) localStorage.setItem("token", res.token);
//   } catch (err) {
//     dispatch(otpVerificationFailed(err?.response?.data?.message || "OTP verification failed"));
//   }
// };

// export const login = (data) => async (dispatch) => {
//   try {
//     dispatch(loginRequest());
//     const { data: res } = await axios.post(`${API}/auth/login`, data, {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch(loginSuccess(res));
//     if (res.token) localStorage.setItem("token", res.token);
//   } catch (err) {
//     dispatch(loginFailed(err?.response?.data?.message || "Login failed"));
//   }
// };

// export const logout = () => async (dispatch) => {
//   try {
//     dispatch(logoutRequest());
//     const { data } = await axios.get(`${API}/auth/logout`, { withCredentials: true });
//     dispatch(logoutSuccess(data.message));
//     dispatch(resetAuthSlice());
//     localStorage.removeItem("token");
//   } catch (err) {
//     dispatch(logoutFailed(err?.response?.data?.message || "Logout failed"));
//   }
// };

// // ✅ Final Fixed getUser
// export const getUser = () => async (dispatch) => {
//   try {
//     dispatch(getUserRequest());
//     const { data } = await axios.get(`${API}/auth/me`, { withCredentials: true });
//     dispatch(getUserSuccess(data.data)); // assuming: { data: { user } }
//   } catch (err) {
//     const status = err?.response?.status;
//     const message = err?.response?.data?.message;

//     const isExpected = status === 400 && message === "User is not authenticated";

//     if (isExpected) {
//       dispatch(getUserFailed(null)); // ✅ Silent fail
//       return;
//     }

//     console.error("getUser error:", message || err.message);
//     dispatch(getUserFailed(message || err.message || "Fetching user failed"));
//   }
// };

// export const forgotPassword = (email) => async (dispatch) => {
//   try {
//     dispatch(forgotPasswordRequest());
//     const { data } = await axios.post(
//       `${API}/auth/password/forgot`,
//       { email },
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     dispatch(forgotPasswordSuccess({ message: data.message }));
//   } catch (err) {
//     dispatch(
//       forgotPasswordFailed(err?.response?.data?.message || err?.message || "Email failed to send")
//     );
//   }
// };

// export const resetPassword = (data, token) => async (dispatch) => {
//   try {
//     dispatch(resetPasswordRequest());
//     const { data: res } = await axios.put(`${API}/auth/password/reset/${token}`, data, {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch(resetPasswordSuccess(res));
//   } catch (err) {
//     dispatch(resetPasswordFailed(err?.response?.data?.message || "Reset failed"));
//   }
// };

// export const updatePassword = (data) => async (dispatch) => {
//   try {
//     dispatch(updatePasswordRequest());
//     const { data: res } = await axios.put(`${API}/auth/password/update`, data, {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//     });
//     dispatch(updatePasswordSuccess(res.message));
//   } catch (err) {
//     dispatch(updatePasswordFailed(err?.response?.data?.message || "Update failed"));
//   }
// };


// Store code for error 
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:4000/api/v1";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Registered successfully.";
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    otpVerificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "OTP Verified";
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
    },
    otpVerificationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Login successful";
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload || "Logged out successfully.";
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.user || null;
    },
    getUserFailed: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || null;
    },

    forgotPasswordRequest: (state) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Email sent successfully.";
    },
    forgotPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Password reset.";
      state.user = action.payload?.user || null;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload || "Password updated.";
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  otpVerificationRequest,
  otpVerificationSuccess,
  otpVerificationFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  resetAuthSlice,
  setAuthenticated,
} = authSlice.actions;

export default authSlice.reducer;

// ------------------ Thunks ------------------

export const register = (data) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data: res } = await axios.post(`${API}/auth/register`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(registerSuccess(res));
  } catch (err) {
    dispatch(registerFailed(err?.response?.data?.message || "Registration failed"));
  }
};

export const otpVerification = (email, otp) => async (dispatch) => {
  try {
    dispatch(otpVerificationRequest());
    const { data: res } = await axios.post(
      `${API}/auth/verify-otp`,
      { email, otp },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(otpVerificationSuccess(res));
    if (res.token) localStorage.setItem("token", res.token);
  } catch (err) {
    dispatch(otpVerificationFailed(err?.response?.data?.message || "OTP verification failed"));
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data: res } = await axios.post(`${API}/auth/login`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(loginSuccess(res));
    if (res.token) localStorage.setItem("token", res.token);
  } catch (err) {
    dispatch(loginFailed(err?.response?.data?.message || "Login failed"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await axios.get(`${API}/auth/logout`, { withCredentials: true });
    dispatch(logoutSuccess(data.message));
    dispatch(resetAuthSlice());
    localStorage.removeItem("token");
  } catch (err) {
    dispatch(logoutFailed(err?.response?.data?.message || "Logout failed"));
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const { data } = await axios.get(`${API}/auth/me`, { withCredentials: true });
    dispatch(getUserSuccess(data.data));
  } catch (err) {
    const status = err?.response?.status;
    const message = err?.response?.data?.message;

    const isExpected = status === 400 && message === "User is not authenticated";

    if (isExpected) {
      dispatch(getUserFailed(null));
      return;
    }

    console.error("getUser error:", message || err.message);
    dispatch(getUserFailed(message || err.message || "Fetching user failed"));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const { data } = await axios.post(
      `${API}/auth/password/forgot`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotPasswordSuccess({ message: data.message }));
  } catch (err) {
    dispatch(
      forgotPasswordFailed(err?.response?.data?.message || err?.message || "Email failed to send")
    );
  }
};

export const resetPassword = (data, token) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());
    const { data: res } = await axios.put(`${API}/auth/password/reset/${token}`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(resetPasswordSuccess(res));
  } catch (err) {
    dispatch(resetPasswordFailed(err?.response?.data?.message || "Reset failed"));
  }
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
    const { data: res } = await axios.put(`${API}/auth/password/update`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updatePasswordSuccess(res.message));
  } catch (err) {
    dispatch(updatePasswordFailed(err?.response?.data?.message || "Update failed"));
  }
};
