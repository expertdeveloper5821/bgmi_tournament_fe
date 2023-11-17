import { createSlice } from '@reduxjs/toolkit';
import { initialValues, userDashboardInitialState } from '../constants';
import {
  getAllRooms,
  getMatchDetails,
  getRegRooms,
  joinMatch,
} from '../actions/userDashboardActions';

const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState: userDashboardInitialState,
  reducers: {
    onSelectMatch(state, action) {
      state.selectedMatch = action.payload;
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
      .addCase(getAllRooms.rejected, (state, action) => {
        state.allRoomsLoading = false;
        state.allRoomsError = action.error.message;
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
      .addCase(getRegRooms.rejected, (state, action) => {
        state.regRoomsLoading = false;
        state.regRoomsError = action.payload;
      })
      .addCase(joinMatch.pending, (state) => {
        state.joinMatchLoading = true;
        state.joinMatchError = null;
      })
      .addCase(joinMatch.fulfilled, (state) => {
        state.joinMatchLoading = false;
        state.joinMatchError = null;
      })
      .addCase(joinMatch.rejected, (state, action) => {
        state.joinMatchLoading = false;
        state.joinMatchError = action.error.message!;
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
      .addCase(getMatchDetails.rejected, (state, action) => {
        state.matchDataLoading = false;
        state.matchDataError = action.error.message!;
      });
  },
});

export const { onSelectMatch } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;
