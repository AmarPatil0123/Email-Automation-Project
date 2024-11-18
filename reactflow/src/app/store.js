import { configureStore } from '@reduxjs/toolkit';
import toggleLSContainer from '../features/LSContainer/LSContainer.js';
import selectedSourceAndListsReducer from '../features/LSContainer/SelectedSourceAndList';
import outreachReducer from '../features/LSContainer/Outreach.js'; // Import the reducer directly

export default configureStore({
  reducer: {
    LSContainer: toggleLSContainer,
    selectedSourceAndLists: selectedSourceAndListsReducer,
    outreach: outreachReducer, // Use the reducer here
  },
});
