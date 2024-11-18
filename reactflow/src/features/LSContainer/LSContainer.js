import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

export const counterSlice = createSlice({
  name: 'LSContainer',
  initialState: {
    toggleLSContainer: false,
    toggleSelectLead :false,
    toggleOutreach :false,
    toggleDelay : false,
    toggleEditSelectedList :false,
  },
  reducers: {

    showLSContainer: (state,action) => {
      state.toggleLSContainer = true;
    },

    closeLSContainer: (state, action) => {
      state.toggleLSContainer = false;
    },

    showSelectLeadContainer: (state, action) => {
      state.toggleSelectLead = true;
    },

    closeSelectLeadContainer: (state, action) => {
      state.toggleSelectLead = false;
    },

    showOutreachContainer:(state,action)=>{
      state.toggleOutreach = true
    },

    closeOutreachContainer:(state,action)=>{
      state.toggleOutreach = false
    },

    showDelayContainer :(state,action)=>{
      state.toggleDelay = true;
    },

    closeDelayContainer:(state,action)=>{
      state.toggleDelay = false;
    },

    showEditSelectedListContainer :(state,action)=>{
      state.toggleEditSelectedList = true;
    },

    closeEditSelectedListContainer:(state,action)=>{
      state.toggleEditSelectedList = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLSContainer, closeLSContainer, showSelectLeadContainer, closeSelectLeadContainer,
   showOutreachContainer, closeOutreachContainer, showDelayContainer, closeDelayContainer ,
   showEditSelectedListContainer, closeEditSelectedListContainer} = counterSlice.actions; // Export correct action creators

export default counterSlice.reducer;
