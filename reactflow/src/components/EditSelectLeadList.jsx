import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeEditSelectedListContainer } from '../features/LSContainer/LSContainer';
import { editSourceList } from '../features/LSContainer/SelectedSourceAndList';

const EditSelectedLists = () => {
  const dispatch = useDispatch();

  // Get existing lists from Redux state
  const existingLists = useSelector((state) => state.selectedSourceAndLists.SelectedsourceList);

  // State for selected lists
  const [selectedLists, setSelectedLists] = useState([]);

  // Sample data for available lists
  const lists = [
    { title: 'Test List' },
    { title: 'Existing customers' },
    { title: 'Introduction Lists' },
    { title: 'Test List Sample' },
  ];

  // Prepopulate the state with existing lists
  useEffect(() => {
    const preSelected = lists.filter((list) => existingLists.includes(list.title));
    setSelectedLists(preSelected);
  }, [existingLists]);

  // Close function dispatches the action to close the container
  function close() {
    dispatch(closeEditSelectedListContainer());
  }

  // Handle list selection changes
  const handleListChange = (event, value) => {
    setSelectedLists(value);
  };

  // Handle Insert/Update logic
  const handleInsert = () => {
    const updatedListTitles = selectedLists.map((list) => list.title); // Extract titles
    console.log('Updated List Titles:', updatedListTitles); // Debugging log
    dispatch(editSourceList(updatedListTitles)); // Dispatch updated list
    close();
  };

  return (
    <Dialog
      open
      onClose={close}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          height: '800px',
        },
      }}
    >
      <DialogTitle>
        Edit Leads from List(s)
        <IconButton
          aria-label="close"
          onClick={close}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <p>Update multiple lists as source for this sequence.</p>
        <br />
        <Autocomplete
          multiple
          options={lists}
          getOptionLabel={(option) => option.title}
          value={selectedLists}
          onChange={handleListChange}
          isOptionEqualToValue={(option, value) => option.title === value.title} // Ensures proper matching
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select your List(s)"
              placeholder="Search for lists"
              variant="outlined"
              fullWidth
            />
          )}
          style={{ marginBottom: '20px' }}
        />
      </DialogContent>
      <br />
      {selectedLists.length > 0 && (
        <div className="insert-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleInsert}
          >
            Save Changes
          </Button>
        </div>
      )}
    </Dialog>
  );
};

export default EditSelectedLists;
