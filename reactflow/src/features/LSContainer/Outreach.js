import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const Outreach = createSlice({
  name: 'outreach',
  initialState: {
    outreach: [],
    
    delay: [], 
  },
  
  reducers: {
    addEmail: (state, action) => {
      const data = {
        id: uuidv4(),
        type: 'email',
        className :"fa-regular fa-envelope",
        heading : "Cold Email",
        delay : {value : null, unit : null}
      };
      state.outreach.push(data); 
    },
    
    addTask: (state, action) => {
      const data = {
        id: uuidv4(),
        type: 'task',
        className :"fa-regular fa-circle-check",
        heading : "Task",
        delay : {value : null, unit : null}
      };
      state.outreach.push(data); 
    },

    addDelay: (state, action) => {

      const {value, unit} = action.payload;
      console.log(`value - ${value},  unit - ${unit}`)

      const data = {
        id: uuidv4(),
        type: 'wait',
        className :"fa-solid fa-hourglass-half",
        heading : "Wait",
        delay : {value : value, unit : unit}
      };
      state.outreach.push(data); 

      let lastObjIdx = state.outreach[state.outreach.length -2]
      let lastObj = lastObjIdx.delay.value = value;
      lastObj = lastObjIdx.delay.unit = unit;

    },
    
    deleteOutreachNode: (state, action) => {
      state.outreach = state.outreach.filter((node) => node.id !== action.payload);
    },

  },
});

export const { addEmail, addTask, addDelay, deleteOutreachNode } = Outreach.actions;
export default Outreach.reducer;
