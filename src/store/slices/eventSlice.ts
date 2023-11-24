import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { CalendarEvent } from "../../models/event";

interface EventState {
  events: CalendarEvent[];
  selectedEvent: CalendarEvent | null,
  error: string | null;
}

interface EventRequestParams {
  userId: string;
  event: CalendarEvent;
}

const initialState: EventState = {
  events: [],
  selectedEvent: null,
  error: null,
}

export const fetchEvents = createAsyncThunk('event/fetchEvents', async (userId: string) => {
  const eventCollectionRef = collection(db, `users/${userId}/events`)
  const docs = await getDocs(eventCollectionRef);
  const data = docs.docs.map((doc) => ({...doc.data()} as CalendarEvent));

  return data;
});

export const addEvent = createAsyncThunk('event/addEvent', async ({userId, event}: EventRequestParams) => {
  await setDoc(doc(db, `users/${userId}/events/${event.id}`), event);

  return event;
});

export const updateEvent = createAsyncThunk('event/updateEvent', async({userId, event}: EventRequestParams) => {
  await updateDoc(
    doc(db, `users/${userId}/events/${event.id}`),
    {...event}
  )

  return event;
});

export const deleteEvent = createAsyncThunk('event/deleteEvent', async ({userId, event}: EventRequestParams) => {
  await deleteDoc(doc(db, `users/${userId}/events/${event.id}`));

  return event.id;
})

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Fetch all events
      .addCase(fetchEvents.fulfilled, (state, action) => {
        if(!action.payload) return;

        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        console.error(state.error);
      })

      // Add event
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        console.error(state.error);
      })

      // Update event
      .addCase(updateEvent.fulfilled, (state, action) => {
        const id = action.payload.id;
        const eventPosition = state.events.findIndex(event => event.id === id);

        state.events[eventPosition] = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        console.error(state.error);
      })

      // Delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(event => event.id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        console.error(state.error);
      })
  },
})

export const { setSelectedEvent } = eventSlice.actions;
export default eventSlice.reducer;