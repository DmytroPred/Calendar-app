import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface CalendarState {
  monthNumber: number;
  selectedDay: string | null;
  showEventModal: boolean
}

const initialState: CalendarState = {
  monthNumber: dayjs().month(),
  selectedDay: dayjs().format('YYYY-MM-DD'),
  showEventModal: false,
}

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setMonthNumber: (state, action) => {
      state.monthNumber = action.payload;
    },
    setSelectedDay: (state, action) => {
      state.selectedDay = action.payload;
    },
    setShowEventModal: (state, action) => {
      state.showEventModal = action.payload;
    }
  }
})

export const { setMonthNumber, setSelectedDay, setShowEventModal } = calendarSlice.actions;
export default calendarSlice.reducer;