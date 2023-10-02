import { createSlice } from '@reduxjs/toolkit';
// import { IRegRoomsResponse } from '../types';
import { initialValues, userDashboardinitialState } from '../constants';
import {
  getAllRooms,
  getMatchDetails,
  getRegRooms,
  joinMatch,
} from '../actions/userDashboardActions';

const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState: userDashboardinitialState,
  reducers: {
    onSelectMatch(state, action) {
      state.selectedMatch = action.payload;
    },
    onResetJoinMessage(state, action) {
      state.joinMatchMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRooms.pending, (state) => {
        state.allRoomsLoading = true;
        state.allRoomsError = null;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.allRooms = action.payload;
        state.selectedMatch =
          Array.isArray(action.payload) && action.payload.length > 0
            ? action.payload[0]
            : initialValues;
        state.allRoomsLoading = false;
        state.allRoomsError = null;
      })
      .addCase(getAllRooms.rejected, (state) => {
        state.allRoomsLoading = false;
        // state.allRoomsError = action.payload?.message || ""; //TODO: Add error message from api
      })
      .addCase(getRegRooms.pending, (state) => {
        state.regRoomsLoading = true;
        state.regRoomsError = null;
      })
      .addCase(getRegRooms.fulfilled, (state, action) => {
        state.regRooms = action.payload?.rooms?.sort(
          (a, b) => +new Date(b.dateAndTime) - +new Date(a.dateAndTime),
        );
        state.regRoomsLoading = false;
        state.regRoomsError = null;
      })
      .addCase(getRegRooms.rejected, (state) => {
        state.regRoomsLoading = false;
        // const { message } = action.payload as IRegRoomsResponse;
        // state.regRoomsError = message || "Something went wrong!";
      })
      .addCase(joinMatch.pending, (state) => {
        state.joinMatchLoading = true;
        state.joinMatchError = null;
      })
      .addCase(joinMatch.fulfilled, (state, action) => {
        state.joinMatchMessage = action.payload?.message;
        state.joinMatchLoading = false;
        state.joinMatchError = null;
      })
      .addCase(joinMatch.rejected, (state) => {
        state.joinMatchLoading = false;
        // state.joinMatchError = action.payload;
      })
      .addCase(getMatchDetails.pending, (state) => {
        state.matchDataLoading = true;
        state.matchDataError = null;
      })
      .addCase(getMatchDetails.fulfilled, (state, action) => {
        state.matchData = action.payload?.room;
        state.matchDataLoading = false;
        state.matchDataError = null;
      })
      .addCase(getMatchDetails.rejected, (state) => {
        state.matchDataLoading = false;
        // state.matchDataError = action.payload?.message
      });
  },
});

export const { onSelectMatch, onResetJoinMessage } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;
