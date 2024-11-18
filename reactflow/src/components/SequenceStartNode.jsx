import React from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { 
  background: 'black',
  width: '10px', // Increase width of handle (dot)
  height: '10px', // Increase height of handle (dot)
  borderRadius: '50%',
   // Make handle round
}; 

export const SequenceStartNode = ({ data }) => {
  return (
    <>
    <Handle
        type="target" // This is a source handle, allows connecting to it
        position={Position.Top}
        id="a" // Ensure this id matches with edges' source or target
        style={handleStyle}
      />
      <div style={{ padding: "1rem 2rem", border: "1px solid black" }}>
        <p>{data.label}</p>
      </div>

      <Handle
        type="source" // This is a source handle, allows connecting to it
        position={Position.Bottom}
        id="a" // Ensure this id matches with edges' source or target
        style={handleStyle}
      />
    </>
  );
};
