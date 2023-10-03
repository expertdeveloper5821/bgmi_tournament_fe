import { createAsyncThunk } from '@reduxjs/toolkit';
import { IJoinMatchPayload } from '../types';
import {
  getAllRoomsService,
  getMatchDetailsService,
  getRegRoomsService,
  joinMatchService,
} from '@/services/userDashboardServices';

export const getAllRooms = createAsyncThunk('user/allRooms', async () => {
  const response = await getAllRoomsService();
  return response.data || response;
});

export const getRegRooms = createAsyncThunk('user/regRooms', async () => {
  const response = await getRegRoomsService();
  return response.data || response;
});

export const joinMatch = createAsyncThunk('user/join', async (data: IJoinMatchPayload) => {
  const response = await joinMatchService(data);
  return response.data || response;
});

export const getMatchDetails = createAsyncThunk(
  'match/data',
  async ({ matchID }: { matchID: string }) => {
    const response = await getMatchDetailsService(matchID);
    return response.data || response;
  },
);
