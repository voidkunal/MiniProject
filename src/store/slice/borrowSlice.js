import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const borrowSlice = createSlice({
  name: 'borrow',
  initialState: {
    userBorrowedBooks: [],
    allBorrowedBooks: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    fetchUsersBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUsersBorrowedBooksSuccess: (state, action) => {
      state.userBorrowedBooks = action.payload;
      state.loading = false;
      //state.error = null;
      //state.message = 'Borrows fetched successfully';
    },
    fetchUsersBorrowedBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      //state.message = null;
    },
    recordBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess(state, action) {
      state.loading = false;
      //state.error = null;
      state.message = action.payload;
    },
    recordBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    fetchAllBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess: (state, action) => {
      state.allBorrowedBooks = action.payload;
      state.loading = false;
      //state.error = null;
      //state.message = 'Borrows fetched successfully';
    },
    fetchAllBorrowedBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      //state.message = null;
    },
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      //state.error = null;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetBorrowSlice: (state) => {
      //state.userBorrowedBooks = [];
      //state.allBorrowedBooks = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchUsersBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchUsersBorrowedBooksRequest());
    await axios.get("http://localhost:4000/api/v1/borrow/my-borrowed-books", { withCredentials: true })
        .then(res => {
        dispatch(borrowSlice.actions.fetchUsersBorrowedBooksSuccess(res.data.borrowedBooks));
        })
        .catch(err => {
        dispatch(borrowSlice.actions.fetchUsersBorrowedBooksFailed(err.response.data.message));
        });
};


export const fetchAllBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
    await axios.get("http://localhost:4000/api/v1/borrow/borrowed-books-users", { withCredentials: true })
        .then(res => {
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksSuccess(res.data.borrowedBooks));
        })
        .catch(err => {
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailed(err.response.data.message));
        });
};

export const recordBorrowBook = (id, email) => async (dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest());
    await axios.post(`http://localhost:4000/api/v1/borrow/record-borrow-book/${id}`, { email }, { withCredentials: true, headers: {  "Content-Type": "application/json", } })
        .then(res => {
        dispatch(borrowSlice.actions.recordBookSuccess(res.data.message));
        })
        .catch(err => {
        dispatch(borrowSlice.actions.recordBookFailed(err.response.data.message));
        });
};

export const returnBook = (email, id) => async (dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest());
    await axios.post(`http://localhost:4000/api/v1/borrow/return-borrow-book/${id}`, {email}, { withCredentials: true, headers: { "Content-Type": "application/json" } })
        .then(res => {
        dispatch(borrowSlice.actions.returnBookSuccess(res.data.message));
        })
        .catch(err => {
        dispatch(borrowSlice.actions.returnBookFailed(err.response.data.message));
        });
};

export const resetBorrowSlice = () => (dispatch) => {
    dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;
