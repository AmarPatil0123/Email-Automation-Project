import React, { useState, useEffect } from 'react';
import {Dialog,DialogTitle,DialogContent,TextField,Button,IconButton,MenuItem,Select,InputLabel,} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addDelay } from '../features/LSContainer/Outreach';
import { closeDelayContainer } from '../features/LSContainer/LSContainer';

const SelectDelay = () => {
  const [delay, setDelay] = useState({ waitFor: '', waitType: '' });

  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeDelayContainer());
  };

  const handleWaitForChange = (e) => {
    const value = parseInt(e.target.value, 10);
   
      if (value > 365) {
        alert('You can add up to 365 only.');
        setDelay((prevState) => ({ ...prevState, waitFor: 365 }));
      } else {
        setDelay((prevState) => ({ ...prevState, waitFor: value }));
      }
    } 
  

  
  
  const handleWaitTypeChange = (e) => {
    setDelay((prevState) => ({ ...prevState, waitType: e.target.value }));
  };

  const handleInsert = () => {
   dispatch(addDelay({value : delay.waitFor, unit : delay.waitType}));
    dispatch(closeDelayContainer());
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
          height: '750px',
          padding: '1rem',
        },
      }}
    >
      <DialogTitle style={{ fontWeight: 'bolder' }}>
        Wait
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
        <p>Add a delay between blocks.</p>
        <br />
        <hr />
        <br />
        <TextField
          label="Wait for"
          variant="outlined"
          value={delay.waitFor}
          onChange={handleWaitForChange}
          type="number"
          placeholder="Enter time (e.g., 5)"
          inputProps={{ min: 1, }}
          fullWidth
          style={{ marginBottom: '20px' }}
        />
        <InputLabel id="wait-type-label" style={{ marginBottom: '8px' }}>
          Wait Type
        </InputLabel>
        <Select
          labelId="wait-type-label"
          value={delay.waitType}
          onChange={handleWaitTypeChange}
          fullWidth
          style={{ marginBottom: '20px' }}
        >
          <MenuItem value="Seconds">Seconds</MenuItem>
          <MenuItem value="days">Days</MenuItem>
          <MenuItem value="Hours">Hours</MenuItem>
          <MenuItem value="Minutes">Minutes</MenuItem>

        </Select>
      </DialogContent>
      <div style={{ textAlign: 'right', padding: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleInsert}
          disabled={!delay.waitFor || !delay.waitType}
        >
          Insert
        </Button>
      </div>
    </Dialog>
  );
};

export default SelectDelay;
