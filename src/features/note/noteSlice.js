import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
    notes: localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addToNotes: (state, action) => {
            const newNote = action.payload;
            
            const noteExists = state.notes.some(note => note.title.toLowerCase() == newNote.title.toLowerCase());

            if (noteExists) {
                toast.error("Note with this title already exists");
            } else {
                state.notes.push(newNote);
                localStorage.setItem("notes", JSON.stringify(state.notes));
                toast.success("Note Created Successfully");
            }
        },
        updateToNotes: (state, action) => {
            const newNote = action.payload;
            const index = state.notes.findIndex(item => item._id === newNote?._id);
            
            if (index >= 0) {
                state.notes[index] = newNote;
                localStorage.setItem("notes", JSON.stringify(state.notes));
                toast.success("Note Updated successfully");
            } else {
                toast.error("Note does not updated");
            }
        },
        resetAllNotes: (state, action) => {
            state.notes = [];
            localStorage.removeItem("notes");
        },
        removeFromNotes: (state, action) => {
            const noteId = action.payload;

            const index = state.notes.findIndex(item => item._id === noteId);

            if (index >= 0) {
                state.notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(state.notes));
                toast.success("Note deleted Successfully");
            } else {
                toast.error("Note doesn't deleted");
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToNotes, updateToNotes, resetAllNotes, removeFromNotes } = noteSlice.actions

export default noteSlice.reducer