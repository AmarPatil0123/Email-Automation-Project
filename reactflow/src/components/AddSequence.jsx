import React from 'react'
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import { Handle, Position } from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { showOutreachContainer } from '../features/LSContainer/LSContainer';


const handleStyle = { 
    background: 'black',
    width: '10px', // Increase width of handle (dot)
    height: '10px', // Increase height of handle (dot)
    borderRadius: '50%',// Make handle round
}; 

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


export const AddSequence = () => {

  const source = useSelector((state)=>state.selectedSourceAndLists.Source)

  const dispatch = useDispatch();

  function showOutreach(){
    if(Object.keys(source).length === 0){
      alert("Select Source before adding outreach");
    }else{
      dispatch(showOutreachContainer())

    }
  }
  
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="2" // Ensure this id matches with edges' source or target
        style={handleStyle}
      />

      <div style={{ padding: "1rem", border: "1px solid black" }} title='Add a New Block' onClick={showOutreach}>
        <Stack direction="row" spacing={3}>
            <PlusIcon />
        </Stack>
      </div>
    </>
  );
};
