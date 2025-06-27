// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const bookSlice = createSlice({
//   name: 'book',
//   initialState: {
//     books: [],
//     loading: false,
//     error: null,
//     message: null,
//   },
//   reducers: {
//     fetchBooksRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     fetchBooksSuccess: (state, action) => {
//       state.books = action.payload;
//       state.loading = false;
//       state.error = null;
//       state.message = 'Books fetched successfully';
//     },
//     fetchBooksFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.message = null;
//     },
//     addBookRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     addBookSuccess: (state, action) => {
//       //state.books.push(action.payload);
//       state.loading = false;
//       state.error = null;
//       state.message = action.payload.message || 'Book added successfully';
//     },
//     addBookFailed: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       //state.message = null;
//     },
//     resetBookSlice: (state) => {
//       //state.books = [];
//       state.loading = false;
//       state.error = null;
//       state.message = null;
//     },
//   },
// });

// export const fetchAllBooks = () => async (dispatch) => {
//   dispatch(bookSlice.actions.fetchBooksRequest());
//   await axios
//     .get("http://localhost:4000/api/v1/book/all", { withCredentials: true })
//     .then(res => {
//       dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
//     })
//     .catch(err => {
//       const errorMsg =
//         err.response && err.response.data && err.response.data.message
//           ? err.response.data.message
//           : err.message || 'Failed to fetch books';
//       dispatch(bookSlice.actions.fetchBooksFailed(errorMsg));
//     });
// };

// export const addBook = (data) => async (dispatch) => {
//   dispatch(bookSlice.actions.addBookRequest());
//   await axios
//     .post(
//       "http://localhost:4000/api/v1/book/admin/add",
//       data,
//       {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" }
//       }
//     )
//     .then(res => {
//       dispatch(bookSlice.actions.addBookSuccess(res.data));
//     })
//     .catch(err => {
//       const errorMsg =
//         err.response && err.response.data && err.response.data.message
//           ? err.response.data.message
//           : err.message || 'Failed to add book';
//       dispatch(bookSlice.actions.addBookFailed(errorMsg));
//     });
// };

// export const resetBookSlice = () => (dispatch) => {
//   dispatch(bookSlice.actions.resetBookSlice());
// };

// export default bookSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const bookSlice = createSlice({
  name: 'book',
  initialState: {
    books: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.books = action.payload;
      state.loading = false;
      state.error = null;
      state.message = null; // ✅ Prevent double message from here
    },
    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload.message || 'Book added successfully';
    },
    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const deleteBook = (bookId) => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const res = await axios.delete(
      `http://localhost:4000/api/v1/book/delete/${bookId}`,
      { withCredentials: true }
    );
    dispatch(fetchAllBooks());
    return { payload: { success: true, message: res.data.message } }; // ✅ Return message directly
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || "Failed to delete book";
    dispatch(bookSlice.actions.fetchBooksFailed(errorMsg));
    return { payload: { success: false, message: errorMsg } };
  }
};

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const res = await axios.get("http://localhost:4000/api/v1/book/all", { withCredentials: true });
    dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch books';
    dispatch(bookSlice.actions.fetchBooksFailed(errorMsg));
  }
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  try {
    const res = await axios.post("http://localhost:4000/api/v1/book/admin/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    });
    dispatch(bookSlice.actions.addBookSuccess(res.data));
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message || 'Failed to add book';
    dispatch(bookSlice.actions.addBookFailed(errorMsg));
  }
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailed,
  addBookRequest,
  addBookSuccess,
  addBookFailed,
  resetBookSlice: resetBookSliceAction,
} = bookSlice.actions;

export default bookSlice.reducer;
