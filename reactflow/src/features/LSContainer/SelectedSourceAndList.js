import { createSlice } from '@reduxjs/toolkit';

export const selectedSourceAndLists = createSlice({
  name: 'selectedSourceAndLists',
  initialState: {
    Source: {},
    SelectedsourceList: [],
  },
  reducers: {
    addSource: (state, action) => {
      state.Source = {
        className: action.payload.className,
        heading: action.payload.heading,
        desc: action.payload.desc,
        id: action.payload.id,
      };
    },

    deleteSource :(state,action )=>{
      state.Source = {}
    },

    addSourceList: (state, action) => {
      action.payload.forEach((list) => {
        state.SelectedsourceList.push(list.title);
      });
    },

    editSourceList: (state, action) => {
      state.SelectedsourceList = [...action.payload]; // Replace the entire list with the new one
    },
    
    deleteSourceList :(state, action)=>{
      state.SelectedsourceList = []
    }
  },
});

export const { addSource, deleteSource, addSourceList, editSourceList, deleteSourceList } = selectedSourceAndLists.actions;

export default selectedSourceAndLists.reducer;
