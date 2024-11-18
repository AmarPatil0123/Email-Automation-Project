import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import './LeadSourceNode.css';
import { useDispatch, useSelector } from 'react-redux';
import { showLSContainer } from '../features/LSContainer/LSContainer';

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );
export const LeadSourceNode = ({data}) => {

  const source = useSelector((state)=>state.selectedSourceAndLists.Source)

  const dispatch = useDispatch();

  function show(){
    if(source && Object.keys(source).length){
      alert("complete the remaining task");
      return;
    }
    dispatch(showLSContainer())
  }

  return (
    <>
      <div className='lead-node' title='Add Source' onClick={show}>
          <Stack direction="row" spacing={3}>
              <PlusIcon />
          </Stack>
          <p>{data.label}</p>
          <p>Click to add Lead or CRM</p>
      </div>
    </>
  )
}
