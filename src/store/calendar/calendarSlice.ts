import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface CalendarState {
  monthNumber: number;
}

const initialState: CalendarState = {
  monthNumber: dayjs().month(),
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthNumber: (state, action) => {
      state.monthNumber = action.payload;
    }
  }
})

export const { setMonthNumber } = calendarSlice.actions;
export default calendarSlice.reducer;