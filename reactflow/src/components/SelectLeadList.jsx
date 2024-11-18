import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { closeSelectLeadContainer } from '../features/LSContainer/LSContainer';
import { addSourceList } from '../features/LSContainer/SelectedSourceAndList';


const LeadList = () => {
  const [selectedLists, setSelectedLists] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  // Close function dispatches the action to close the container
  function close() {
    if(selectedLists.length === 0){
      alert("Add minimum one list");
      return;
    }
    dispatch(closeSelectLeadContainer());
  }

  // Sample data for lists
  const lists = [
    { title: 'Test List' },
    { title: 'Existing customers' },
    { title: 'Introduction Lists' },
    { title: 'Test List Sample' },
  ];

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleListChange = (event, value) => {
    setSelectedLists(value);
  };

  const handleInsert = () => {
    console.log('Selected Lists:', selectedLists);
    dispatch(addSourceList(selectedLists))
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
        Leads from List(s)
        <IconButton
          aria-label="close"
          onClick={close} // Attach close function here
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
        <p>Connect multiple lists as source for this sequence.</p><br /><br />
        <Autocomplete
          multiple
          options={lists}
          getOptionLabel={(option) => option.title}
          value={selectedLists}
          onChange={handleListChange}
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
      </DialogContent><br /><br />
      {selectedLists.length > 0 && (
        <div className="insert-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleInsert}
          >
            Insert
          </Button>
        </div>
      )}
    </Dialog>
  );
};

export default LeadList;
